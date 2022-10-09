/*
 * FormEditBuild.tsx
 * author: evan kirkiles
 * created on Fri Oct 07 2022
 * 2022 the nobot space,
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { createBuild, updateBuild } from '../../../supabase/api/builds';
import * as APIt from '../../../supabase/types';
import { uploadImageFile } from '../../../util/uploadFile';
import { DatePicker } from '../../misc/DatePicker';
import s from '../FormEditPapercraft/FormEditPapercraft.module.scss';
import TextareaAutosize from 'react-textarea-autosize';
import MultiFileUpload from '../../MultiFileUpload/MultiFileUpload';

/* -------------------------------------------------------------------------- */
/*                                   TYPINGS                                  */
/* -------------------------------------------------------------------------- */

export type FormEditBuildHandleProps = {
  getBuild: () => APIt.Build;
  submitBuild: () => void;
};

type FormEditBuildProps = {
  profile: APIt.Profile;
  papercraft: APIt.Papercraft;
  defaultBuild?: APIt.Build;
  children?: React.ReactNode;
  isAdmin?: boolean;
  setSubmissionMessage: (message: string) => void;
  setCanPreview: (canPreview: boolean) => void;
  onSuccess: (build: APIt.Build) => void;
};

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

const FormEditBuild: React.ForwardRefRenderFunction<
  FormEditBuildHandleProps,
  FormEditBuildProps
> = function FormEditBuild(
  {
    defaultBuild,
    papercraft,
    profile,
    isAdmin,
    setSubmissionMessage,
    setCanPreview,
    onSuccess,
    children,
  },
  forwardedRef
) {
  // state managers for the state of the papercraft
  const queryClient = useQueryClient();

  // input form fields
  const [images, setImages] = useState<
    ((File & { blobURL: string }) | APIt.Picture)[] | null
  >(defaultBuild?.pictures || null);
  const [createdAt, setCreatedAt] = useState<Date>(
    defaultBuild ? new Date(defaultBuild.created_at) : new Date()
  );
  const [description, setDescription] = useState<string>(
    defaultBuild?.description || ''
  );

  /* -------------------------------------------------------------------------- */
  /*                             IMPERATIVE HANDLING                            */
  /* -------------------------------------------------------------------------- */

  // checks if can show preview
  useEffect(() => {
    setCanPreview(!!images?.length && !!description);
  }, [images, description]);

  // builds a preview papercraft from the user's information
  const getBuild = () => {
    if (!images) throw 'no images!';
    const build: APIt.Build = {
      id: defaultBuild?.id || '',
      user_id: profile.id,
      created_at: createdAt.toISOString(),
      updated_at: new Date().toDateString(),
      description: description,
      pictures: images.map((img) =>
        (img as File & { blobURL?: string }).blobURL
          ? {
              key: (img as File & { blobURL: string }).blobURL,
              width: 0,
              height: 0,
            }
          : (img as APIt.Picture)
      ),
      papercraft_id: papercraft.id,
      verified: false,
      user: defaultBuild?.user || profile,
      papercraft: papercraft,
      n_likes: 0,
    };
    return build;
  };

  // submits the build, either creating it (if no default build was
  // specified) or updating it (if a default build was specified).
  const submitBuild = useMutation(async () => {
    // do some quick form validation
    if (!description) throw 'missing description!';
    if (images === null || images.length === 0) throw 'missing images!';

    // set submitting message
    setSubmissionMessage('Uploading pictures...');

    // now generate the key for uploading things to the build
    const BUILD_KEY_PREFIX = `${profile.id}/builds/${papercraft.title.replace(
      /[^a-zA-Z0-9-_\.]/g,
      ''
    )}`;

    // 1. upload the images of the build. if images existed in the default
    //    papercraft, make sure we only upload new images that have appeared.
    //    that is, only upload files, not picture object images.
    const pictures: APIt.Picture[] = [];
    for (let i = 0; i < images.length; i++) {
      if ((images[i] as any).blobURL === undefined) {
        pictures.push(images[i] as APIt.Picture);
        continue;
      }
      const i_file = images[i] as File;
      const { name } = i_file;
      const fileName = `${BUILD_KEY_PREFIX}/IMAGE_${i}_${name.replace(
        /[^a-zA-Z0-9-_\.]/g,
        ''
      )}`;
      pictures.push(await uploadImageFile(fileName, i_file));
    }

    // 2. build the build
    let build: APIt.Build | undefined = defaultBuild;
    // if no papercraft id, we need to create this papercraft
    if (!build) {
      setSubmissionMessage('Creating build entry...');
      build = (
        await createBuild({
          user_id: profile.id,
          // @ts-ignore
          created_at: createdAt.toISOString().toLocaleString('zh-TW'),
          description,
          pictures,
          verified: false,
          papercraft_id: papercraft.id,
        })
      )[0];
      // otherwise, we're just updating the entry
    } else {
      setSubmissionMessage('Updating build entry...');
      build = (
        await updateBuild(build.id, {
          user_id: profile.id,
          // @ts-ignore
          created_at: createdAt.toISOString().toLocaleString('zh-TW'),
          description,
          pictures,
          papercraft_id: papercraft.id,
        })
      )[0];
    }

    // 3. Finished!
    setSubmissionMessage('Done!');
    return build;
  });

  // imperative handle allows us to retrieve the papercraft from this form, as
  // well as trigger events to submit the form.
  useImperativeHandle(forwardedRef, () => ({
    getBuild,
    submitBuild: submitBuild.mutate,
  }));

  /* -------------------------------------------------------------------------- */
  /*                                  COMPONENT                                 */
  /* -------------------------------------------------------------------------- */

  return (
    <div className={s.form_container}>
      {children}
      <div className={s.form_inner_container}>
        <div className={s.annotation}>
          Image * –– <i>what does the craft look like?</i>
        </div>
        <MultiFileUpload
          files={images}
          setFiles={(newimgs) => {
            if (newimgs == null) {
              setImages(null);
            } else {
              const newImages: typeof images = [];
              for (let i = 0; i < newimgs.length; i++) {
                if ((newimgs[i] as File).name !== undefined) {
                  (newimgs[i] as any).blobURL = URL.createObjectURL(
                    newimgs[i] as File
                  );
                }
                newImages.push(newimgs[i] as any);
              }
              setImages(newImages);
            }
          }}
          accept={'image/*'}
        >
          .PNG, .JPG...
        </MultiFileUpload>
        {isAdmin ? (
          <>
            <div className={s.annotation}>
              Creation Date (admin) * ––{' '}
              <i>when was this papercraft created?</i>
            </div>
            <DatePicker
              selected={createdAt}
              onChange={(date: Date) => {
                setCreatedAt(date);
              }}
              className={s.date_picker}
            />
          </>
        ) : null}
        <div className={s.annotation}>
          Description * –– <i>how did the build go?</i>
        </div>
        <TextareaAutosize
          className={s.description_input}
          placeholder={'Write a description...'}
          spellCheck={false}
          value={description}
          minRows={3}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></TextareaAutosize>
      </div>
    </div>
  );
};

export default forwardRef(FormEditBuild);
