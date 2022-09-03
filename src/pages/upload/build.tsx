import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.scss";
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useRef, useState } from "react";
import * as APIt from "../../supabase/types";
import s from "../../styles/UploadDesign.module.scss";

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

const UploadBuildPage: NextPage = () => {
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
  const [difficulty, setDifficulty] = useState<APIt.Difficulty>(APIt.Difficulty.Easy);
  const [dWidth, setDWidth] = useState<number | null>(null);
  const [dHeight, setDHeight] = useState<number | null>(null);
  const [dDepth, setDDepth] = useState<number | null>(null);
  const [units, setUnits] = useState<"cm" | "in">("cm");
  
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
        
      </div>
    </>
  );
};

// use authentication on this page
export const getServerSideProps = withPageAuth({redirectTo: '/login'});

export default UploadBuildPage;
