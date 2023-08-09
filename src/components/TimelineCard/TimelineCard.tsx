import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getProfile, profileKeys } from '../../supabase/api/profiles';
import PapercraftGallery from '../../components/PapercraftGallery/PapercraftGallery';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage';
import useWithFollowing from '../../hooks/useWithFollowing';
import FallbackOverlay from '../../components/FallbackOverlay/FallbackOverlay';
import { BiArrowBack } from 'react-icons/bi';
import { EBuildable } from '../../util/enums';

const TimelineCard = function TimelineCard(props) {
  return <h2>{props.title}</h2>;
};

export default TimelineCard;
