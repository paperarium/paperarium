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

const EditProfilePage: NextPage = () => {
  
  const router = useRouter();

  // edit page structure
  const loadingOverlayRef = useRef<HTMLDivElement>(null);

  // initial queries
  const { user } = useUser();
  const { data: profile } = useQuery(
    ["profiles", { id: user?.id }],
    () => getSelf(user!.id),
    {
      enabled: !!user?.id,
    }
  );

  // form input fields
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | undefined>();
  const [realname, setRealName] = useState<string | undefined>();
  const [about, setAbout] = useState<string | undefined>();
  const [website, setWebsite] = useState<string | undefined>();

  // mutation for updating the profile
  const queryClient = useQueryClient();
  const updateProfileMutation = useMutation(
    async () => {
      // validate correct form inputs
      if (username && username.length <= 3) throw "username too short!";
      if (newAvatar && newAvatar.size / 1024 / 1024 > 5)
        throw "avatar must be less than 5 mb";

      // upload the avatar url if there is one
      let uploaded_avatar_url: string | null = null;
      if (newAvatar) {
        const avatar_file = `${user!.id}/avatars/${newAvatar.name.replace(
          /[^a-zA-Z0-9-_\.]/g,
          ""
        )}`;
        uploaded_avatar_url = await uploadFile(avatar_file, newAvatar);
      }

      // create the mutation input
      const input: Partial<APIt.Profile> = {};
      username && (input.username = username);
      realname !== undefined && (input.name = realname);
      about !== undefined && (input.about = about);
      website !== undefined && (input.website = website);
      uploaded_avatar_url !== null && (input.avatar_url = uploaded_avatar_url);

      // perform the mutation
      return await updateProfile(user!.id, input);
    },
    {
      // on success, we need to invalidate our previous profile queries
      onSuccess: () => {
        queryClient.invalidateQueries(["profiles", { id: user!.id }]);
        router.back();
      },
    }
  );

  // if no profile, gtfo
  if (!profile) return <>loading...</>;

  // check if there is any necessary change
  const isTheSame =
    !newAvatar &&
    (username === undefined || username === profile.username) &&
    (realname === undefined || realname === profile.name) &&
    (about === undefined || about == profile.about) &&
    (website === undefined || website == profile.website);

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
        <div className={s.profile_card}>
          <label
            className={s.profile_picture}
            htmlFor="avatar_upload"
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (e.dataTransfer.files[0]) {
                setNewAvatar(e.dataTransfer.files[0]);
                setAvatarUrl(URL.createObjectURL(e.dataTransfer.files[0]));
              }
            }}
          >
            {avatar_url ? (
              <img src={avatar_url} className={s.inner_image} alt="avatar" />
            ) : (
              <OptimizedImage
                src={profile?.avatar_url}
                className={s.inner_image}
                sizes={"150px"}
              />
            )}
            <div className={s.image_overlay}>
              <AiOutlineUpload />
            </div>
          </label>
          <input
            className={s.hidden_input}
            accept="image/*"
            id="avatar_upload"
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setNewAvatar(e.target.files[0]);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                e.target.value = "";
              }
            }}
          />
          <div className={s.annotation}>USERNAME</div>
          <input
            type="text"
            className={s.input_field}
            value={`@${username || profile.username}`}
            onChange={(e) =>
              setUsername(e.target.value.replace(/[^a-zA-Z0-9-_\.]/g, ""))
            }
          />
          <div className={s.annotation}>DISPLAY NAME</div>
          <input
            type="text"
            className={s.input_field}
            placeholder={"Add a display name..."}
            value={realname || profile.name || ""}
            onChange={(e) => setRealName(e.target.value)}
          />
          <div className={s.annotation}>BIO</div>
          <ReactTextareaAutosize
            className={s.description_input}
            placeholder={"Write a bio..."}
            spellCheck={false}
            value={about || profile.about || ""}
            minRows={3}
            onChange={(event) => {
              setAbout(event.target.value);
            }}
          ></ReactTextareaAutosize>
          <div className={s.annotation}>WEBSITE</div>
          <input
            type="text"
            className={s.input_field}
            placeholder={"Link your website..."}
            value={website || profile.website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <div
            className={`${s.save_button} ${isTheSame ? "disabled" : ""}`}
            onClick={() => {
              updateProfileMutation.mutate();
            }}
          >
            {isTheSame ? "UP TO DATE." : "SAVE"}
            <AiOutlineSave />
          </div>
          <CSSTransition
            appear
            in={updateProfileMutation.isLoading}
            timeout={300}
            nodeRef={loadingOverlayRef}>
          <div className={s.loading_overlay} ref={loadingOverlayRef}>
            ...updating profile...<br />
            ┏(-_-)┛
          </div>
          </CSSTransition>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;