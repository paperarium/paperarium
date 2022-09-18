/*
 * FlowPapercraft.tsx
 * author: evan kirkiles
 * created on Sun Sep 18 2022
 * 2022 the nobot space,
 */
import React, { useRef } from 'react';
import s from './FlowPapercraft.module.scss';
import { useState } from 'react';
import * as APIt from '../../supabase/types';
import { User } from '@supabase/auth-helpers-nextjs';
import { CSSTransition } from 'react-transition-group';
import PapercraftDisplay from '../../components/PapercraftDisplay/PapercraftDisplay';
import BlinkEffect from '../../components/BlinkEffect/BlinkEffect';
import { useRouter } from 'next/router';
import FormEditPapercraft, {
  FormEditPapercraftHandleProps,
} from '../../components/FormEditPapercraft/FormEditPapercraft';
import { getSelf, profileKeys } from '../../supabase/api/profiles';
import { useQuery } from '@tanstack/react-query';

type FlowPapercraftProps = {
  user: User;
  defaultPapercraft?: APIt.Papercraft;
  redirectOnSuccess?: boolean;
};

const FlowPapercraft: React.FC<FlowPapercraftProps> = ({
  user,
  defaultPapercraft,
  redirectOnSuccess,
}) => {
  // router to redirect on submissions success
  const router = useRouter();

  // reference to the form for CSS transitions
  const formRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  /* -------------------------------------------------------------------------- */
  /*                                PREVIEW STATE                               */
  /* -------------------------------------------------------------------------- */

  // statefuls for the papercraft in the preview
  const [papercraft, setPapercraft] = useState<APIt.Papercraft | null>(
    defaultPapercraft || null
  );
  const [canPreview, setCanPreview] = useState<boolean>(false);
  const [inPreview, setInPreview] = useState(false);
  const [inConfirm, setInConfirm] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<
    string | undefined
  >(undefined);

  // we forward an imperative ref to the form handle
  const formHandle = useRef<FormEditPapercraftHandleProps>(null);

  // query the user's current profile to be able to render it in the display
  const { data: profile } = useQuery(profileKeys.getSelf(), () =>
    getSelf(user.id)
  );

  /* -------------------------------------------------------------------------- */
  /*                                  RENDERING                                 */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <CSSTransition
        in={inPreview}
        nodeRef={formRef}
        timeout={700}
        classNames={'preview'}
      >
        <div className={s.upload_container} ref={formRef}>
          <div className={s.upload_col}>
            <div className={s.column_header}>
              <b>
                {!!defaultPapercraft ? 'edit' : 'upload'} a papercraft design
                slip!
              </b>
              <br /> after filling in all of the required fields, the submit
              button will activate and you can post your papercraft to our
              website.
            </div>
            <div className={s.spacer}></div>
            {profile ? (
              <FormEditPapercraft
                ref={formHandle}
                profile={profile}
                defaultPapercraft={defaultPapercraft}
                setSubmissionMessage={setSubmissionMessage}
                setCanPreview={setCanPreview}
              >
                <div
                  className={s.input_form_title}
                  onClick={() => {
                    if (inPreview) {
                      setInPreview(false);
                      setInConfirm(false);
                    }
                  }}
                >
                  INPUT FORM
                </div>
                <div
                  className={`${s.preview_show_button} ${
                    canPreview ? '' : 'disabled'
                  }`}
                  onClick={() => {
                    if (!formHandle.current) return;
                    if (!inPreview) {
                      if (canPreview) {
                        setPapercraft(formHandle.current.getPapercraft());
                        setInPreview(true);
                      }
                    } else {
                      setInPreview(false);
                      setInConfirm(false);
                    }
                  }}
                >
                  <BlinkEffect active={!!(canPreview && !inPreview)} />
                  REVIEW
                </div>
              </FormEditPapercraft>
            ) : null}
          </div>
          {/* SUBMISSION */}
          <div className={s.preview_container}>
            <div
              className={s.submit_button}
              onClick={async () => {
                if (inConfirm && formHandle.current) {
                  const pid = await formHandle.current.submitPapercraft();
                  redirectOnSuccess && router.push(`/papercrafts/${pid}`);
                } else {
                  setInConfirm(true);
                }
              }}
            >
              <BlinkEffect zIndex={-1} active={inPreview} />
              SUBMIT
            </div>
            <div className={s.preview_hidden_container}>
              {papercraft ? (
                <PapercraftDisplay papercraft={papercraft} preview />
              ) : null}
            </div>
            <CSSTransition in={inConfirm} nodeRef={backdropRef} timeout={300}>
              <div
                className={s.confirm_backdrop}
                ref={backdropRef}
                onClick={() => {
                  setInConfirm(false);
                }}
              >
                <div className={s.confirm_text}>
                  {submissionMessage ? (
                    submissionMessage
                  ) : (
                    <>
                      <h1>ready?</h1>
                      click the submit button again to confirm your submission
                      of the design
                      <br />
                      <br />
                      <i className={s.confirm_title}>{papercraft?.title}</i>.
                      <br />
                      <br />
                      <br />
                      <small>
                        or click anywhere else to return to editing.
                      </small>
                    </>
                  )}
                </div>
              </div>
            </CSSTransition>
            <div className={s.preview_cover}></div>
            <div className={s.preview_cover}></div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default FlowPapercraft;
