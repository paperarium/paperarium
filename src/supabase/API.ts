export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      tags: {
        Row: {
          id: number;
          name: string;
          code: string;
        };
        Insert: {
          id?: number;
          name: string;
          code: string;
        };
        Update: {
          id?: number;
          name?: string;
          code?: string;
        };
      };
      papercrafts_tags: {
        Row: {
          id: number;
          papercraft_id: string;
          tag_id: number;
        };
        Insert: {
          id?: number;
          papercraft_id: string;
          tag_id: number;
        };
        Update: {
          id?: number;
          papercraft_id?: string;
          tag_id?: number;
        };
      };
      admins: {
        Row: {
          id: string;
        };
        Insert: {
          id: string;
        };
        Update: {
          id?: string;
        };
      };
      papercrafts_likes: {
        Row: {
          id: number;
          created_at: string | null;
          user_id: string;
          papercraft_id: string;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          user_id: string;
          papercraft_id: string;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          user_id?: string;
          papercraft_id?: string;
        };
      };
      profiles_followers: {
        Row: {
          id: number;
          created_at: string;
          user_id: string;
          following_id: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          user_id: string;
          following_id: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          user_id?: string;
          following_id?: string;
        };
      };
      papercrafts: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string;
          title: string;
          description: string | null;
          pictures: Json[];
          difficulty: number;
          dimensions_cm: number[] | null;
          verified: boolean;
          pdo_url: string | null;
          pdf_lineless_url: string | null;
          pdf_lined_url: string | null;
          glb_url: string | null;
          xlink: string | null;
          build_id: string | null;
          collective_id: number | null;
          profile: unknown;
          profiles: unknown;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          title: string;
          description?: string | null;
          pictures: Json[];
          difficulty: number;
          dimensions_cm?: number[] | null;
          verified?: boolean;
          pdo_url?: string | null;
          pdf_lineless_url?: string | null;
          pdf_lined_url?: string | null;
          glb_url?: string | null;
          xlink?: string | null;
          build_id?: string | null;
          collective_id?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          pictures?: Json[];
          difficulty?: number;
          dimensions_cm?: number[] | null;
          verified?: boolean;
          pdo_url?: string | null;
          pdf_lineless_url?: string | null;
          pdf_lined_url?: string | null;
          glb_url?: string | null;
          xlink?: string | null;
          build_id?: string | null;
          collective_id?: number | null;
        };
      };
      collectives: {
        Row: {
          id: number;
          created_at: string;
          title: string;
          description: string | null;
          titlecode: string;
          xlink: string | null;
          avatar_url: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          title: string;
          description?: string | null;
          titlecode: string;
          xlink?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          title?: string;
          description?: string | null;
          titlecode?: string;
          xlink?: string | null;
          avatar_url?: string | null;
        };
      };
      collectives_followers: {
        Row: {
          id: number;
          created_at: string | null;
          collective_id: number;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          collective_id: number;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          collective_id?: number;
          user_id?: string | null;
        };
      };
      announcements: {
        Row: {
          id: number;
          created_at: string;
          active: boolean;
          text: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          active?: boolean;
          text: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          active?: boolean;
          text?: string;
        };
      };
      builds_likes: {
        Row: {
          id: number;
          created_at: string | null;
          user_id: string;
          build_id: string;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          user_id: string;
          build_id: string;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          user_id?: string;
          build_id?: string;
        };
      };
      builds: {
        Row: {
          id: string;
          created_at: string | null;
          updated_at: string | null;
          user_id: string | null;
          papercraft_id: string;
          pictures: Json[];
          description: string | null;
          verified: boolean;
          xlink: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
          papercraft_id: string;
          pictures: Json[];
          description?: string | null;
          verified?: boolean;
          xlink?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
          papercraft_id?: string;
          pictures?: Json[];
          description?: string | null;
          verified?: boolean;
          xlink?: string | null;
        };
      };
      collectives_profiles: {
        Row: {
          profile_id: string;
          collective_id: number;
          id: number;
        };
        Insert: {
          profile_id: string;
          collective_id: number;
          id?: number;
        };
        Update: {
          profile_id?: string;
          collective_id?: number;
          id?: number;
        };
      };
      profiles: {
        Row: {
          id: string;
          updated_at: string;
          username: string;
          website: string | null;
          about: string | null;
          avatar_url: string | null;
          created_at: string;
          name: string | null;
          archived: boolean;
          is_default: boolean;
        };
        Insert: {
          id: string;
          updated_at?: string;
          username: string;
          website?: string | null;
          about?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          name?: string | null;
          archived?: boolean;
          is_default?: boolean;
        };
        Update: {
          id?: string;
          updated_at?: string;
          username?: string;
          website?: string | null;
          about?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          name?: string | null;
          archived?: boolean;
          is_default?: boolean;
        };
      };
      papercrafts_variants: {
        Row: {
          id: number;
          created_at: string;
          title: string;
          papercraft_id: string;
          pdo_url: string | null;
          pdf_lineless_url: string | null;
          pdf_lined_url: string | null;
          user_id: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          title: string;
          papercraft_id: string;
          pdo_url?: string | null;
          pdf_lineless_url?: string | null;
          pdf_lined_url?: string | null;
          user_id: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          title?: string;
          papercraft_id?: string;
          pdo_url?: string | null;
          pdf_lineless_url?: string | null;
          pdf_lined_url?: string | null;
          user_id?: string;
        };
      };
    };
    Views: {
      profiles_view: {
        Row: {
          id: string | null;
          updated_at: string | null;
          username: string | null;
          website: string | null;
          about: string | null;
          avatar_url: string | null;
          created_at: string | null;
          name: string | null;
          archived: boolean | null;
          is_default: boolean | null;
          n_papercrafts: number | null;
          n_builds: number | null;
          n_followers: number | null;
          n_following: number | null;
        };
      };
      tags_view: {
        Row: {
          id: number | null;
          name: string | null;
          code: string | null;
          n_papercrafts: number | null;
        };
      };
      papercrafts_view: {
        Row: {
          id: string | null;
          created_at: string | null;
          updated_at: string | null;
          user_id: string | null;
          title: string | null;
          description: string | null;
          pictures: Json[] | null;
          difficulty: number | null;
          dimensions_cm: number[] | null;
          verified: boolean | null;
          pdo_url: string | null;
          pdf_lineless_url: string | null;
          pdf_lined_url: string | null;
          glb_url: string | null;
          xlink: string | null;
          build_id: string | null;
          collective_id: number | null;
          n_builds: number | null;
          n_likes: number | null;
        };
      };
      builds_view: {
        Row: {
          id: string | null;
          created_at: string | null;
          updated_at: string | null;
          user_id: string | null;
          papercraft_id: string | null;
          pictures: Json[] | null;
          description: string | null;
          verified: boolean | null;
          xlink: string | null;
          n_likes: number | null;
          collective_titlecode: string | null;
          collective_id: number | null;
        };
      };
      collectives_view: {
        Row: {
          id: number | null;
          created_at: string | null;
          title: string | null;
          description: string | null;
          titlecode: string | null;
          xlink: string | null;
          avatar_url: string | null;
          n_papercrafts: number | null;
          n_builds: number | null;
          n_followers: number | null;
          n_members: number | null;
        };
      };
    };
    Functions: {
      random_string: {
        Args: { length: number };
        Returns: string;
      };
      set_limit: {
        Args: Record<string, unknown>;
        Returns: number;
      };
      show_limit: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      show_trgm: {
        Args: Record<string, unknown>;
        Returns: string[];
      };
      similarity: {
        Args: Record<string, unknown>;
        Returns: number;
      };
      similarity_op: {
        Args: Record<string, unknown>;
        Returns: boolean;
      };
      word_similarity: {
        Args: Record<string, unknown>;
        Returns: number;
      };
      word_similarity_op: {
        Args: Record<string, unknown>;
        Returns: boolean;
      };
      word_similarity_commutator_op: {
        Args: Record<string, unknown>;
        Returns: boolean;
      };
      similarity_dist: {
        Args: Record<string, unknown>;
        Returns: number;
      };
      word_similarity_dist_op: {
        Args: Record<string, unknown>;
        Returns: number;
      };
      word_similarity_dist_commutator_op: {
        Args: Record<string, unknown>;
        Returns: number;
      };
      gtrgm_in: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      gtrgm_out: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      gtrgm_consistent: {
        Args: Record<string, unknown>;
        Returns: boolean;
      };
      gtrgm_distance: {
        Args: Record<string, unknown>;
        Returns: number;
      };
      gtrgm_compress: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      gtrgm_decompress: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      gtrgm_penalty: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      gtrgm_picksplit: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      gtrgm_union: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      gtrgm_same: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      gin_extract_value_trgm: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      gin_extract_query_trgm: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      gin_trgm_consistent: {
        Args: Record<string, unknown>;
        Returns: boolean;
      };
      gin_trgm_triconsistent: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      strict_word_similarity: {
        Args: Record<string, unknown>;
        Returns: number;
      };
      strict_word_similarity_op: {
        Args: Record<string, unknown>;
        Returns: boolean;
      };
      strict_word_similarity_commutator_op: {
        Args: Record<string, unknown>;
        Returns: boolean;
      };
      strict_word_similarity_dist_op: {
        Args: Record<string, unknown>;
        Returns: number;
      };
      strict_word_similarity_dist_commutator_op: {
        Args: Record<string, unknown>;
        Returns: number;
      };
      gtrgm_options: {
        Args: Record<string, unknown>;
        Returns: undefined;
      };
      get_is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      generate_user: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      list_tags: {
        Args: Record<PropertyKey, never>;
        Returns: Record<string, unknown>[];
      };
      search_tags_user: {
        Args: { tag_term: string; p_user_id: string };
        Returns: Record<string, unknown>[];
      };
      profile:
        | {
            Args: Record<string, unknown>;
            Returns: unknown;
          }
        | {
            Args: Record<string, unknown>;
            Returns: unknown;
          };
      profiles: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
      search_profiles: {
        Args: { username_term: string };
        Returns: unknown;
      };
      search_tags: {
        Args: { tag_term: string };
        Returns: unknown;
      };
      search_tags_collective: {
        Args: { tag_term: string; p_collective_titlecode: string };
        Returns: Record<string, unknown>[];
      };
      search_papercrafts: {
        Args: { papercraft_term: string };
        Returns: unknown;
      };
      search_collectives: {
        Args: { collective_term: string };
        Returns: unknown;
      };
      search_builds: {
        Args: { build_term: string };
        Returns: unknown;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
