/*
 * design.tsx
 * author: evan kirkiles
 * created on Sat Sep 03 2022
 * 2022 paperarium
 */
import type { NextPage } from "next";
import React, { useRef } from "react";
import Head from "next/head";
import s from "../../styles/Upload.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { debounce } from "ts-debounce";
import FileUpload from "../../components/FileUpload/FileUpload";
import MultiFileUpload from "../../components/MultiFileUpload/MultiFileUpload";
import {
  AsyncSelect,
  Select,
  getSelectTheme,
} from "../../components/misc/AsyncSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import * as APIt from "../../supabase/types";
import {
  withPageAuth,
  User,
  supabaseClient,
} from "@supabase/auth-helpers-nextjs";
import {
  createPapercraft,
  updatePapercraft,
} from "../../supabase/api/papercrafts";
import { createPapercraftsTags } from "../../supabase/api/papercraftstags";
import { CSSTransition } from "react-transition-group";
import PapercraftDisplay from "../../components/PapercraftDisplay/PapercraftDisplay";
import BlinkEffect from "../../components/BlinkEffect/BlinkEffect";
import { useRouter } from "next/router";
import { uploadFile, uploadImageFile } from "../../util/uploadFile";
import { createBuild } from "../../supabase/api/builds";
import { getSelf } from "../../supabase/api/profiles";

const fetchTags = debounce(
  async (search: string): Promise<APIt.Tag[]> => {
    const { data: tags, error } = await supabaseClient
      .from<APIt.Tag>("tags")
      .select("*")
      .filter("code", "like", `%${search}%`);
    if (error) throw error;
    return tags;
  },
  300,
  { maxWait: 1200 }
);

