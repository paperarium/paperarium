// @ts-nocheck
import type { NextPage } from "next";
import Head from "next/head";
import s from "../../styles/Upload.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { API } from "@aws-amplify/api";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { listTags } from "../../graphql/custom-queries";
import * as APIt from "../../API";
import { useRef, useState } from "react";
import { debounce } from "ts-debounce";
import dynamic from "next/dynamic";
import FileUpload from "../../components/FileUpload/FileUpload";

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

// const uploadTag = async (title: string, encoded: string) => {
//   API.graphql({
//     query: createTag,
//     variables: {
//       input: {
//         title: title,
//         id: encoded,
//       },
//     },
//   });
// };

const UploadDesignPage: NextPage = () => {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [tags, setTags] = useState<APIt.Tag[]>([]);

  const [images, setImages] = useState<FileList | null>(null);
  const [pdo, setPdo] = useState<FileList | null>(null);
  const [pdfLined, setPdfLined] = useState<FileList | null>(null);
  const [pdfLineless, setPdfLineless] = useState<FileList | null>(null);
  const [glb, setGlb] = useState<FileList | null>(null);

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
            <b>upload a papercraft design!</b> after filling in all of the required fields,
            the submit button will turn green and you can post your papercraft
            to our website. 
          </div>
          <div className={s.spacer}></div>
          <div className={s.input_form}>
            <div className={s.annotation}>
              Title * –– <i>what is this papercraft of?</i>
            </div>
            <TextareaAutosize
              className={s.title_input}
              placeholder={"Write a title..."}
              spellCheck={false}
              ref={titleRef}
            ></TextareaAutosize>
            <div className={s.annotation}>
              Description * ––{" "}
              <i>background information on the character / papercraft?</i>
            </div>
            <TextareaAutosize
              className={s.description_input}
              placeholder={"Write a description..."}
              spellCheck={false}
              ref={descriptionRef}
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
              <div className={s.file_col}>
                <div className={s.annotation}>
                  Image * –– <i>what does the craft look like?</i>
                </div>
                <FileUpload files={images} setFiles={setImages} accept={"image/*"}>.PNG, .JPG...</FileUpload>
              </div>
              <div className={s.file_col}>
                <div className={s.annotation}>
                  Files * –– <i>the craft itself.</i>
                </div>
                <FileUpload files={pdo} setFiles={setPdo} accept={".pdo"} withIcon>.PDO</FileUpload>
                <FileUpload files={pdfLineless} setFiles={setPdfLineless} accept={"application/pdf"} withIcon>.PDF - lineless</FileUpload>
                <FileUpload files={pdfLined} setFiles={setPdfLined} accept={"application/pdf"} withIcon>.PDF - lined</FileUpload>
                <FileUpload files={glb} setFiles={setGlb} accept={".glb"} withIcon>.GLB</FileUpload>
              </div>
            </div>
          </div>
        </div>
        <div className={s.upload_col}>
          <div className={s.preview_header}>
            PREVIEW
          </div>
          <div className={s.spacer}></div></div>
      </div>
      <div className={s.completion_bar}>
        COMPLETION
        <div className={s.submit_button}>SUBMIT</div>
      </div>
    </>
  );
};

export default UploadDesignPage;
