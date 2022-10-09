/*
 * PapercraftDisplay.tsx
 * author: evan kirkiles
 * created on Fri Sep 2 2022
 * 2022 the nobot space,
 */
import React, { Suspense, useState } from 'react';
import s from './PapercraftDisplay.module.scss';
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
import { getSelectTheme, Select } from '../misc/AsyncSelect';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useWithLikes, { LikeableEntity } from '../../hooks/useWithLikes';
import { buildKeys, getBuild } from '../../supabase/api/builds';

const DynamicEditFlow = dynamic(
  () => import('../_flows/FlowPapercraft/FlowPapercraft'),
  {
    suspense: true,
  }
);

type PapercraftDisplayProps = {
  papercraft: APIt.Papercraft;
  defaultBuildId?: string;
  defaultBuild?: APIt.Build; // a build to preview. not uploaded yet!
  preview?: boolean;
};

const PapercraftDisplay: React.FC<PapercraftDisplayProps> =
  function PapercraftDisplay({
    papercraft,
    defaultBuildId,
    defaultBuild,
    preview,
  }) {
    // router for rerouting
    const router = useRouter();

    // get current user, to see if we're an admin or own this craft
    const { user } = useUser();
    const { data: isAdmin } = useQuery(['isAdmin'], () => getIsAdmin());

    // if editing, replace the entire view with the papercraft flow
    const [editing, setEditing] = useState(false);
    // choose which variant to display from the dropdown
    const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
    const currVariant =
      selectedVariant === null
        ? papercraft
        : papercraft.variants[selectedVariant];

    // mutations for liking and unliking a papercraft
    const { isLiked, like, unlike } = useWithLikes(
      LikeableEntity.Papercraft,
      papercraft,
      user?.id,
      preview
    );

    // if there is a default build specified, use it's pictures. if a different build
    // was specified, use those pictures.
    const [buildId, setBuildId] = useState(
      defaultBuildId || papercraft.build_id
    );

    // pre-populate the build with the papercraft's display build, which
    // should already be provided. only do this if we didn't specify a diff build.
    const { data: build_data } = useQuery(
      buildKeys.get(buildId!),
      () => getBuild(buildId!),
      {
        enabled: !!buildId,
        initialData:
          buildId === papercraft.build_id
            ? papercraft.display_build
            : undefined,
      }
    );

    // this is the build to show, either a provided preview build, or a queried build, or a provided display build
    const build = defaultBuild || build_data || papercraft.display_build;

    // use the build to denote which pictures are used
    const pictures = build?.pictures || papercraft.pictures;

    return editing && user ? (
      <Suspense fallback={`Loading...`}>
        <DynamicEditFlow
          user={user}
          isAdmin={isAdmin}
          defaultPapercraft={papercraft}
          onSuccess={() => setEditing(false)}
          onBackButtonClick={() => setEditing(false)}
        />
      </Suspense>
    ) : (
      <div className={s.container}>
        <div className={s.display_column}>
          <div className={s.preview_content_container}>
            <div
              className={s.inner_image_container}
              style={{ marginTop: '5px' }}
            >
              <TextareaAutosize
                className={s.preview_title}
                value={papercraft.title || ''}
                placeholder={'Your title...'}
                spellCheck={false}
                readOnly={true}
              ></TextareaAutosize>
              <div
                className={s.like_container}
                style={preview ? { pointerEvents: 'none' } : undefined}
              >
                {isLiked ? (
                  <AiFillHeart
                    className={s.like_heart_filled}
                    onClick={() => unlike.mutate()}
                  />
                ) : (
                  <AiOutlineHeart
                    className={s.like_heart}
                    onClick={() => like.mutate()}
                  />
                )}
                <div className={s.like_number}>
                  {Intl.NumberFormat('en', { notation: 'compact' }).format(
                    papercraft.n_likes
                  )}
                </div>
              </div>
            </div>
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
                    papercraft.user.id === build?.user_id ? ' AND BUILT' : ''
                  } BY`}</div>
                </ProfileLink>
                {build && papercraft.user.id !== build.user_id ? (
                  <ProfileLink user={build.user} full>
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
                        <span>{papercraft.collective.n_members} members</span>
                        <span>
                          {papercraft.collective.n_papercrafts} papercrafts
                        </span>
                      </a>
                    </Link>
                  </div>
                ) : null}
              </div>
              <div className={s.info_col}>
                <div className={s.download_container}>
                  {papercraft.variants.length > 0 ? (
                    <Select
                      instanceId={'tag_select'}
                      isClearable={false}
                      defaultValue={{
                        value: null,
                        label: 'Main',
                      }}
                      options={[
                        { value: null, label: 'Main' },
                        ...papercraft.variants.map((variant, i) => ({
                          value: i,
                          label: variant.title,
                        })),
                      ]}
                      onChange={(variant: { value: number | null }) =>
                        setSelectedVariant(variant.value)
                      }
                      theme={getSelectTheme}
                    />
                  ) : null}
                  {currVariant.pdo_url ? (
                    <a
                      href={getPublicUrl(currVariant.pdo_url)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={s.download_button}
                    >
                      .PDO
                    </a>
                  ) : null}
                  {currVariant.pdf_lined_url ? (
                    <a
                      href={getPublicUrl(currVariant.pdf_lined_url)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={s.download_button}
                    >
                      .PDF - lined
                    </a>
                  ) : null}
                  {currVariant.pdf_lineless_url ? (
                    <a
                      href={getPublicUrl(currVariant.pdf_lineless_url)}
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
            navigation={true}
            spaceBetween={150}
            className={s.image_container}
            modules={[Pagination, Navigation]}
            pagination={{
              clickable: true,
              renderBullet: (index, className) =>
                `<div class="swiper-pagination-bullet ${className}">${
                  index + 1
                }</div>`,
            }}
          >
            {pictures.map(({ key }, i) => (
              <SwiperSlide
                key={`${key}_${i}`}
                className={s.inner_image_container}
              >
                {!key.startsWith('blob') ? (
                  <OptimizedImage
                    src={key}
                    className={s.inner_image}
                    sizes={`
                    (max-width: 767px) 100vw,
                     50vw
                    `}
                  />
                ) : (
                  <img
                    src={key}
                    className={s.inner_image}
                    alt={papercraft.title}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          className={s.sticky_header}
          style={
            preview
              ? {
                  position: 'absolute',
                  top: '0',
                }
              : undefined
          }
        >
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
