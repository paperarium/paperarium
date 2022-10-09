/*
 * FlowPapercraft.tsx
 * author: evan kirkiles
 * created on Sun Sep 18 2022
 * 2022 the nobot space,
 */
import React, { useRef } from 'react';
import s from '../FlowPapercraft/FlowPapercraft.module.scss';
import { useState } from 'react';
import * as APIt from '../../../supabase/types';
import { User } from '@supabase/auth-helpers-nextjs';
import { CSSTransition } from 'react-transition-group';
import PapercraftDisplay from '../../PapercraftDisplay/PapercraftDisplay';
import BlinkEffect from '../../BlinkEffect/BlinkEffect';
import { getSelf, profileKeys } from '../../../supabase/api/profiles';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import FormEditBuild, {
  FormEditBuildHandleProps,
} from '../../_forms/FormEditBuild/FormEditBuild';
import {
  getPapercraft,
  listPapercrafts,
  papercraftKeys,
} from '../../../supabase/api/papercrafts';
import getNextPageParam from '../../../util/getNextPageParam';
import SearchModal from '../../SearchModal/SearchModal';
import { EBuildable } from '../../../util/enums';

type FlowBuildProps = {
  user: User;
  isAdmin?: boolean;
  defaultPapercraftId?: string;
  defaultBuild?: APIt.Build;
  onSuccess: (papercraft_id: string, build_id: string) => void;
  onBackButtonClick?: () => void;
};

const FlowBuild: React.FC<FlowBuildProps> = ({
  user,
  defaultPapercraftId,
  defaultBuild,
  isAdmin,
  onSuccess,
  onBackButtonClick,
}) => {
  // reference to the form for CSS transitions
  const formRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  /* -------------------------------------------------------------------------- */
  /*                                PREVIEW STATE                               */
  /* -------------------------------------------------------------------------- */

  // statefuls for the build in the preview
  const [papercraftId, setPapercraftId] = useState<string | null>(
    defaultPapercraftId ?? null
  );
  const [build, setBuild] = useState<APIt.Build | null>(defaultBuild ?? null);
  const [canPreview, setCanPreview] = useState<boolean>(false);
  const [inPreview, setInPreview] = useState(false);
  const [inConfirm, setInConfirm] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<
    string | undefined
  >(undefined);

  // we forward an imperative ref to the form handle
  const formHandle = useRef<FormEditBuildHandleProps>(null);

  // query the user's current profile to be able to render it in the display
  const { data: profile } = useQuery(profileKeys.getSelf(), () =>
    getSelf(user.id)
  );

  // search for papercrafts when no papercraft is set
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const fullPParams = {
    search: currentSearch,
    username: undefined,
    collective: undefined,
    tags: undefined,
    filter: undefined,
  };
  const papercraftsQuery = useInfiniteQuery<APIt.Papercraft[]>(
    papercraftKeys.list(fullPParams),
    ({ pageParam = null }) => listPapercrafts(fullPParams, pageParam),
    {
      enabled: !papercraftId,
      getNextPageParam: getNextPageParam(fullPParams),
    }
  );
  // and when we have a papercraft id, query the papercraft
  const papercraft = useQuery<APIt.Papercraft>(
    papercraftKeys.get(papercraftId!),
    () => getPapercraft(papercraftId!),
    { enabled: !!papercraftId }
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
              <div className={s.back_button} onClick={onBackButtonClick}>
                {'<'}
              </div>
              <div className={s.column_label}>
                <b>
                  {!!defaultBuild ? 'edit' : 'upload'} a papercraft build slip!
                </b>
                <br /> after filling in all of the required fields, the submit
                button will activate and you can post your build to our website.
              </div>
            </div>
            <div className={s.spacer}></div>
            {profile ? (
              papercraft.data ? (
                <FormEditBuild
                  ref={formHandle}
                  profile={profile}
                  isAdmin={isAdmin}
                  papercraft={papercraft.data}
                  setPapercraftId={setPapercraftId}
                  setSubmissionMessage={setSubmissionMessage}
                  setCanPreview={setCanPreview}
                  onSuccess={({ id }) => onSuccess(build!.papercraft_id, id)}
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
                          setBuild(formHandle.current.getBuild());
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
                </FormEditBuild>
              ) : (
                <SearchModal
                  entityType={EBuildable.Papercraft}
                  defaultParams={{
                    search: '',
                    username: undefined,
                    collective: undefined,
                    tags: undefined,
                    filter: undefined,
                  }}
                  query={listPapercrafts}
                  keyFactory={papercraftKeys}
                  onCellClick={({ id }) => setPapercraftId(id)}
                />
              )
            ) : null}
          </div>
          {/* SUBMISSION */}
          <div className={s.preview_container}>
            <div
              className={s.submit_button}
              onClick={async () => {
                if (inConfirm && formHandle.current) {
                  formHandle.current.submitBuild();
                } else {
                  setInConfirm(true);
                }
              }}
            >
              <BlinkEffect zIndex={-1} active={inPreview} />
              SUBMIT
            </div>
            <div className={s.preview_hidden_container}>
              {papercraft.data && build ? (
                <PapercraftDisplay
                  papercraft={papercraft.data}
                  defaultBuild={build}
                  preview
                />
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
                      click the submit button again to confirm the submission of
                      your build of @{papercraft.data?.user.username}&apos;s
                      <br />
                      <br />
                      <i className={s.confirm_title}>
                        {papercraft.data?.title}
                      </i>
                      .
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

export default FlowBuild;
