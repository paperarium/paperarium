import type { NextPage } from "next";
import React, { useRef } from "react";
import Head from "next/head";
import s from "../../styles/Upload.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { debounce } from "ts-debounce";
import FileUpload from "../../components/FileUpload/FileUpload";
import Image from "next/image";
import Layout from "../../components/Layout/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import MultiFileUpload from "../../components/MultiFileUpload/MultiFileUpload";
import PDFDisplay from "../../components/PDFDisplay/PDFDisplay";
import {
  AsyncSelect,
  Select,
  getSelectTheme,
} from "../../components/misc/AsyncSelect";
import { RiScissorsCutLine } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import {
  Difficulty,
  Papercraft,
  PapercraftInput,
  PapercraftsTags,
  PapercraftsTagsInput,
  Tag,
} from "../../types/supabase";
import {
  withPageAuth,
  User,
  supabaseClient,
} from "@supabase/auth-helpers-nextjs";

const fetchTags = debounce(
  async (search: string): Promise<Tag[]> => {
    const { data: tags, error } = await supabaseClient
      .from<Tag>("tags")
      .select("*")
      .filter("code", "like", `%${search}%`);
    if (error) throw error;
    return tags;
  },
  300,
  { maxWait: 1200 }
);

const uploadFile = async (key: string, i_file: File) => {
  const { data, error } = await supabaseClient.storage
    .from("papercraftplace")
    .upload(key, i_file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) throw error;
  if (!data) throw `no key when uploading file ${key}`;
  return data?.Key;
};

export type SerializedFile = {
  file: File;
  objectURL: string;
};

type PapercraftDimensions = {
  width: number | "";
  height: number | "";
  length: number | "";
  units: "in" | "cm";
};

