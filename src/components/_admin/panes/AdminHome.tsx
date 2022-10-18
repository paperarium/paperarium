import { useSessionContext } from '@supabase/auth-helpers-react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { AdminPaneProps } from '..';
import s from '../../../styles/admin/Admin.module.scss';
import { listProfiles } from '../../../supabase/api/profiles';

/**
 * The home page for admin activities
 * @returns
 */
const AdminHomePane: React.FC<AdminPaneProps> = ({
  activeProfile,
  setActiveProfile,
}) => {
  const { supabaseClient } = useSessionContext();
  // search for profiles
  const [search, setSearch] = useState<string>('');
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const profiles = useQuery(
    ['admin', 'profiles', { search: currentSearch }],
    () => listProfiles(supabaseClient)({ search: currentSearch })
  );

  return (
    <>
      <Head>
        <title>admin.home - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>THIS IS THE ADMIN HOME</div>
    </>
  );
};

export default AdminHomePane;
