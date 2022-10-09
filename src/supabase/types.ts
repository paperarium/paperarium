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
type SupabaseEntityFactory<T, S = {}, R = {}, V = {}> = {
  entity: Expand<
    Modify<
      Omit<T, RequiredFields> &
        Required<Pick<T, Extract<keyof T, RequiredFields>>> & // make required fields required
        Required<Omit<S, keyof T>> & // add in view fields
        V, // add in any additional fields we want
      R
    >
  >;
  input: Expand<
    Modify<Omit<T, GeneratedFields | keyof Omit<S, keyof T>>, R> & {
      created_at?: string;
    }
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
  APIt.definitions['profiles'],
  APIt.definitions['profiles_view']
>;
export type Profile = ProfileFactory['entity'];

/* --------------------------- profiles followers --------------------------- */

// additional fields we need to add
type _ProfilesFollowersAdditionalFields = {
  follower: Profile;
  following: Profile;
};

type ProfilesFollowersFactory = SupabaseJoinEntityFactory<
  APIt.definitions['profiles_followers'],
  _ProfilesFollowersAdditionalFields
>;

export type ProfilesFollowers = ProfilesFollowersFactory['entity'];
export type ProfilesFollowersInput = ProfilesFollowersFactory['input'];

/* -------------------------------------------------------------------------- */
/*                                 PAPERCRAFTS                                */
/* -------------------------------------------------------------------------- */

// these are incorrectly typed fields we need to overwrite
type _PapercraftOverwriteFields = {
  pictures: Picture[];
  dimensions_cm?: number[];
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
  APIt.definitions['papercrafts'],
  APIt.definitions['papercrafts_view'],
  _PapercraftOverwriteFields,
  _PapercraftAdditionalFields
>;

export type Papercraft = PapercraftFactory['entity'];
export type PapercraftInput = PapercraftFactory['input'];

/* ---------------------------- papercraft likes ---------------------------- */

type _PapercraftsLikeAdditionalFields = {
  papercraft: Papercraft;
  user: Profile;
};

type PapercraftsLikesFactory = SupabaseJoinEntityFactory<
  APIt.definitions['papercrafts_likes'],
  _PapercraftsLikeAdditionalFields
>;

export type PapercraftLike = PapercraftsLikesFactory['entity'];
export type PapercraftLikeInput = PapercraftsLikesFactory['input'];

/* ----------------------------- papercraft tags ---------------------------- */

type PapercraftsTagsFactory = SupabaseJoinEntityFactory<
  APIt.definitions['papercrafts_tags']
>;

export type PapercraftsTags = PapercraftsTagsFactory['entity'];
export type PapercraftsTagsInput = PapercraftsTagsFactory['input'];

/* --------------------------- papercraft variants -------------------------- */

type PapercraftVariantFactory = SupabaseEntityFactory<
  APIt.definitions['papercrafts_variants']
>;

export type PapercraftVariant = PapercraftVariantFactory['entity'];
export type PapercraftVariantInput = PapercraftVariantFactory['input'];
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
  APIt.definitions['builds'],
  APIt.definitions['builds_view'],
  _BuildOverwriteFields,
  _BuildAdditionalFields
>;

export type Build = BuildFactory['entity'];
export type BuildInput = BuildFactory['input'];

/* -------------------------------------------------------------------------- */
/*                                 COLLECTIVES                                */
/* -------------------------------------------------------------------------- */

type CollectiveFactory = SupabaseEntityFactory<
  APIt.definitions['collectives'],
  APIt.definitions['collectives_view']
>;

export type Collective = CollectiveFactory['entity'];
export type CollectiveInput = CollectiveFactory['input'];

/* -------------------------- collectives profiles -------------------------- */

type _CollectivesProfilesAdditionalFields = {
  collective: Collective;
  user: Profile;
};

type CollectivesProfilesFactory = SupabaseJoinEntityFactory<
  APIt.definitions['collectives_profiles'],
  _CollectivesProfilesAdditionalFields
>;

export type CollectivesProfiles = CollectivesProfilesFactory['entity'];

/* -------------------------------------------------------------------------- */
/*                                ANNOUNCEMENTS                               */
/* -------------------------------------------------------------------------- */

type AnnouncementFactory = SupabaseEntityFactory<
  APIt.definitions['announcements']
>;

export type Announcement = AnnouncementFactory['entity'];
export type AnnouncementInput = AnnouncementFactory['input'];

/* -------------------------------------------------------------------------- */
/*                                    TAGS                                    */
/* -------------------------------------------------------------------------- */

type TagsFactory = SupabaseEntityFactory<
  APIt.definitions['tags'],
  APIt.definitions['tags_view']
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