const UploadDesignPage: NextPage<{ user: User }> = ({ user }) => {
  // input form fields
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [images, setImages] = useState<File[] | null>(null);
  const imageURLs = useRef<string[] | null>(null);
  const [pdo, setPdo] = useState<File | null>(null);
  const [pdfLined, setPdfLined] = useState<SerializedFile | null>(null);
  const [pdfLineless, setPdfLineless] = useState<SerializedFile | null>(null);
  const [glb, setGlb] = useState<File | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.easy);
  const [dimensions, setDimensions] = useState<PapercraftDimensions>({
    units: "in",
    width: "",
    height: "",
    length: "",
  });

  // keep track of "percentage" of form done
  const percent_complete =
    ((Number(!!title) +
      Number(!!description) +
      Number(!!images) +
      Number(!!pdo)) /
      4) *
    100;

  // function for submitting the papercraft
  const submitPapercraft = useMutation(async () => {
    // validate in the form that required fields exist
    if (!title) throw "missing title!";
    if (!description) throw "missing description!";
    if (images === null) throw "missing images!";
    if (!pdo) throw "missing pdo!";
    if (!pdfLined && !pdfLineless) throw "missing a pdf!";

    // first, upload all of the resources, this may take a while.
    const PAPERCRAFT_KEY_PREFIX = `${user.id}/papercrafts/${title}_${uuidv4()}`;

    // 1. upload the images of the papercraft
    const pictures: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const i_file = images[i];
      const { name } = i_file;
      const fileName = `${PAPERCRAFT_KEY_PREFIX}/IMAGE_${i}_${name}`;
      pictures.push(await uploadFile(fileName, i_file));
    }
    console.log("uploaded pictures");
    console.log(pictures);

    // 2. upload the papercraft files

    // GLB - for in-browser 3d view
    let glb_url: string | undefined = undefined;
    if (glb) {
      const glb_file = `${PAPERCRAFT_KEY_PREFIX}/${glb.name}`;
      pictures.push(await uploadFile(glb_file, glb));
    }
    // PDF (lined) - for more beginner papercrafting
    let pdf_lined_url: string | undefined = undefined;
    if (pdfLined) {
      const pdf_lined_file = `${PAPERCRAFT_KEY_PREFIX}/${pdfLined.file.name}`;
      pdf_lined_url = await uploadFile(pdf_lined_file, pdfLined.file);
    }
    // PDF (lineless) - for the usual papercrafter
    let pdf_lineless_url: string | undefined = undefined;
    if (pdfLineless) {
      const pdf_lineless_file = `${PAPERCRAFT_KEY_PREFIX}/${pdfLineless.file.name}`;
      pdf_lineless_url = await uploadFile(pdf_lineless_file, pdfLineless.file);
    }
    // PDO - a guide for how to put together the papercraft
    const pdo_file = `${PAPERCRAFT_KEY_PREFIX}/${pdo.name}`;
    const pdo_url = await uploadFile(pdo_file, pdo);

    // 3. build the input form
    const papercraft_input: PapercraftInput = {
      title,
      description,
      glb_url,
      pdo_url,
      pdf_lined_url,
      pdf_lineless_url,
      pictures,
      difficulty,
      dimensions_cm:
        dimensions.width && dimensions.length && dimensions.height
          ? [dimensions.width, dimensions.length, dimensions.height].map(
              (val) => val * (dimensions.units === "cm" ? 1 : 2.54)
            )
          : undefined,
      verified: false,
      user_id: user.id,
    };

    // 4. build the papercraft
    const res = await supabaseClient
      .from<Papercraft>("papercrafts")
      .insert(papercraft_input);
    if (res.error) throw res.error;
    const papercraft_id = res.data[0].id;

    // 5. build the papercraft tags inputs
    const papercraft_tags_input: PapercraftsTagsInput[] = [];
    for (const papercraft_tag of tags) {
      papercraft_tags_input.push({
        papercraft_id,
        tag_id: papercraft_tag.id
      });
    }

    // 6. bulk create the papercraft tags
    const res2 = await supabaseClient
      .from<PapercraftsTags>("papercrafts_tags")
      .insert(papercraft_tags_input);
    if (res.error) throw res2.error;
  });

  return (
    <>
      <Head>
        <title>upload - papercraft place</title>
        <meta
          name="description"
          content="submit a papercraft for publication!"
        />
      </Head>
      <div className={s.upload_container}>
        <div className={s.upload_col}>
          <div className={s.column_header}>
            <b>upload a papercraft design!</b> after filling in all of the
            required fields, the submit button will turn green and you can post
            your papercraft to our website.
          </div>
          <div className={s.spacer}></div>
          <div className={s.input_form}>
            <div className={s.input_outline}></div>
            <div className={s.annotation}>
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
                select up to 5 relevant tags so people can find your papercraft!
              </i>
            </div>
            <AsyncSelect
              isMulti
              loadOptions={async (search: string) => fetchTags(search)}
              className={s.tag_select}
              getOptionLabel={(option: unknown) => (option as Tag).name}
              getOptionValue={(option: unknown) => (option as Tag).id}
              isOptionDisabled={() => tags.length >= 5}
              onChange={(tags: Tag[]) => setTags(tags as Tag[])}
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
                    value: Difficulty.easy,
                    label: "easy",
                  }}
                  options={Object.entries(Difficulty)
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
                  Dimensions –– <i>and how big? width / depth / height</i>
                </div>
                <div className={s.dimensions_row}>
                  <input
                    className={s.dimension_input}
                    value={dimensions.width}
                    min="0"
                    type="number"
                    placeholder={"w"}
                    onChange={(e) => {
                      setDimensions({
                        ...dimensions,
                        width: parseFloat(e.target.value),
                      });
                    }}
                  />
                  <input
                    className={s.dimension_input}
                    value={dimensions.length}
                    min="0"
                    type="number"
                    placeholder={"d"}
                    onChange={(e) => {
                      setDimensions({
                        ...dimensions,
                        length: parseFloat(e.target.value),
                      });
                    }}
                  />
                  <input
                    className={s.dimension_input}
                    value={dimensions.height}
                    min="0"
                    type="number"
                    placeholder={"h"}
                    onChange={(e) => {
                      setDimensions({
                        ...dimensions,
                        height: parseFloat(e.target.value),
                      });
                    }}
                  />
                  <Select
                    instanceId={"dimensions_unit_select"}
                    className={s.dimension_select}
                    isClearable={false}
                    defaultValue={{
                      value: dimensions.units,
                      label: dimensions.units,
                    }}
                    options={[
                      { value: "in", label: "in" },
                      { value: "cm", label: "cm" },
                    ]}
                    onChange={(units: any) => {
                      setDimensions({
                        ...dimensions,
                        units,
                      });
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
                  file={pdfLineless ? pdfLineless.file : null}
                  setFile={(newPdf) => {
                    if (!newPdf) {
                      setPdfLineless(null);
                      return;
                    }
                    setPdfLineless({
                      file: newPdf,
                      objectURL: URL.createObjectURL(newPdf),
                    });
                  }}
                  accept={"application/pdf"}
                  withIcon
                >
                  .PDF - lineless
                </FileUpload>
                <FileUpload
                  file={pdfLined ? pdfLined.file : null}
                  setFile={(newPdf) => {
                    if (!newPdf) {
                      setPdfLined(null);
                      return;
                    }
                    setPdfLined({
                      file: newPdf,
                      objectURL: URL.createObjectURL(newPdf),
                    });
                  }}
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
          </div>
        </div>
        <div className={s.divider}></div>
        <div className={s.preview_col}>
          <div className={s.preview_header}>PREVIEW</div>
          <div className={s.preview_container}>
            <div className={s.preview_main_content}>
              <Swiper
                pagination={true}
                navigation={true}
                className={s.image_container}
                modules={[Pagination, Navigation]}
              >
                {imageURLs.current ? (
                  imageURLs.current.map((imgURL, i) => (
                    <SwiperSlide key={`${imgURL}_${i}`}>
                      <Image
                        src={imgURL}
                        layout={"fill"}
                        objectFit={"cover"}
                        alt={`papercraft preview image ${i}`}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <div className={s.preview_no_image_display}>
                      images of your papercraft will go here
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
              <div className={s.preview_content_container}>
                <TextareaAutosize
                  className={s.preview_title}
                  value={title}
                  placeholder={"Your title..."}
                  spellCheck={false}
                  readOnly={true}
                ></TextareaAutosize>
                <div className={s.date_input}>{new Date().toDateString()}</div>
                <TextareaAutosize
                  className={s.preview_description}
                  value={description}
                  placeholder={"Your description..."}
                  spellCheck={false}
                  minRows={3}
                  readOnly={true}
                ></TextareaAutosize>
                <div className={s.tags_container}>
                  {tags.map((tag) => (
                    <div key={tag.id} className={s.tag}>
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={s.preview_pdf_column}>
              <div className={s.pdf_type_container}>
                <div className={s.pdf_type}>LINED</div>
                <div className={s.pdf_type}>LINELESS</div>
              </div>
              <div className={s.pdf_preview_container}>
                {pdfLineless ? (
                  <PDFDisplay pdf={pdfLineless} defaultWidth={230} />
                ) : (
                  <div className={s.preview_no_image_display}>
                    your pdf will show here
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.completion_bar}>
        <div className={s.completion_filler}>
          <div
            className={`${s.completion_percentage} ${
              percent_complete === 100 ? "shimmer" : ""
            }`}
            style={{ transform: `translateX(-${100 - percent_complete}%)` }}
          >
            <RiScissorsCutLine />
            <div className={s.completion_percentage_label}>
              {percent_complete}% complete
            </div>
          </div>
        </div>
        <div
          className={`${s.submit_button} ${
            percent_complete === 100 ? "enabled" : ""
          }`}
          onClick={() => submitPapercraft.mutate()}
        >
          SUBMIT
        </div>
      </div>
    </>
  );
};

(UploadDesignPage as any).getLayout = (page: React.ReactNode) => (
  <Layout hideFooter>{page}</Layout>
);

// use authentication on this page
export const getServerSideProps = withPageAuth({ redirectTo: "/login" });

export default UploadDesignPage;
