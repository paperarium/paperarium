/*
 * PapercraftDisplay.tsx
 * author: evan kirkiles
 * created on Fri Sep 2 2022
 * 2022 the nobot space,
 */
import React, { Suspense, useState } from 'react';
import s from './PapercraftDisplay.module.scss';
import { Papercraft } from '../../supabase/types';
import TextareaAutosize from 'react-textarea-autosize';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import * as APIt from '../../supabase/types';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import { FiEdit3, FiShare } from 'react-icons/fi';
import { useRouter } from 'next/router';
import getPublicUrl from '../../util/getPublicUrl';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import rectifyDateFormat from '../../util/rectifyDateFormat';
import ProfileLink from '../ProfileLink/ProfileLink';
import { useUser } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { getIsAdmin } from '../../supabase/api/profiles';
import dynamic from 'next/dynamic';

const DynamicEditFlow = dynamic(
  () => import('../FlowPapercraft/FlowPapercraft'),
  {
    suspense: true,
  }
);

type PapercraftDisplayProps = {
  papercraft: Papercraft;
  preview?: boolean;
};

const PapercraftDisplay: React.FC<PapercraftDisplayProps> =
  function PapercraftDisplay({ papercraft, preview }) {
    // router for rerouting
    const router = useRouter();

    // get current user, to see if we're an admin or own this craft
    const { user } = useUser();
    const { data: isAdmin } = useQuery(['isAdmin'], () => getIsAdmin());

    // if editing, replace the entire view with the papercraft flow
    const [editing, setEditing] = useState(false);

    return editing && user ? (
      <Suspense fallback={`Loading...`}>
        <DynamicEditFlow
          user={user}
          defaultPapercraft={papercraft}
          onSuccess={() => setEditing(false)}
          onBackButtonClick={() => setEditing(false)}
        />
      </Suspense>
    ) : (
      <div className={s.container}>
        <div className={s.display_column}>
          <div className={s.preview_content_container}>
            <TextareaAutosize
              className={s.preview_title}
              value={papercraft.title || ''}
              placeholder={'Your title...'}
              spellCheck={false}
              readOnly={true}
            ></TextareaAutosize>
            <div className={s.date_input}>
              {new Date(
                rectifyDateFormat(papercraft.created_at)
              ).toDateString()}
            </div>
            <TextareaAutosize
              className={s.preview_description}
              value={papercraft.description || ''}
              placeholder={'Your description...'}
              spellCheck={false}
              minRows={3}
              readOnly={true}
            ></TextareaAutosize>
            {papercraft.xlink ? (
              <div className={s.xlink_container}>
                <a
                  href={papercraft.xlink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {'> '}Original link{' '}
                  <i>({new URL(papercraft.xlink).hostname})</i>
                </a>
              </div>
            ) : null}
            <div className={s.more_info_container}>
              <div className={s.info_col}>
                <div className={s.tags_row}>
                  <div className={s.tags_container}>
                    <div className={s.tag}>
                      {Object.values(APIt.Difficulty)[papercraft.difficulty]}
                    </div>
                    {papercraft.tags.map((tag) => (
                      <div key={tag.id} className={s.tag}>
                        {tag.name}
                      </div>
                    ))}
                  </div>
                  {papercraft.dimensions_cm ? (
                    <div className={s.dimensions_container}>
                      {`${papercraft.dimensions_cm?.join('cm x ')}cm`}
                    </div>
                  ) : null}
                </div>
                <ProfileLink user={papercraft.user} full>
                  <div className={s.container_note}>{`DESIGNED${
                    papercraft.user.id === papercraft.display_build?.user_id
                      ? ' AND BUILT'
                      : ''
                  } BY`}</div>
                </ProfileLink>
                {papercraft.display_build &&
                papercraft.user.id !== papercraft.display_build.user_id ? (
                  <ProfileLink user={papercraft.display_build.user} full>
                    <div className={s.container_note}>BUILT BY</div>
                  </ProfileLink>
                ) : null}
                {papercraft.collective ? (
                  <div className={s.profile_container}>
                    <div className={s.container_note}>THROUGH COLLECTIVE</div>
                    <Link
                      href={`/collectives/${papercraft.collective.titlecode}`}
                      passHref
                    >
                      <a>
                        <div className={s.profile_picture}>
                          {papercraft.collective.avatar_url ? (
                            <OptimizedImage
                              src={papercraft.collective.avatar_url}
                              sizes={'20vw'}
                              className={s.profile_pic_image}
                            />
                          ) : null}
                        </div>
                      </a>
                    </Link>
                    <Link
                      href={`/collectives/${papercraft.collective.titlecode}`}
                      passHref
                    >
                      <a className={s.profile_name}>
                        <span className={s.user_name}>
                          @{papercraft.collective.titlecode}
                        </span>
                        <span>
                          {papercraft.collective.n_members[0].count} members
                        </span>
                        <span>
                          {papercraft.collective.n_papercrafts[0].count}{' '}
                          papercrafts
                        </span>
                      </a>
                    </Link>
                  </div>
                ) : null}
              </div>
              <div className={s.info_col}>
                <div className={s.download_container}>
                  {papercraft.pdo_url ? (
                    <a
                      href={getPublicUrl(papercraft.pdo_url)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={s.download_button}
                    >
                      .PDO
                    </a>
                  ) : null}
                  {papercraft.pdf_lined_url ? (
                    <a
                      href={getPublicUrl(papercraft.pdf_lined_url)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={s.download_button}
                    >
                      .PDF - lined
                    </a>
                  ) : null}
                  {papercraft.pdf_lineless_url ? (
                    <a
                      href={getPublicUrl(papercraft.pdf_lineless_url)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={s.download_button}
                    >
                      .PDF - lineless
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.divider}></div>
        <div className={s.picture_column}>
          <Swiper
            pagination={true}
            navigation={true}
            className={s.image_container}
            modules={[Pagination, Navigation]}
          >
            {papercraft.pictures.map((imgURL, i) => (
              <SwiperSlide
                key={`${imgURL}_${i}`}
                className={s.inner_image_container}
              >
                {!papercraft.pictures[0].key.startsWith('blob') ? (
                  <OptimizedImage
                    src={papercraft.pictures[0].key}
                    className={s.inner_image}
                    sizes={`
                    (max-width: 767px) 100vw,
                     50vw
                    `}
                  />
                ) : (
                  <img
                    src={papercraft.pictures[0].key}
                    className={s.inner_image}
                    alt={papercraft.title}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={s.sticky_header}>
          <div
            className={s.sticky_button}
            onClick={!preview ? () => router.back() : undefined}
          >
            <BiArrowBack />
            BACK
          </div>
          <div style={{ flex: 1 }}></div>
          {papercraft.user_id === user?.id || isAdmin ? (
            <div
              className={`${s.sticky_button} ${s.sticky_button_right_2}`}
              onClick={!preview ? () => setEditing(true) : undefined}
            >
              <FiEdit3 />
            </div>
          ) : null}
          {typeof navigator !== 'undefined' && !!navigator.canShare ? (
            <div
              className={`${s.sticky_button} ${s.sticky_button_right}`}
              onClick={() => {
                if (preview) return;
                navigator
                  .share({
                    title: `${papercraft.title} on Paperarium`,
                    text: `check out this papercraft on paperarium (づ◔ ͜ʖ◔)づ`,
                    url: router.asPath,
                  })
                  .then(() => {
                    console.log('shared!');
                  })
                  .catch(() => {
                    console.log('share cancelled.');
                  });
              }}
            >
              <FiShare />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

export default PapercraftDisplay;
