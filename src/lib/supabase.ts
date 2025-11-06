import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users_profile: {
        Row: {
          id: string;
          username: string;
          avatar_url: string | null;
          created_at: string;
          telegram_id: string | null;
          status: string;
          is_expert: boolean;
        };
        Insert: {
          id: string;
          username: string;
          avatar_url?: string | null;
          created_at?: string;
          telegram_id?: string | null;
          status?: string;
          is_expert?: boolean;
        };
        Update: {
          id?: string;
          username?: string;
          avatar_url?: string | null;
          created_at?: string;
          telegram_id?: string | null;
          status?: string;
          is_expert?: boolean;
        };
      };
      scam_cases: {
        Row: {
          id: string;
          case_number: number;
          title: string;
          description: string;
          category: string;
          damage_amount: number;
          currency: string;
          perpetrator_nick: string;
          victim_nick: string;
          evidence_urls: string[];
          status: string;
          author_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category?: string;
          damage_amount?: number;
          currency?: string;
          perpetrator_nick: string;
          victim_nick: string;
          evidence_urls?: string[];
          status?: string;
          author_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          category?: string;
          damage_amount?: number;
          currency?: string;
          perpetrator_nick?: string;
          victim_nick?: string;
          evidence_urls?: string[];
          status?: string;
          updated_at?: string;
        };
      };
    };
  };
};
