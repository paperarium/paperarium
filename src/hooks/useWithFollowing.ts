/*
 * useWithFollowing.tsx
 * author: evan kirkiles
 * created on Mon Sep 19 2022
 * 2022 the nobot space,
 */

import * as APIt from '../supabase/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  followProfile,
  getIsFollowing,
  profileKeys,
  unfollowProfile,
} from '../supabase/api/profiles';
import { useSessionContext } from '@supabase/auth-helpers-react';

export default function useWithFollowing(
  user_id?: string,
  following_id?: string
) {
  // use the query client for invalidating queries
  const queryClient = useQueryClient();
  const { supabaseClient } = useSessionContext();
  // get whether or not the logged-in user is following this profile
  const q_params = { user_id: user_id!, following_id: following_id! };
  const isFollowing = useQuery(
    profileKeys.getIsFollowing(q_params),
    () => getIsFollowing(supabaseClient)(q_params),
    {
      enabled: !!q_params.user_id && !!q_params.following_id,
    }
  ).data;
  // mutations for following / unfollowing
  const follow = useMutation(
    async () => {
      if (follow.isLoading) return;
      // creates a link between user_id and following in the database
      return followProfile(supabaseClient)(q_params);
    },
    {
      onSuccess: (profilesFollowers) => {
        if (!profilesFollowers) return;
        queryClient.invalidateQueries(
          profileKeys.get(profilesFollowers.follower.username)
        );
        queryClient.invalidateQueries(
          profileKeys.get(profilesFollowers.following.username)
        );
        queryClient.invalidateQueries(profileKeys.getIsFollowing(q_params));
      },
    }
  );
  const unfollow = useMutation(
    async () => {
      if (unfollow.isLoading) return;
      // creates a link between user_id and following in the database
      return unfollowProfile(supabaseClient)(q_params);
    },
    {
      onSuccess: (profilesFollowers) => {
        if (!profilesFollowers) return;
        queryClient.invalidateQueries(
          profileKeys.get(profilesFollowers.follower.username)
        );
        queryClient.invalidateQueries(
          profileKeys.get(profilesFollowers.following.username)
        );
        queryClient.invalidateQueries(profileKeys.getIsFollowing(q_params));
      },
    }
  );

  return {
    isFollowing,
    follow,
    unfollow,
  };
}
