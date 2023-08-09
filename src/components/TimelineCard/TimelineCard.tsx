/*
 * ProfileDisplay.tsx
 * author: evan kirkiles
 * created on Thu Sep 29 2022
 * 2022 the nobot space,
 */
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getProfile, profileKeys } from '../../supabase/api/profiles';
import s from './ProfileDisplay.module.scss';
import PapercraftGallery from '../../components/PapercraftGallery/PapercraftGallery';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage';
import useWithFollowing from '../../hooks/useWithFollowing';
import FallbackOverlay from '../../components/FallbackOverlay/FallbackOverlay';
import { BiArrowBack } from 'react-icons/bi';
import { EBuildable } from '../../util/enums';

const ProfileDisplay = function ProfileDisplay() {
  return <p>Hello World!!!!!</p>;
};

export default ProfileDisplay;
