/*
 * supabase.ts
 * author: evan kirkiles
 * created on Tue Aug 30 2022
 * 2022 the nobot space,
 */

import * as APIt from './API';

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

type Modify<T, R> = Omit<T, keyof R> & R;
type NonNullableFields<T> = { [P in keyof T]: NonNullable<T[P]> };
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
// expands object types one level deep
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

/* -------------------------------------------------------------------------- */
/*                                MAIN GENERICS                               */
/* -------------------------------------------------------------------------- */

// fields generated db-side
type GeneratedFields = 'id' | 'created_at' | 'updated_at';
// required fields on all entities
type RequiredFields = GeneratedFields | 'user_id';
// file fields, which need to support local files sometimes
type FileFields = 'pdo_url' | 'pdf_lineless_url' | 'pdf_lined_url' | 'glb_url';
type ExpansiveFileType = File | string | null;

// helper generic:
//  T: the base entity type
//  S: a view for the entity
//  R: the incorrectly typed fields of the base definitiion
//  V: additional information not retrieved from the DB
//  W: omitted fields
type SupabaseEntityFactory<
  T,
  S = {},
  R = {},
  V = {},
  W extends string | number | symbol = ''
> = {
  entity: Expand<
    Omit<
      Modify<
        Omit<T, RequiredFields> &
          Required<Pick<T, Extract<keyof T, RequiredFields>>> & // make required fields required
          Required<NonNullableFields<Omit<S, keyof T>>> & // add in view fields
          V, // add in any additional fields we want
        R
      >,
      W
    >
  >;
  input: Expand<
    Omit<
      Modify<Omit<T, GeneratedFields | keyof Omit<S, keyof T>>, R> & {
        created_at?: string;
      },
      W
    >
  >;
};

// helper generic for join tables
//  T: the base join table entity type
//  S: additional fields representing the entities being joined
type SupabaseJoinEntityFactory<T, S = {}> = {
  entity: Expand<
    Omit<T, RequiredFields> &
      Required<Pick<T, Extract<keyof T, RequiredFields>>> & // make required fields required
      S
  >; // add in the augmenting fields, allowing created_at to be changed by admins
  input: Expand<Omit<T, GeneratedFields> & { created_at?: string }>;
};

// localizes files in a type, to allow for storing uploaded versions in the model
type SupabaseLocalEntity<T> = Expand<
  Omit<T, FileFields> &
    Pick<Record<FileFields, ExpansiveFileType>, Extract<keyof T, FileFields>>
>;

/* -------------------------------------------------------------------------- */
/*                                   PROFILE                                  */
/* -------------------------------------------------------------------------- */

type ProfileFactory = SupabaseEntityFactory<
  APIt.Database['public']['Tables']['profiles']['Row'],
  APIt.Database['public']['Views']['profiles_view']['Row']
>;
// export type Profile = ProfileFactory['entity'];
export type Profile = ProfileFactory['entity'];
export type ProfileInput =
  APIt.Database['public']['Tables']['profiles']['Update'];

/* --------------------------- profiles followers --------------------------- */

type _ProfilesFollowersAdditionalFields = {
  follower: Profile;
  following: Profile;
};

type ProfilesFollowersFactory = SupabaseJoinEntityFactory<
  APIt.Database['public']['Tables']['profiles_followers']['Row'],
  _ProfilesFollowersAdditionalFields
>;

export type ProfilesFollowers = ProfilesFollowersFactory['entity'];
export type ProfilesFollowersInput =
  APIt.Database['public']['Tables']['profiles_followers']['Insert'];

/* -------------------------------------------------------------------------- */
/*                                 PAPERCRAFTS                                */
/* -------------------------------------------------------------------------- */

// these are falsely added join table fields we have renamed
type _PapercraftOmitFields = 'profiles' | 'profile';

// these are incorrectly typed fields we need to overwrite
type _PapercraftOverwriteFields = {
  pictures: Picture[];
};

// these are additional fields we need to add
type _PapercraftAdditionalFields = {
  user: Profile;
  display_build?: Build;
  collective?: Collective;
  tags: Tag[];
  builds: Build[];
  variants: PapercraftVariant[];
};

type PapercraftFactory = SupabaseEntityFactory<
  APIt.Database['public']['Tables']['papercrafts']['Row'],
  APIt.Database['public']['Views']['papercrafts_view']['Row'],
  _PapercraftOverwriteFields,
  _PapercraftAdditionalFields,
  _PapercraftOmitFields
>;

export type Papercraft = PapercraftFactory['entity'];
export type PapercraftInput =
  APIt.Database['public']['Tables']['papercrafts']['Insert'];
