/*
 * useWithLiked.ts
 * author: evan kirkiles
 * created on Thu Sep 29 2022
 * 2022 the nobot space,
 */
import * as APIt from '../supabase/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { papercraftKeys } from '../supabase/api/papercrafts';
import { collectiveKeys } from '../supabase/api/collectives';
import { buildKeys } from '../supabase/api/builds';

export enum LikeableEntity {
  Papercraft = 'papercraft',
  Build = 'build',
}

type LikeableEntityMeta = {
  keyFactory: {
    get: (id: string) => readonly any[];
    isLiked: (id: string) => readonly any[];
  };
};

const LIKEABLE_ENTITY_MAP: { [key in LikeableEntity]: LikeableEntityMeta } = {
  [LikeableEntity.Papercraft]: {
    keyFactory: papercraftKeys,
  },
  [LikeableEntity.Build]: {
    keyFactory: buildKeys,
  },
};

export default function useWithLikes<T extends { id: string; n_likes: number }>(
  entity_type: LikeableEntity,
  entity?: T,
  user_id?: string,
  is_preview?: boolean
) {
  // get the factory from the type
  const { keyFactory } = LIKEABLE_ENTITY_MAP[entity_type];
  // use the query client for invalidating queries
  const queryClient = useQueryClient();
  const accessor = `${entity_type}_id`;
  // get whether or not the logged-in user has liked this entity
  const q_params = { user_id: user_id!, [accessor]: entity?.id };
  const isLiked = useQuery(
    keyFactory.isLiked(entity!.id),
    async () => {
      let req = supabaseClient.from<T>(`${entity_type}s_likes`);
      const { data, error } = await req.select('*').match(q_params);
      if (error) throw error;
      return !!data[0];
    },
    {
      enabled: !!entity?.id && !is_preview,
    }
  ).data;
  // mutations for liking / unliking
  const like = useMutation(
    async () => {
      if (like.isLoading || isLiked || is_preview) return;
      // creates a link between user_id and following in the database
      const { data: like_entity, error } = await supabaseClient
        .from<T>(`${entity_type}s_likes`)
        .insert(q_params as any);
      if (error) throw error;
      return like_entity;
    },
    {
      onMutate: async () => {
        const keys = keyFactory.isLiked(entity!.id);
        const entityKey = keyFactory.get(entity!.id);
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(keys);
        await queryClient.cancelQueries(entityKey);
        // Snapshot the previous value
        const previousLiked = queryClient.getQueryData(keys);
        const previousEntity = queryClient.getQueryData<T>(entityKey);
        // optimistiically update the value
        queryClient.setQueryData(keys, true);
        if (previousEntity) {
          queryClient.setQueryData(entityKey, {
            ...previousEntity,
            n_likes: previousEntity.n_likes + 1,
          });
        }
        return { previousLiked, likedUpdates: true };
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(keyFactory.isLiked(entity!.id));
      },
    }
  );
  // mutations for liking / unliking
  const unlike = useMutation(
    async () => {
      if (unlike.isLoading || !isLiked || is_preview) return;
      // creates a link between user_id and following in the database
      const { data: like_entity, error } = await supabaseClient
        .from<T>(`${entity_type}s_likes`)
        .delete()
        .match(q_params as any);
      if (error) throw error;
      return like_entity;
    },
    {
      onMutate: async () => {
        const keys = keyFactory.isLiked(entity!.id);
        const entityKey = keyFactory.get(entity!.id);
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(keys);
        await queryClient.cancelQueries(entityKey);
        // Snapshot the previous value
        const previousLiked = queryClient.getQueryData(keys);
        const previousEntity = queryClient.getQueryData<T>(entityKey);
        // optimistiically update the value
        queryClient.setQueryData(keys, false);
        if (previousEntity) {
          queryClient.setQueryData(entityKey, {
            ...previousEntity,
            n_likes: previousEntity.n_likes - 1,
          });
        }
        return { previousLiked, likedUpdates: false };
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(keyFactory.isLiked(entity!.id));
      },
    }
  );

  return {
    isLiked,
    like,
    unlike,
  };
}
