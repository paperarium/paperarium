import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import {
  AdminPane,
  AdminPaneProps,
  ADMIN_PANES,
} from '../../components/_admin';
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage';
import s from '../../styles/admin/Admin.module.scss';
import * as APIt from '../../supabase/types';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

/**
 * The home page for admin activities
 * @returns
 */
const AdminPage: NextPage = () => {
  // keep track of a "standin" user and collective for uploading federated crafts
  const [activeProfile, setActiveProfile] = useState<APIt.Profile | null>(null);
  const [activeCollective, setActiveCollective] =
    useState<APIt.Collective | null>(null);

  // stateful manages which pane is open
  const [activePane, setActivePane] = useState<AdminPane>(AdminPane.Profile);
  const { pane: Pane } = ADMIN_PANES[activePane];
  const adminPaneProps: AdminPaneProps = {
    activeProfile,
    activeCollective,
    setActiveProfile,
    setActiveCollective,
  };

  return (
    <>
      <Head>
        <title>admin - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>
        <div className={s.sidebar}>
          {Object.entries(ADMIN_PANES).map(([paneType, { icon }]) => (
            <div
              className={`${s.pane_icon} ${
                paneType === activePane ? 'active' : ''
              }`}
              key={paneType}
              onClick={() => setActivePane(paneType as AdminPane)}
            >
              {icon}
            </div>
          ))}
        </div>
        <div className={s.pane}>
          <Pane {...adminPaneProps}></Pane>
        </div>
      </div>
    </>
  );
};

/**
 * Run the intiial papercraft query on the server. This only queries for public
 * papercrafts, not worrying about RLS.
 * @param context
 * @returns
 */
export async function getServerSideProps(context: any) {
  const isAdmin = !!(
    await createServerSupabaseClient(context).rpc('get_is_admin')
  ).data;

  if (!isAdmin) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default AdminPage;