export type PapercraftUpdate =
  APIt.Database['public']['Tables']['papercrafts']['Update'];

/* ---------------------------- papercraft likes ---------------------------- */

type _PapercraftsLikeAdditionalFields = {
  papercraft: Papercraft;
  user: Profile;
};

type PapercraftsLikesFactory = SupabaseJoinEntityFactory<
  APIt.Database['public']['Tables']['papercrafts_likes']['Row'],
  _PapercraftsLikeAdditionalFields
>;

export type PapercraftLike = PapercraftsLikesFactory['entity'];
export type PapercraftLikeInput =
  APIt.Database['public']['Tables']['papercrafts_likes']['Insert'];

/* ----------------------------- papercraft tags ---------------------------- */

type PapercraftsTagsFactory = SupabaseJoinEntityFactory<
  APIt.Database['public']['Tables']['papercrafts_tags']['Row']
>;

export type PapercraftsTags = PapercraftsTagsFactory['entity'];
export type PapercraftsTagsInput =
  APIt.Database['public']['Tables']['papercrafts_tags']['Insert'];

/* --------------------------- papercraft variants -------------------------- */

type PapercraftVariantFactory = SupabaseEntityFactory<
  APIt.Database['public']['Tables']['papercrafts_variants']['Row']
>;

export type PapercraftVariant = PapercraftVariantFactory['entity'];
export type PapercraftVariantInput =
  APIt.Database['public']['Tables']['papercrafts_variants']['Insert'];
export type PapercraftVariantLocal = SupabaseLocalEntity<PapercraftVariant>;

/* -------------------------------------------------------------------------- */
/*                                   BUILDS                                   */
/* -------------------------------------------------------------------------- */

// these are incorrectly typed fields we need to overwrite
type _BuildOverwriteFields = {
  pictures: Picture[];
  collective_titlecode?: string;
  collective_id?: number;
};

// these are additional fields we need to add
type _BuildAdditionalFields = {
  user: Profile;
  papercraft: Papercraft;
  collective?: Collective;
};

type BuildFactory = SupabaseEntityFactory<
  APIt.Database['public']['Tables']['builds']['Row'],
  APIt.Database['public']['Views']['builds_view']['Row'],
  _BuildOverwriteFields,
  _BuildAdditionalFields
>;

export type Build = BuildFactory['entity'];
export type BuildInput = APIt.Database['public']['Tables']['builds']['Insert'];
export type BuildUpdate = APIt.Database['public']['Tables']['builds']['Update'];

/* -------------------------------------------------------------------------- */
/*                                 COLLECTIVES                                */
/* -------------------------------------------------------------------------- */

type CollectiveFactory = SupabaseEntityFactory<
  APIt.Database['public']['Tables']['collectives']['Row'],
  APIt.Database['public']['Views']['collectives_view']['Row']
>;

export type Collective = CollectiveFactory['entity'];
export type CollectiveInput =
  APIt.Database['public']['Tables']['collectives']['Insert'];

/* -------------------------- collectives profiles -------------------------- */

type _CollectivesProfilesAdditionalFields = {
  collective: Collective;
  user: Profile;
};

type CollectivesProfilesFactory = SupabaseJoinEntityFactory<
  APIt.Database['public']['Tables']['collectives_profiles']['Row'],
  _CollectivesProfilesAdditionalFields
>;

export type CollectivesProfiles = CollectivesProfilesFactory['entity'];
export type CollectivesProfilesInput =
  APIt.Database['public']['Tables']['collectives_profiles']['Insert'];

/* -------------------------------------------------------------------------- */
/*                                ANNOUNCEMENTS                               */
/* -------------------------------------------------------------------------- */

type AnnouncementFactory = SupabaseEntityFactory<
  APIt.Database['public']['Tables']['announcements']['Row']
>;

export type Announcement = AnnouncementFactory['entity'];
export type AnnouncementInput = AnnouncementFactory['input'];

/* -------------------------------------------------------------------------- */
/*                                    TAGS                                    */
/* -------------------------------------------------------------------------- */

type TagsFactory = SupabaseEntityFactory<
  APIt.Database['public']['Tables']['tags']['Row'],
  APIt.Database['public']['Views']['tags_view']['Row']
>;

export type Tag = TagsFactory['entity'];
export type TagInput = TagsFactory['input'];

/* -------------------------------------------------------------------------- */
/*                                 PRIMITIVES                                 */
/* -------------------------------------------------------------------------- */

export enum Difficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
  InSaNe = 3,
}

export type Picture = {
  key: string;
  width: number;
  height: number;
};
