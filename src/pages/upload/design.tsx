import type { NextPage } from "next";
import Head from "next/head";
import s from "../../styles/Upload.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { API } from "aws-amplify";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { listTags } from "../../graphql/custom-queries";
import * as APIt from "../../API";
import { Tag } from "../../models";
import { useState } from "react";
import { debounce } from "ts-debounce";
import dynamic from "next/dynamic";
import { createTag } from "../../graphql/mutations";

const AsyncSelect = dynamic(
  () => import("react-select/async").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);

const getTags = debounce(
  async (search: string): Promise<APIt.Tag[]> => {
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

const uploadTag = async (title: string, encoded: string) => {
  API.graphql(
    graphqlOperation(createTag, {
      input: {
        title: title,
        title_encoded: encoded,
      },
    })
  );
};

const UploadDesignPage: NextPage = () => {
  const [tags, setTags] = useState<APIt.Tag[]>([]);

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
          <div className={s.annotation}>
            Title * –– <i>what is this papercraft of?</i>
          </div>
          <TextareaAutosize
            className={s.title_input}
            placeholder={"Write a title..."}
            spellCheck={false}
          ></TextareaAutosize>
          <div className={s.annotation}>
            Description * ––{" "}
            <i>background information on the character / papercraft?</i>
          </div>
          <TextareaAutosize
            className={s.description_input}
            placeholder={"Write a description..."}
            spellCheck={false}
            minRows={4}
          ></TextareaAutosize>
          <div
            className={s.annotation}
            // onClick={() => uploadTag("Nintendo", "nintendo")}
          >
            Tags ––{" "}
            <i>select relevant tags so people can find your papercraft!</i>
          </div>
          <AsyncSelect
            value={tags}
            isMulti
            loadOptions={async (search: string) => getTags(search)}
            className={s.tag_select}
          />
        </div>
        <div className={s.upload_col}>HI2</div>
      </div>
      <div className={s.completion_bar}>
        COMPLETION
        <div className={s.submit_button}>SUBMIT</div>
      </div>
    </>
  );
};

export default UploadDesignPage;
