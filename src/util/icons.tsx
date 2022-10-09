/*
 * icons.tsx
 * author: evan kirkiles
 * created on Sun Oct 09 2022
 * 2022 the nobot space,
 */
import {
  IoCubeOutline,
  IoHeartOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoShapesOutline,
} from 'react-icons/io5';
import {
  RiLayoutBottomLine,
  RiLayoutGridLine,
  RiUserReceivedLine,
  RiUserSharedLine,
} from 'react-icons/ri';
import { EBuildable, ECommunity, Layout } from './enums';
import * as APIt from '../supabase/types';
import { MdOutlineTableRows } from 'react-icons/md';

export const ENTITY_ICONS: { [key in EBuildable | ECommunity]: JSX.Element } = {
  [ECommunity.Profile]: <IoPersonOutline />,
  [ECommunity.Collective]: <IoPeopleOutline />,
  [EBuildable.Papercraft]: <IoShapesOutline />,
  [EBuildable.Build]: <IoCubeOutline />,
};

export const FIELD_ICONS: {
  [key in keyof (APIt.Papercraft &
    APIt.Build &
    APIt.Collective &
    APIt.Profile)]?: JSX.Element;
} = {
  n_papercrafts: ENTITY_ICONS[EBuildable.Papercraft],
  n_builds: ENTITY_ICONS[EBuildable.Build],
  n_followers: <RiUserReceivedLine />,
  n_following: <RiUserSharedLine />,
  n_likes: <IoHeartOutline />,
};

export const LAYOUT_ICONS: { [key in Layout]: JSX.Element } = {
  [Layout.Grid]: <RiLayoutGridLine />,
  [Layout.Compact]: <MdOutlineTableRows />,
  [Layout.Rows]: <RiLayoutBottomLine />,
};
