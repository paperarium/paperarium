import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { useState } from 'react';
import { AdminPaneProps } from '..';
import * as APIt from '../../../supabase/types';
import s from '../../../styles/admin/Admin.module.scss';
import {
  listProfiles,
  ListProfilesQueryVariables,
  profileKeys,
} from '../../../supabase/api/profiles';
import rectifyDateFormat from '../../../util/rectifyDateFormat';
import FormEditProfile from '../../_forms/FormEditProfile/FormEditProfile';
import OptimizedImage from '../../OptimizedImage/OptimizedImage';
import {
  collectiveKeys,
  createCollectivesProfiles,
} from '../../../supabase/api/collectives';

/**
 * The home page for admin activities
 * @returns
 */
const AdminProfilesPane: React.FC<AdminPaneProps> = ({
  activeProfile,
  setActiveProfile,
  activeCollective,
}) => {
  // search for profiles
  const [search, setSearch] = useState<string>('');
  const [currProfile, setCurrProfile] = useState<APIt.Profile | null>(
    activeProfile
  );
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const q_params: ListProfilesQueryVariables = {
    search: currentSearch,
    show_all: true,
  };
  const profiles = useQuery(profileKeys.list(q_params), () =>
    listProfiles(q_params)
  );

  // mutation for adding a user to a collective
  const queryClient = useQueryClient();
  const createCollectiveProfileMutation = useMutation(
    async ({
      collective_id,
      profile_id,
    }: {
      collective_id: number;
      profile_id: string;
    }) => {
      return createCollectivesProfiles({
        collective_id,
        profile_id,
      });
    },
    {
      onSuccess: (collectives_profiles) => {
        queryClient.invalidateQueries(collectiveKeys.gets());
      },
    }
  );

  return (
    <>
      <Head>
        <title>admin.profiles - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>
        <div className={s.query_col}>
          PROFILES
          <input
            type="text"
            value={search}
            placeholder={'Search by profile...'}
            className={s.search_bar}
            autoComplete={'off'}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                setCurrentSearch(search);
              }
            }}
          />
          <div className={s.results_container}>
            {profiles.data
              ? profiles.data.map((profile) => (
                  <div
                    className={`${s.result} ${
                      currProfile && currProfile.id === profile.id
                        ? 'active'
                        : null
                    }`}
                    key={profile.id}
                    onClick={() => setCurrProfile(profile)}
                  >
                    <div
                      className={s.result_pic}
                      style={{ borderRadius: '50%', overflow: 'hidden' }}
                    >
                      <OptimizedImage
                        src={profile.avatar_url}
                        className={s.inner_image}
                        sizes={`20px`}
                      />
                    </div>
                    @{profile.username}
                    <div className={s.result_username}>
                      {new Date(
                        rectifyDateFormat(profile.created_at)
                      ).toDateString()}
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div
            className={s.add_button}
            onClick={() => {
              setActiveProfile(currProfile);
            }}
          >
            SELECT PROFILE
          </div>
          <div
            className={s.add_button}
            onClick={async () => {
              await supabaseClient.rpc('generate_user');
            }}
          >
            GENERATE A PROFILE
          </div>
        </div>
        <div className={s.control_col}>
          <div className={s.colored_background}>
            {currProfile ? <FormEditProfile profile={currProfile} /> : null}
          </div>
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
            </div>
          ) : null}
          {activeCollective ? (
            <div className={s.collective_container}>
              SELECTED COLLECTIVE
              <div className={s.profile_picture}>
                <OptimizedImage
                  src={activeCollective.avatar_url}
                  className={s.inner_image}
                  sizes={`200px`}
                />
              </div>
              <div className={s.result_username}>
                @{activeCollective.titlecode}
              </div>
              {activeCollective.title}
              <div
                className={`${s.action_button} ${
                  currProfile && !createCollectiveProfileMutation.isLoading
                    ? ''
                    : 'disabled'
                }`}
                onClick={() => {
                  if (!currProfile) return;
                  createCollectiveProfileMutation.mutate({
                    collective_id: activeCollective.id,
                    profile_id: currProfile.id,
                  });
                }}
              >
                ADD TO
                <br />
                COLLECTIVE
              </div>
              <div className={s.action_button_note}>
                adds @{currProfile?.username} as a member of{' '}
                {activeCollective.title}. no current way to undo this from the
                admin console! talk to evan if you fuck up
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AdminProfilesPane;
