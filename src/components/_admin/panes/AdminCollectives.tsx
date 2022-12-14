import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { useState } from 'react';
import { AdminPaneProps } from '..';
import * as APIt from '../../../supabase/types';
import s from '../../../styles/admin/Admin.module.scss';
import {
  collectiveKeys,
  listCollectives,
} from '../../../supabase/api/collectives';
import OptimizedImage from '../../OptimizedImage/OptimizedImage';
import FormEditCollective from '../../_forms/FormEditCollective/FormEditCollective';
import { useSessionContext } from '@supabase/auth-helpers-react';

/**
 * The home page for admin collective activities
 * @returns
 */
const AdminCollectivesPane: React.FC<AdminPaneProps> = ({
  activeCollective,
  setActiveCollective,
}) => {
  const { supabaseClient } = useSessionContext();
  // search for collectives
  const [search, setSearch] = useState<string>('');
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const [currCollective, setCurrCollective] = useState<APIt.Collective | null>(
    null
  );
  const qparams = { search: currentSearch };
  const collectives = useQuery(['admin', collectiveKeys.list(qparams)], () =>
    listCollectives(supabaseClient)(qparams)
  );

  return (
    <>
      <Head>
        <title>admin.collectives - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>
        <div className={s.query_col}>
          COLLECTIVES
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
            {collectives.data
              ? collectives.data.data.map((collective) => (
                  <div
                    className={`${s.result} ${
                      currCollective && currCollective.id === collective.id
                        ? 'active'
                        : null
                    }`}
                    key={collective.id}
                    onClick={() => setCurrCollective(collective)}
                  >
                    <div className={s.result_pic}>
                      <OptimizedImage
                        src={collective.avatar_url || undefined}
                        className={s.inner_image}
                        sizes={`20px`}
                      />
                    </div>
                    {collective.title}
                    <div className={s.result_username}>
                      @{collective.titlecode}
                    </div>
                    <div className={s.result_username}>
                      {collective.n_members} members
                    </div>
                    <div className={s.result_username}>
                      {collective.n_papercrafts} papercrafts
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div
            className={s.add_button}
            onClick={() => {
              setActiveCollective(currCollective);
            }}
          >
            SELECT COLLECTIVE
          </div>
        </div>
        <div className={s.control_col}>
          <div className={s.colored_background}>
            {currCollective ? (
              <FormEditCollective collective={currCollective} />
            ) : null}
          </div>
          {activeCollective ? (
            <div className={s.collective_container}>
              SELECTED COLLECTIVE
              <div className={s.profile_picture}>
                <OptimizedImage
                  src={activeCollective.avatar_url || undefined}
                  className={s.inner_image}
                  sizes={`200px`}
                />
              </div>
              <div className={s.result_username}>
                @{activeCollective.titlecode}
              </div>
              {activeCollective.title}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AdminCollectivesPane;
