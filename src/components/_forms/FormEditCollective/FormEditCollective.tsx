/*
 * FormEditCollective.tsx
 * author: evan kirkiles
 * created on Wed Sep 07 2022
 * 2022 the nobot space,
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { AiOutlineUpload, AiOutlineSave } from 'react-icons/ai';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { updateCollective } from '../../../supabase/api/collectives';
import * as APIt from '../../../supabase/types';
import { uploadFile } from '../../../util/uploadFile';
import OptimizedImage from '../../OptimizedImage/OptimizedImage';
import s from './FormEditCollective.module.scss';
import { CSSTransition } from 'react-transition-group';
import { useSessionContext } from '@supabase/auth-helpers-react';

type FormEditCollectiveProps = {
  collective: APIt.Collective;
  redirectOnSuccess?: boolean;
};

const FormEditCollective: React.FC<FormEditCollectiveProps> =
  function FormEditCollective({ collective, redirectOnSuccess }) {
    // meta statefuls
    const { supabaseClient } = useSessionContext();
    const router = useRouter();
    const loadingOverlayRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    // form input fields
    const [newAvatar, setNewAvatar] = useState<File | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const [title, setTitle] = useState<string | undefined>();
    const [titlecode, setTitlecode] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [xlink, setXlink] = useState<string | undefined>();

    // mutation for updating the collective
    const queryClient = useQueryClient();
    const updateCollectiveMutation = useMutation(
      async () => {
        // validate correct form inputs
        if (newAvatar && newAvatar.size / 1024 / 1024 > 5)
          throw 'avatar must be less than 5 mb';

        // upload the avatar url if there is one
        let uploaded_avatar_url: string | null = null;
        if (newAvatar) {
          const avatar_file = `${
            collective.id
          }/avatars/${newAvatar.name.replace(/[^a-zA-Z0-9-_\.]/g, '')}`;
          uploaded_avatar_url = await uploadFile(
            supabaseClient,
            avatar_file,
            newAvatar
          );
        }

        // create the mutation input
        const input: Partial<APIt.CollectiveInput> = {};
        title && (input.title = title);
        titlecode !== undefined && (input.titlecode = titlecode);
        description !== undefined && (input.description = description);
        xlink !== undefined && (input.xlink = xlink);
        uploaded_avatar_url !== null &&
          (input.avatar_url = uploaded_avatar_url);

        // perform the mutation
        return await updateCollective(supabaseClient)(
          collective.id,
          input as APIt.CollectiveInput
        );
      },
      {
        // on begin, start the loading spinner
        onMutate() {
          setIsLoading(true);
        },
        // on success, we need to invalidate our previous collective queries
        onSuccess: (collective) => {
          queryClient.invalidateQueries(['collectives', { id: collective.id }]);
          if (redirectOnSuccess) {
            router.replace(`/collectives/${collective.titlecode}`);
          } else {
            setIsLoading(false);
          }
        },
        // one error, remove the loading spinner
        onError: () => {
          setIsLoading(false);
        },
      }
    );

    // check if there is any necessary change
    const isTheSame =
      !newAvatar &&
      (title === undefined || title === collective.title) &&
      (titlecode === undefined || titlecode === collective.titlecode) &&
      (description === undefined || description == collective.description) &&
      (xlink === undefined || xlink == collective.xlink);

    return (
      <div className={s.collective_card}>
        <label
          className={s.collective_picture}
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
              src={collective.avatar_url || undefined}
              className={s.inner_image}
              sizes={'150px'}
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
              e.target.value = '';
            }
          }}
        />
        <div className={s.annotation}>TITLE CODE</div>
        <input
          type="text"
          className={s.input_field}
          value={`@${titlecode || collective.titlecode}`}
          onChange={(e) =>
            setTitlecode(e.target.value.replace(/[^a-zA-Z0-9-_\.]/g, ''))
          }
        />
        <div className={s.annotation}>DISPLAY TITLE</div>
        <input
          type="text"
          className={s.input_field}
          placeholder={'Add a display name...'}
          value={title || collective.title || ''}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={s.annotation}>DESCRIPTION</div>
        <ReactTextareaAutosize
          className={s.description_input}
          placeholder={'Write a bio...'}
          spellCheck={false}
          value={description || collective.description || ''}
          minRows={3}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></ReactTextareaAutosize>
        <div className={s.annotation}>WEBSITE</div>
        <input
          type="text"
          className={s.input_field}
          placeholder={'Link your website...'}
          value={xlink || collective.xlink || ''}
          onChange={(e) => setXlink(e.target.value)}
        />
        <div
          className={`${s.save_button} ${isTheSame ? 'disabled' : ''}`}
          onClick={() => {
            updateCollectiveMutation.mutate();
          }}
        >
          {isTheSame ? 'UP TO DATE.' : 'SAVE'}
          <AiOutlineSave />
        </div>
        <CSSTransition
          appear
          in={isLoading}
          timeout={300}
          nodeRef={loadingOverlayRef}
        >
          <div className={s.loading_overlay} ref={loadingOverlayRef}>
            ...updating collective...
            <br />
            ┏(-_-)┛
          </div>
        </CSSTransition>
      </div>
    );
  };

export default FormEditCollective;
