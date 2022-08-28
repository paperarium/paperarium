import type { NextPage } from "next";
import React, { useRef } from "react";
import Head from "next/head";
import s from "../../styles/Upload.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { API } from "@aws-amplify/api";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { listTags } from "../../graphql/custom-queries";
import * as APIt from "../../API";
import { useState } from "react";
import { debounce } from "ts-debounce";
import dynamic from "next/dynamic";
import FileUpload from "../../components/FileUpload/FileUpload";
import Image from "next/image";
import Layout from "../../components/Layout/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import MultiFileUpload from "../../components/MultiFileUpload/MultiFileUpload";
import PDFDisplay from "../../components/PDFDisplay/PDFDisplay";

const AsyncSelect = dynamic(
  () => import("react-select/async").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);

const getTags = debounce(
  async (search: string): Promise<APIt.Tag[]> => {
    console.log(search);
    const { data } = (await API.graphql(
      graphqlOperation(listTags)
    )) as GraphQLResult<APIt.ListTagsPCPQuery>;
    if (data?.listTags) {
      return data.listTags.items.reduce<APIt.Tag[]>((acc, t) => {
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

const UploadDesignPage: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<APIt.Tag[]>([]);

  const [images, setImages] = useState<File[] | null>(null);
  const imageURLs = useRef<string[] | null>(null);
  const [pdo, setPdo] = useState<File | null>(null);
  const [pdfLined, setPdfLined] = useState<SerializedFile | null>(null);
  const [pdfLineless, setPdfLineless] = useState<SerializedFile | null>(null);
  const [glb, setGlb] = useState<File | null>(null);

  const date = new Date();

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
              <i>select relevant tags so people can find your papercraft!</i>
            </div>
            <AsyncSelect
              isMulti
              loadOptions={async (search: string) => getTags(search)}
              className={s.tag_select}
              getOptionLabel={(option: unknown) => (option as APIt.Tag).title}
              getOptionValue={(option: unknown) => (option as APIt.Tag).id}
              onChange={(tags) => setTags(tags as APIt.Tag[])}
            />
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
                      <Image src={imgURL} layout={"fill"} objectFit={"cover"} />
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
        COMPLETION
        <div className={s.submit_button}>SUBMIT</div>
      </div>
    </>
  );
};

(UploadDesignPage as any).getLayout = (page: React.ReactNode) => (
  <Layout hideFooter>{page}</Layout>
);

export default UploadDesignPage;
