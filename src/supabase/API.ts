/* eslint-disable prettier/prettier */
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
      builds: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string | null;
          papercraft_id: string;
          pictures: Json[];
          description: string | null;
          verified: boolean;
          xlink: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string | null;
          papercraft_id: string;
          pictures: Json[];
          description?: string | null;
          verified?: boolean;
          xlink?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string | null;
          papercraft_id?: string;
          pictures?: Json[];
          description?: string | null;
          verified?: boolean;
          xlink?: string | null;
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
    };
    Views: {
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
    };
    Functions: {
      generate_user: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      get_is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      gtrgm_compress: {
        Args: { '': unknown };
        Returns: unknown;
      };
      gtrgm_decompress: {
        Args: { '': unknown };
        Returns: unknown;
      };
      gtrgm_in: {
        Args: { '': unknown };
        Returns: unknown;
      };
      gtrgm_options: {
        Args: { '': unknown };
        Returns: undefined;
      };
      gtrgm_out: {
        Args: { '': unknown };
        Returns: unknown;
      };
      list_tags: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: number;
          name: string;
          code: string;
          n_papercrafts: number;
        }[];
      };
      profile:
        | {
            Args: { '': unknown };
            Returns: unknown;
          }
        | {
            Args: { '': unknown };
            Returns: unknown;
          };
      profiles: {
        Args: { '': unknown };
        Returns: unknown;
      };
      random_string: {
        Args: { length: number };
        Returns: string;
      };
      search_builds: {
        Args: { build_term: string };
        Returns: unknown;
      };
      search_collectives: {
        Args: { collective_term: string };
        Returns: unknown;
      };
      search_papercrafts: {
        Args: { papercraft_term: string };
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
        Returns: {
          id: number;
          name: string;
          code: string;
          n_papercrafts: number;
        }[];
      };
      search_tags_user: {
        Args: { tag_term: string; p_user_id: string };
        Returns: {
          id: number;
          name: string;
          code: string;
          n_papercrafts: number;
        }[];
      };
      set_limit: {
        Args: { '': number };
        Returns: number;
      };
      show_limit: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      show_trgm: {
        Args: { '': string };
        Returns: string[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
