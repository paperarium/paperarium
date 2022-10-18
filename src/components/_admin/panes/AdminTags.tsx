import * as APIt from '../../../supabase/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { AdminPaneProps } from '..';
import s from '../../../styles/admin/Admin.module.scss';
import s2 from '../../../styles/admin/AdminTags.module.scss';
import { createTag, listTags, tagsKeys } from '../../../supabase/api/tags';
import { GrClose } from 'react-icons/gr';
import { CSSTransition } from 'react-transition-group';
import { useSessionContext } from '@supabase/auth-helpers-react';

let nTags = 0;

/**
 * The home page for admin tag activities
 * @returns
 */
const AdminTagsPane: React.FC<AdminPaneProps> = () => {
  // search for tags
  const { supabaseClient } = useSessionContext();
  const [search, setSearch] = useState<string>('');
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const [currTag, setCurrTag] = useState<APIt.Tag | null>(null);
  const tags = useQuery(
    ['admin', ...tagsKeys.list({ search: currentSearch })],
    () => listTags(supabaseClient)({ search: currentSearch })
  );
  const [showCreate, setShowCreate] = useState(true);
  const [createTagsInput, setCreateTagsInput] = useState<APIt.Tag[]>([
    {
      id: nTags,
      name: '',
      code: '',
      n_papercrafts: 0,
    },
  ]);
  // function for mutating
  const queryClient = useQueryClient();
  const overlayRef = useRef<HTMLDivElement>(null);
  const createTagsMutation = useMutation(
    async () => {
      if (createTagsMutation.isLoading) return;
      const inputtedTags = createTagsInput.reduce<APIt.TagInput[]>(
        (acc, tag) => {
          if (!tag.name && !tag.code) return acc;
          acc.push({
            name: tag.name,
            code: tag.code,
          });
          return acc;
        },
        []
      );
      // adds all the tags
      await createTag(supabaseClient)(inputtedTags);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['admin', ...tagsKeys.lists()]);
        nTags += 1;
        setCreateTagsInput([
          {
            id: nTags,
            name: '',
            code: '',
            n_papercrafts: 0,
          },
        ]);
      },
    }
  );

  return (
    <>
      <Head>
        <title>admin.tags - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>
        <div className={s.query_col}>
          TAGS
          <input
            type="text"
            value={search}
            placeholder={'Search by tag name...'}
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
            {tags.data
              ? tags.data.map((tag) => (
                  <div
                    className={`${s.result} ${
                      currTag && currTag.id === tag.id ? 'active' : null
                    }`}
                    key={tag.id}
                    onClick={() => {
                      setCurrTag(tag);
                      setShowCreate(false);
                    }}
                    style={{ paddingLeft: '5px' }}
                  >
                    {tag.name}
                    <div className={s.result_username}>{tag.code}</div>
                  </div>
                ))
              : null}
          </div>
          <div
            className={s.add_button}
            onClick={async () => {
              setShowCreate(true);
            }}
          >
            ADD A TAG
          </div>
        </div>
        <div className={s.control_col}>
          <div className={s.colored_background}>
            {showCreate ? (
              <div className={s2.container}>
                <div className={s2.modal_header}>CREATE TAGS</div>
                <div className={s2.tags_holder}>
                  {createTagsInput.map((tag, i) => (
                    <div className={s2.tags_input_row} key={tag.id}>
                      <input
                        type="text"
                        className={s2.input_field}
                        placeholder={'Name (Nintendo, e.g.)'}
                        value={tag.name}
                        onChange={(e) => {
                          const tags = [...createTagsInput];
                          tags[i].name = e.target.value;
                          setCreateTagsInput(tags);
                        }}
                      />
                      <input
                        type="text"
                        className={s2.input_field}
                        placeholder={'Code (nintendo, e.g.)'}
                        value={tag.code}
                        onChange={(e) => {
                          const tags = [...createTagsInput];
                          tags[i].code = e.target.value.replaceAll(' ', '');
                          setCreateTagsInput(tags);
                        }}
                      />
                      <div
                        className={s2.tag_delete_button}
                        onClick={() => {
                          const tags = [...createTagsInput];
                          tags.splice(i, 1);
                          nTags += 1;
                          if (tags.length == 0) {
                            setCreateTagsInput([
                              {
                                id: nTags,
                                name: '',
                                code: '',
                                n_papercrafts: 0,
                              },
                            ]);
                          } else {
                            setCreateTagsInput(tags);
                          }
                        }}
                      >
                        <GrClose />
                      </div>
                    </div>
                  ))}
                  <div
                    className={s2.add_tag_button}
                    onClick={() => {
                      nTags += 1;
                      setCreateTagsInput([
                        ...createTagsInput,
                        {
                          id: nTags,
                          name: '',
                          code: '',
                          n_papercrafts: 0,
                        },
                      ]);
                    }}
                  >
                    + add another tag
                  </div>
                  <div
                    className={s2.submit_button}
                    onClick={() => createTagsMutation.mutate()}
                  >
                    SUBMIT
                  </div>
                  <CSSTransition
                    timeout={300}
                    in={createTagsMutation.isLoading}
                    nodeRef={overlayRef}
                  >
                    <div className={s2.loading_overlay} ref={overlayRef}>
                      creating...
                    </div>
                  </CSSTransition>
                </div>
              </div>
            ) : currTag ? (
              currTag.name
            ) : (
              <div>SELECT A TAG TO SHOW IT HERE</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTagsPane;
