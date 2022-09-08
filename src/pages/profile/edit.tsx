import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import * as APIt from "../../supabase/types";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import s from "../../styles/profile/Edit.module.scss";
import { getSelf, updateProfile } from "../../supabase/api/profiles";
import OptimizedImage from "../../components/OptimizedImage/OptimizedImage";
import { AiOutlineSave, AiOutlineUpload } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useUser } from "@supabase/auth-helpers-react";
import { uploadFile } from "../../util/uploadFile";
import { CSSTransition } from "react-transition-group";
import FormEditProfile from "../../components/FormEditProfile/FormEditProfile";

const EditProfilePage: NextPage = () => {
  // initial queries
  const { user } = useUser();
  const { data: profile } = useQuery(
    ["profiles", { id: user?.id }],
    () => getSelf(user!.id),
    {
      enabled: !!user?.id,
    }
  );

  return (
    <>
      <Head>
        <title>edit profile - paperarium</title>
        <meta name="description" content="edit your profile here." />
      </Head>
      <div className={s.page_container}>
        <div className={s.sticky_header}>
          <Link href={`/profile/${profile!.username}`}>
            <div className={s.sticky_button}>
              <BiArrowBack />
              RETURN TO PROFILE
            </div>
          </Link>
        </div>
        {profile ? <FormEditProfile profile={profile} redirectOnSuccess /> : null}
      </div>
    </>
  );
};

export default EditProfilePage;
