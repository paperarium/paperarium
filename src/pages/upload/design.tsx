import type { NextPage } from "next";
import React, { useRef } from "react";
import Head from "next/head";
import s from "../../styles/Upload.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { Storage } from "@aws-amplify/storage";
import { API } from "@aws-amplify/api";
import { Auth } from "@aws-amplify/auth";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { listTags, searchTags } from "../../graphql/custom-queries";
import * as APIt from "../../API";
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
import { uploadToS3 } from "../../API_Serialize";
import authGetServerSideProps from "../../util/authGetServerSideProps";

const getTags = debounce(
  async (search: string): Promise<APIt.Tag[]> => {
    const { data } = (await API.graphql(
      {
        ...
        graphqlOperation(searchTags, {
          filter: {
            title: {
              match: search
            }
          }
        }),
        authMode: 'API_KEY'
      }
    )) as GraphQLResult<APIt.SearchTagsPCPQuery>;
    if (data?.searchTags) {
      return data.searchTags.items.reduce<APIt.Tag[]>((acc, t) => {
        if (t) acc.push(t);
        return acc;
      }, []);
    } else {
      return [];
    }
  },
  300,
  { maxWait: 1200 }
);

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

const UploadDesignPage: NextPage = () => {
  // input form fields
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<APIt.Tag[]>([]);
  const [images, setImages] = useState<File[] | null>(null);
  const imageURLs = useRef<string[] | null>(null);
  const [pdo, setPdo] = useState<File | null>(null);
  const [pdfLined, setPdfLined] = useState<SerializedFile | null>(null);
  const [pdfLineless, setPdfLineless] = useState<SerializedFile | null>(null);
  const [glb, setGlb] = useState<File | null>(null);
  const [difficulty, setDifficulty] = useState<APIt.Difficulty>(
    APIt.Difficulty.medium
  );
  const [dimensions, setDimensions] = useState<PapercraftDimensions>({
    units: "in",
    width: "",
    height: "",
    length: ""
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
    const PAPERCRAFT_KEY_PREFIX = `papercrafts/${title}_${uuidv4()}`;

    // 0. pre-load the identityid of the user for use in s3
    const user = await Auth.currentUserInfo();
    const creds = await Auth.currentCredentials();
    console.log(user);
    console.log(creds);

    // 1. upload the images of the papercraft
    const i_pictures: APIt.S3ObjectInput[] = [];
    for (let i = 0; i < images.length; i++) {
      const i_file = images[i];
      const { name } = i_file;
      const fileName = `${PAPERCRAFT_KEY_PREFIX}/IMAGE_${i}_${name}`;
      const file_input = await uploadToS3(i_file, fileName, "protected", creds);
      i_pictures.push(file_input);
    }
    console.log("uploaded pictures");
    console.log(i_pictures);

    // 2. upload the papercraft files

    // GLB - for in-browser 3d view
    let i_glb: APIt.S3ObjectInput | undefined = undefined;
    if (glb) {
      const glb_file = `${PAPERCRAFT_KEY_PREFIX}/${glb.name}`;
      i_glb = await uploadToS3(glb, glb_file, "protected", creds);
      console.log("uploaded glb");
      console.log(i_glb);
    }
    // PDF (lined) - for more beginner papercrafting
    let i_pdf_lined: APIt.S3ObjectInput | undefined = undefined;
    if (pdfLined) {
      const pdf_lined_file = `${PAPERCRAFT_KEY_PREFIX}/${pdfLined.file.name}`;
      i_pdf_lined = await uploadToS3(
        pdfLined.file,
        pdf_lined_file,
        "protected",
        creds
      );
      console.log("uploaded pdf lined");
      console.log(i_pdf_lined);
    }
    // PDF (lineless) - for the usual papercrafter
    let i_pdf_lineless: APIt.S3ObjectInput | undefined = undefined;
    if (pdfLineless) {
      const pdf_lineless_file = `${PAPERCRAFT_KEY_PREFIX}/${pdfLineless.file.name}`;
      i_pdf_lineless = await uploadToS3(
        pdfLineless.file,
        pdf_lineless_file,
        "protected",
        creds
      );
      console.log("uploaded pdf lineless");
      console.log(i_pdf_lineless);
    }
    // PDO - a guide for how to put together the papercraft
    const pdo_file = `${PAPERCRAFT_KEY_PREFIX}/${pdo.name}`;
    const i_pdo = await uploadToS3(pdo, pdo_file, "protected", creds);
    console.log("uploaded pdo");
    console.log(i_pdo);

    // 3. build the input form
    const papercraft_input: APIt.CreatePapercraftInput = {
      title,
      description,
      glb: i_glb,
      pdo: i_pdo,
      pdf_lineless: i_pdf_lineless,
      pdf_lined: i_pdf_lined,
      pictures: i_pictures,
      difficulty,
      width_in: dimensions.width
        ? dimensions.width * (dimensions.units === "in" ? 1 : 0.393701)
        : undefined,
      length_in: dimensions.length
        ? dimensions.length * (dimensions.units === "in" ? 1 : 0.393701)
        : undefined,
      height_in: dimensions.height
        ? dimensions.height * (dimensions.units === "in" ? 1 : 0.393701)
        : undefined,
      verified: false,
      userPapercraftsId: user.attributes["sub"],
    };

    // 4. build the papercraft tags inputs
    const papercraft_tags_input: APIt.CreatePapercraftTagsInput[] = [];
    for (const papercraft_tag of tags) {
      papercraft_tags_input.push({
        papercraftID: "",
        tagID: papercraft_tag.id,
      });
    }

    // 4. now build the request body
    const req = {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`,
      },
      body: {
        papercraft: papercraft_input,
        papercraftTags: papercraft_tags_input,
      },
    };
    console.log("final request");
    console.log(req);

    // post the papercraft create to the lambda
    return API.post("papercraftclubREST", "/papercraft/upload", req);
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
              loadOptions={async (search: string) => getTags(search)}
              className={s.tag_select}
              getOptionLabel={(option: unknown) => (option as APIt.Tag).title}
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
                    value: APIt.Difficulty.easy,
                    label: APIt.Difficulty.easy,
                  }}
                  options={Object.values(APIt.Difficulty)
                    .reverse()
                    .map((value) => ({ value, label: value }))}
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
                      if (units!.value === dimensions.units) return;
                      if (units!.value === "cm") {
                        setDimensions({
                          width: dimensions.width
                            ? dimensions.width * 2.54
                            : "",
                          height: dimensions.height
                            ? dimensions.height * 2.54
                            : "",
                          length: dimensions.length
                            ? dimensions.length * 2.54
                            : "",
                          units: "cm",
                        });
                      } else {
                        setDimensions({
                          width: dimensions.width
                            ? dimensions.width / 2.54
                            : "",
                          height: dimensions.height
                            ? dimensions.height / 2.54
                            : "",
                          length: dimensions.length
                            ? dimensions.length / 2.54
                            : "",
                          units: "in",
                        });
                      }
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
                      <Image src={imgURL} layout={"fill"} objectFit={"cover"} alt={`papercraft preview image ${i}`}/>
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
                      {tag.title}
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
export const getServerSideProps = authGetServerSideProps;

export default UploadDesignPage;
