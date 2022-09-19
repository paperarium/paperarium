import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import s from '../../styles/profile/Edit.module.scss';
import { getSelf } from '../../supabase/api/profiles';
import { useUser } from '@supabase/auth-helpers-react';
import FormEditProfile from '../../components/FormEditProfile/FormEditProfile';
import { NextSeo } from 'next-seo';

const EditProfilePage: NextPage = () => {
  // initial queries
  const { user } = useUser();
  const { data: profile } = useQuery(
    ['profiles', { id: user?.id }],
    () => getSelf(user!.id),
    {
      enabled: !!user?.id,
    }
  );

  return (
    <>
      <Head>
        <title>edit profile - paperarium</title>
        <NextSeo
          canonical={'https://paperarium.place/profiles/edit'}
          description={'edit your profile here.'}
        />
      </Head>
      <div className={s.page_container}>
        {profile ? (
          <>
            <div className={s.sticky_header}>
              <Link href={`/profiles/${profile.username}`}>
                <div className={s.sticky_button}>
                  <BiArrowBack />
                  RETURN TO PROFILE
                </div>
              </Link>
            </div>
            <FormEditProfile profile={profile} redirectOnSuccess />
          </>
        ) : null}
      </div>
    </>
  );
};

export default EditProfilePage;