const UploadDesignPage: NextPage<{ user: User }> = ({ user }) => {
  // router to redirect on submissions success
  const router = useRouter();

  // reference to the form for CSS transitions
  const formRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  /* -------------------------------------------------------------------------- */
  /*                                PREVIEW STATE                               */
  /* -------------------------------------------------------------------------- */

  // statefuls for the papercraft in the preview
  const [papercraft, setPapercraft] = useState<APIt.Papercraft | null>(null);
  const [inPreview, setInPreview] = useState(false);
  const [inConfirm, setInConfirm] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<
    string | undefined
  >(undefined);

  // checks if can show preview
  const canShowPreview = () => {
    return !!(title && description && (!!pdfLineless || !!pdfLined));
  };

  /* -------------------------------------------------------------------------- */
  /*                                INPUT FIELDS                                */
  /* -------------------------------------------------------------------------- */

  // input form fields
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<APIt.Tag[]>([]);
  const [images, setImages] = useState<File[] | null>(null);
  const imageURLs = useRef<string[] | null>(null);
  const [pdo, setPdo] = useState<File | null>(null);
  const [pdfLined, setPdfLined] = useState<File | null>(null);
  const [pdfLineless, setPdfLineless] = useState<File | null>(null);
  const [glb, setGlb] = useState<File | null>(null);
  const [difficulty, setDifficulty] = useState<APIt.Difficulty>(
    APIt.Difficulty.Easy
  );
  const [dLength, setDLength] = useState<number | "">("");
  const [dWidth, setDWidth] = useState<number | "">("");
  const [dHeight, setDHeight] = useState<number | "">("");
  const [dUnits, setDUnits] = useState<"in" | "cm">("cm");
  const [xLink, setXLink] = useState<string>("");
  const [isBuild, setIsBuild] = useState(false);

  // user profilie
  const { data: profile } = useQuery(
    ["profiles", { id: user?.id }],
    () => getSelf(user!.id),
    {
      enabled: !!user?.id,
    }
  );

  /* -------------------------------------------------------------------------- */
  /*                                 SUBMISSION                                 */
  /* -------------------------------------------------------------------------- */

  // function for submitting the papercraft
  const submitPapercraft = useMutation(async () => {
    // validate in the form that required fields exist
    if (!title) throw "missing title!";
    if (!description) throw "missing description!";
    if (images === null) throw "missing images!";
    if (!pdfLined && !pdfLineless) throw "missing a pdf!";

    // set submitting message
    setSubmissionMessage("Uploading pictures...");

    // first, upload all of the resources, this may take a while.
    const PAPERCRAFT_KEY_PREFIX = `${user.id}/papercrafts/${title.replace(
      /[^a-zA-Z0-9-_\.]/g,
      ""
    )}_${uuidv4()}`;

    // 1. upload the images of the papercraft
    const pictures: APIt.Picture[] = [];
    for (let i = 0; i < images.length; i++) {
      const i_file = images[i];
      const { name } = i_file;
      const fileName = `${PAPERCRAFT_KEY_PREFIX}/IMAGE_${i}_${name.replace(
        /[^a-zA-Z0-9-_\.]/g,
        ""
      )}`;
      pictures.push(await uploadImageFile(fileName, i_file));
    }

    // 2. upload the papercraft files
    setSubmissionMessage("Uploading files...");

    // GLB - for in-browser 3d view
    let glb_url: string | undefined = undefined;
    if (glb) {
      const glb_file = `${PAPERCRAFT_KEY_PREFIX}/${glb.name.replace(
        /[^a-zA-Z0-9-_\.]/g,
        ""
      )}`;
      glb_url = await uploadFile(glb_file, glb);
    }
    // PDF (lined) - for more beginner papercrafting
    let pdf_lined_url: string | undefined = undefined;
    if (pdfLined) {
      const pdf_lined_file = `${PAPERCRAFT_KEY_PREFIX}/${pdfLined.name.replace(
        /[^a-zA-Z0-9-_\.]/g,
        ""
      )}`;
      pdf_lined_url = await uploadFile(pdf_lined_file, pdfLined);
    }
    // PDF (lineless) - for the usual papercrafter
    let pdf_lineless_url: string | undefined = undefined;
    if (pdfLineless) {
      const pdf_lineless_file = `${PAPERCRAFT_KEY_PREFIX}/${pdfLineless.name.replace(
        /[^a-zA-Z0-9-_\.]/g,
        ""
      )}`;
      pdf_lineless_url = await uploadFile(pdf_lineless_file, pdfLineless);
    }
    // PDO - a guide for how to put together the papercraft
    let pdo_url: string | undefined = undefined;
    if (pdo) {
      const pdo_file = `${PAPERCRAFT_KEY_PREFIX}/${pdo.name.replace(
        /[^a-zA-Z0-9-_\.]/g,
        ""
      )}`;
      pdo_url = await uploadFile(pdo_file, pdo);
    }

    // 3. build the papercraft
    setSubmissionMessage("Creating design entry...");
    const papercraft_id = (
      await createPapercraft({
        user_id: user.id,
        title,
        description,
        glb_url,
        pdo_url,
        pdf_lineless_url,
        pdf_lined_url,
        pictures,
        difficulty: difficulty,
        xlink: xLink,
        dimensions_cm:
          dLength && dWidth && dHeight
            ? [dLength, dWidth, dHeight].map(
                (val) => val * (dUnits === "cm" ? 1 : 2.54)
              )
            : undefined,
        verified: false,
      })
    )[0].id;

    // 6. if this is a build, cross-post it to user's builds
    if (isBuild) {
      setSubmissionMessage("Creating build entry...");
      const build_id = (
        await createBuild({
          user_id: user.id,
          papercraft_id,
          pictures,
          xlink: xLink,
          verified: false,
        })
      )[0].id;
      setSubmissionMessage("Linking build entry to papercraft...");
      await updatePapercraft(papercraft_id, {
        build_id,
      });
    }

    // 4. build the papercraft tags inputs
    const papercraft_tags_input: APIt.PapercraftsTagsInput[] = [];
    for (const papercraft_tag of tags) {
      papercraft_tags_input.push({
        papercraft_id,
        tag_id: papercraft_tag.id,
      });
    }

    // 5. bulk create the papercraft tags
    setSubmissionMessage("Linking tags...");
    await createPapercraftsTags(papercraft_tags_input);

    // 6. Finished!
    setSubmissionMessage("Done!");
    router.push(`/papercrafts/${papercraft_id}`);
  });

  // builds a papercraft from the user's information
  const buildPapercraft = () => {
    if (!pdo) throw "no PDO file!";
    if (!images) throw "no images!";
    const papercraft: APIt.Papercraft = {
      id: "",
      user_id: user.id,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
      title: title,
      description: description,
      glb_url: glb ? URL.createObjectURL(glb) : undefined,
      pdo_url: pdo ? URL.createObjectURL(pdo) : undefined,
      pdf_lineless_url: pdfLineless
        ? URL.createObjectURL(pdfLineless)
        : undefined,
      pdf_lined_url: pdfLined ? URL.createObjectURL(pdfLined) : undefined,
      pictures: images.map((img) => ({
        key: URL.createObjectURL(img),
        width: 0,
        height: 0,
      })),
      difficulty: difficulty,
      dimensions_cm:
        dLength && dWidth && dHeight
          ? [dLength, dWidth, dHeight].map(
              (val) => val * (dUnits === "cm" ? 1 : 2.54)
            )
          : undefined,
      verified: false,
      user: {
        username: "me",
        updated_at: "",
        ...user,
        ...(profile ? profile : {}),
        papercrafts: [{ count: 1 }],
        builds: [{ count: 1 }],
      },
      tags: tags,
    };
    return papercraft;
  };

  /* -------------------------------------------------------------------------- */
  /*                                  RENDERING                                 */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <Head>
        <title>upload - papercraft place</title>
        <meta
          name="description"
          content="submit a papercraft for publication!"
        />
      </Head>
      <CSSTransition
        in={inPreview}
        nodeRef={formRef}
        timeout={700}
        classNames={"preview"}
      >
        <div className={s.upload_container} ref={formRef}>
          <div className={s.upload_col}>
            <div className={s.column_header}>
              <b>upload a papercraft design slip!</b>
              <br /> after filling in all of the required fields, the submit
              button will activate and you can post your papercraft to our
              website.
            </div>
            <div className={s.spacer}></div>
            <div className={s.input_form}>
              <div
                className={s.input_form_title}
                onClick={() => {
                  if (inPreview) {
                    setInPreview(false);
                    setInConfirm(false);
                  }
                }}
              >
                INPUT FORM
              </div>
              <div
                className={`${s.preview_show_button} ${
                  !canShowPreview() ? "disabled" : ""
                }`}
                onClick={() => {
                  if (!inPreview) {
                    if (canShowPreview()) {
                      setPapercraft(buildPapercraft());
                      setInPreview(true);
                    }
                  } else {
                    setInPreview(false);
                    setInConfirm(false);
                  }
                }}
              >
                <BlinkEffect active={canShowPreview() && !inPreview} />
                REVIEW
              </div>
              <div className={s.input_inner_container}>
                {/* <div className={s.input_inner_container_2}> */}
                <div className={s.annotation} style={{ marginTop: "0px" }}>
                  Title * –– <i>what is this papercraft of?</i>
                </div>
                <TextareaAutosize
                  className={s.title_input}
                  placeholder={"Write a title..."}
                  spellCheck={false}
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value.replace(/  |\r\n|\n|\r/gm, ""));
                  }}
                ></TextareaAutosize>
                <div className={s.annotation}>
                  Description * ––{" "}
                  <i>background information on the character / papercraft?</i>
                </div>
                <TextareaAutosize
                  className={s.description_input}
                  placeholder={"Write a description..."}
                  spellCheck={false}
                  value={description}
                  minRows={3}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></TextareaAutosize>
                <div className={s.annotation}>
                  Tags ––{" "}
                  <i>
                    select up to 5 relevant tags so people can find your
                    papercraft!
                  </i>
                </div>
                <AsyncSelect
                  isMulti
                  loadOptions={async (search: string) => fetchTags(search)}
                  className={s.tag_select}
                  getOptionLabel={(option: unknown) =>
                    (option as APIt.Tag).name
                  }
                  getOptionValue={(option: unknown) => (option as APIt.Tag).id}
                  isOptionDisabled={() => tags.length >= 5}
                  onChange={(tags: APIt.Tag[]) => setTags(tags as APIt.Tag[])}
                  theme={getSelectTheme}
                />
                <div className={s.difficulty_row}>
                  <div className={s.difficulty_col}>
                    <div className={s.annotation}>
                      Difficulty * –– <i>how hard is this papercraft?</i>
                    </div>
                    <Select
                      instanceId={"tag_select"}
                      className={s.tag_select}
                      isClearable={false}
                      defaultValue={{
                        value: APIt.Difficulty.Easy,
                        label: "easy",
                      }}
                      options={Object.entries(APIt.Difficulty)
                        .filter(([key]) => !isNaN(Number(key)))
                        .map(([value, key]) => ({ value, label: key }))}
                      onChange={(difficulty: string) =>
                        setDifficulty((difficulty! as any).value)
                      }
                      theme={getSelectTheme}
                    />
                  </div>
                  <div className={s.difficulty_col}>
                    <div className={s.annotation}>
                      Dimensions –– <i>and how big? length / width / height</i>
                    </div>
                    <div className={s.dimensions_row}>
                      <input
                        className={s.dimension_input}
                        value={dLength}
                        min="0"
                        type="number"
                        placeholder={"l"}
                        onChange={(e) => {
                          setDLength(parseFloat(e.target.value));
                        }}
                      />
                      <input
                        className={s.dimension_input}
                        value={dWidth}
                        min="0"
                        type="number"
                        placeholder={"w"}
                        onChange={(e) => {
                          setDWidth(parseFloat(e.target.value));
                        }}
                      />
                      <input
                        className={s.dimension_input}
                        value={dHeight}
                        min="0"
                        type="number"
                        placeholder={"h"}
                        onChange={(e) => {
                          setDHeight(parseFloat(e.target.value));
                        }}
                      />
                      <Select
                        instanceId={"dimensions_unit_select"}
                        className={s.dimension_select}
                        isClearable={false}
                        defaultValue={{
                          value: dUnits,
                          label: dUnits,
                        }}
                        options={[
                          { value: "cm", label: "cm" },
                          { value: "in", label: "in" },
                        ]}
                        onChange={(units: any) => {
                          setDUnits(units);
                        }}
                        theme={getSelectTheme}
                      />
                    </div>
                  </div>
                </div>
                <div className={s.file_row}>
                  <div className={s.file_col} style={{ flex: 1 }}>
                    <div className={s.annotation}>
                      Image * –– <i>what does the craft look like?</i>
                    </div>
                    <MultiFileUpload
                      files={images}
                      setFiles={(images) => {
                        setImages(images);
                        if (images == null) {
                          imageURLs.current = null;
                        } else {
                          const URLs = [];
                          for (let i = 0; i < images.length; i++) {
                            URLs.push(URL.createObjectURL(images[i]));
                          }
                          imageURLs.current = URLs;
                        }
                      }}
                      accept={"image/*"}
                    >
                      .PNG, .JPG...
                    </MultiFileUpload>
                  </div>
                  <div className={s.file_col} style={{ flex: 2 }}>
                    <div className={s.annotation}>
                      Files * –– <i>the craft itself.</i>
                    </div>
                    <FileUpload
                      file={pdo}
                      setFile={setPdo}
                      accept={".pdo"}
                      withIcon
                    >
                      .PDO
                    </FileUpload>
                    <FileUpload
                      file={pdfLineless ? pdfLineless : null}
                      setFile={setPdfLineless}
                      accept={"application/pdf"}
                      withIcon
                    >
                      .PDF - lineless
                    </FileUpload>
                    <FileUpload
                      file={pdfLined ? pdfLined : null}
                      setFile={setPdfLined}
                      accept={"application/pdf"}
                      withIcon
                    >
                      .PDF - lined
                    </FileUpload>
                    <FileUpload
                      file={glb}
                      setFile={setGlb}
                      accept={".glb"}
                      withIcon
                    >
                      .GLB
                    </FileUpload>
                  </div>
                </div>
                <div className={s.annotation}>
                  Source link? ––{" "}
                  <i>feel free to link your own hosted version here.</i>
                </div>
                <div className={s.more_row}>
                  <input
                    type="text"
                    className={s.file_input}
                    value={xLink}
                    onChange={(e) => setXLink(e.target.value)}
                  />
                </div>
                <div className={s.annotation}>
                  Did you build this? ––{" "}
                  <i>check to cross-upload the images as your own build.</i>
                </div>
                <div className={s.more_row}>
                  <input
                    type="checkbox"
                    id="ibuiltthis"
                    checked={isBuild}
                    onChange={(e) => setIsBuild(e.target.checked)}
                  />
                  <label htmlFor="ibuiltthis">
                    yes, i confirm that this is my build!
                  </label>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
          {/* SUBMISSION */}
          <div className={s.preview_container}>
            <div
              className={s.submit_button}
              onClick={() => {
                if (inConfirm) {
                  submitPapercraft.mutate();
                } else {
                  setInConfirm(true);
                }
              }}
            >
              <BlinkEffect zIndex={-1} active={inPreview} />
              SUBMIT
            </div>
            <div className={s.preview_hidden_container}>
              {papercraft ? (
                <PapercraftDisplay papercraft={papercraft} preview />
              ) : null}
            </div>
            <CSSTransition in={inConfirm} nodeRef={backdropRef} timeout={300}>
              <div
                className={s.confirm_backdrop}
                ref={backdropRef}
                onClick={() => {
                  setInConfirm(false);
                }}
              >
                <div className={s.confirm_text}>
                  {submissionMessage ? (
                    submissionMessage
                  ) : (
                    <>
                      <h1>ready?</h1>
                      click the submit button again to confirm your submission
                      of the design
                      <br />
                      <br />
                      <i className={s.confirm_title}>{title}</i>.
                      <br />
                      <br />
                      <br />
                      <small>
                        or click anywhere else to return to editing.
                      </small>
                    </>
                  )}
                </div>
              </div>
            </CSSTransition>
            <div className={s.preview_cover}></div>
            <div className={s.preview_cover}></div>
          </div>
        </div>
      </CSSTransition>
      <div className={s.completion_bar}>
        ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭
        ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭
        ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭
        ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚ ୭ ˚○◦˚
      </div>
    </>
  );
};

// use authentication on this page
export const getServerSideProps = withPageAuth({ redirectTo: "/login" });

export default UploadDesignPage;
