import { supabaseServerClient } from '@supabase/auth-helpers-nextjs';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { AdminPane, AdminPaneProps } from '..';
import * as APIt from '../../../supabase/types';
import s from '../../../styles/admin/Admin.module.scss';
import {
  getPapercraft,
  listPapercrafts,
  papercraftKeys,
  updatePapercraft,
} from '../../../supabase/api/papercrafts';
import PapercraftDisplay from '../../PapercraftDisplay/PapercraftDisplay';
import Imgix from 'react-imgix';
import OptimizedImage from '../../OptimizedImage/OptimizedImage';

/**
 * The home page for admin papercraft activities
 * @returns
 */
const AdminPapercraftsPane: React.FC<AdminPaneProps> = ({
  activeProfile,
  setActiveProfile,
}) => {
  // search for papercrafts
  const [search, setSearch] = useState<string>('');
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const [currPapercraft, setCurrPapercraft] = useState<APIt.Papercraft | null>(
    null
  );

  // queries
  const list_q_params = { search: currentSearch };
  const papercrafts = useQuery(papercraftKeys.list(list_q_params), () =>
    listPapercrafts(list_q_params)
  );
  const selectedPapercraft = useQuery(
    papercraftKeys.get(currPapercraft?.id || ''),
    () => getPapercraft(currPapercraft!.id),
    { enabled: !!currPapercraft }
  );

  // mutation for transferring ownership of a papercraft / updating it
  const queryClient = useQueryClient();
  const updatePapercraftMutation = useMutation(
    async ({ id, input }: { id: string; input: Partial<APIt.Papercraft> }) => {
      return updatePapercraft(id, input);
    },
    {
      onSuccess: (papercraft) => {
        queryClient.invalidateQueries(papercraftKeys.lists());
        queryClient.invalidateQueries(papercraftKeys.get(papercraft[0].id));
      },
    }
  );

  return (
    <>
      <Head>
        <title>admin.papercrafts - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>
        <div className={s.query_col}>
          PAPERCRAFTS
          <input
            type="text"
            value={search}
            placeholder={'Search by title...'}
            className={s.search_bar}
            autoComplete={'off'}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setCurrentSearch(search);
              }
            }}
          />
          <div className={s.results_container}>
            {papercrafts.data
              ? papercrafts.data.map((papercraft) => (
                  <div
                    className={`${s.result} ${
                      currPapercraft && currPapercraft.id === papercraft.id
                        ? 'active'
                        : null
                    }`}
                    key={papercraft.id}
                    onClick={() => setCurrPapercraft(papercraft)}
                  >
                    <div className={s.result_pic}>
                      <OptimizedImage
                        src={papercraft.pictures[0].key}
                        className={s.inner_image}
                        sizes={`20px`}
                      />
                    </div>
                    {papercraft.title}
                    <div className={s.result_username}>
                      @{papercraft.user.username}
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className={s.control_col}>
          {selectedPapercraft.data ? (
            <PapercraftDisplay papercraft={selectedPapercraft.data} />
          ) : (
            <div>SELECT A PAPERCRAFT TO SHOW IT HERE</div>
          )}
          {activeProfile ? (
            <div className={s.profile_container}>
              SELECTED PROFILE
              <div className={s.profile_picture}>
                <OptimizedImage
                  src={activeProfile.avatar_url}
                  className={s.inner_image}
                  sizes={`200px`}
                />
              </div>
              <div className={s.result_username}>@{activeProfile.username}</div>
              {activeProfile.name}
              <div
                className={`${s.action_button} ${
                  currPapercraft &&
                  currPapercraft.user_id !== activeProfile.id &&
                  !updatePapercraftMutation.isLoading
                    ? ''
                    : 'disabled'
                }`}
                onClick={() => {
                  if (!currPapercraft) return;
                  updatePapercraftMutation.mutate({
                    id: currPapercraft.id,
                    input: { user_id: activeProfile.id },
                  });
                }}
              >
                TRANSFER
                <br />
                OWNERSHIP
              </div>
              <div className={s.action_button_note}>
                makes @{activeProfile.username} the designer of this papercraft.
                use this for moving archived papercrafts into their respective
                designers&apos; profiles.
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AdminPapercraftsPane;
