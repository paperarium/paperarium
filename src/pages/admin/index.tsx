import { supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AdminPane, AdminPaneProps, ADMIN_PANES } from "../../components/admin";
import OptimizedImage from "../../components/OptimizedImage/OptimizedImage";
import s from "../../styles/admin/Admin.module.scss";
import * as APIt from "../../supabase/types";

/**
 * The home page for admin activities
 * @returns
 */
const AdminPage: NextPage = () => {
  // keep track of a "standin" user for uploading federated crafts
  const [activeProfile, setActiveProfile] = useState<APIt.Profile | null>(null);

  // stateful manages which pane is open
  const [activePane, setActivePane] = useState<AdminPane>(AdminPane.Profile);
  const { pane: Pane } = ADMIN_PANES[activePane];
  const adminPaneProps: AdminPaneProps = {
    activeProfile,
    setActiveProfile,
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
                paneType === activePane ? "active" : ""
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
  const { data: isAdmin } = await supabaseServerClient(context).rpc<boolean>(
    "get_is_admin"
  );

  if (!isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default AdminPage;
