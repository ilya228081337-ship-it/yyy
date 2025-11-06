/*
  # Scam Platform Database Schema
  
  ## New Tables
  
  ### users_profile
  - `id` (uuid, primary key, references auth.users)
  - `username` (text, unique)
  - `avatar_url` (text)
  - `created_at` (timestamptz)
  - `telegram_id` (text)
  - `status` (text) - Новичок, Активист, Разоблачитель, Стратег, Гуру разоблачений, Scam
  - `is_expert` (boolean)
  
  ### scam_cases
  - `id` (uuid, primary key)
  - `case_number` (serial, unique)
  - `title` (text)
  - `description` (text)
  - `category` (text)
  - `damage_amount` (numeric)
  - `currency` (text)
  - `perpetrator_nick` (text)
  - `victim_nick` (text)
  - `evidence_urls` (jsonb) - array of image URLs
  - `status` (text) - new, approved, rejected
  - `author_id` (uuid, references users_profile)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### comments
  - `id` (uuid, primary key)
  - `case_id` (uuid, references scam_cases)
  - `user_id` (uuid, references users_profile)
  - `content` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### reactions
  - `id` (uuid, primary key)
  - `case_id` (uuid, references scam_cases)
  - `user_id` (uuid, references users_profile)
  - `reaction_type` (text) - thumbs_up, warning, cross
  - `created_at` (timestamptz)
  
  ### reports
  - `id` (uuid, primary key)
  - `target_type` (text) - comment, profile, case
  - `target_id` (uuid)
  - `reporter_id` (uuid, references users_profile)
  - `reason` (text)
  - `status` (text) - pending, reviewed, resolved
  - `created_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users
*/

-- Create users_profile table
CREATE TABLE IF NOT EXISTS users_profile (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  telegram_id text,
  status text DEFAULT 'Новичок',
  is_expert boolean DEFAULT false
);

ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON users_profile FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users_profile FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users_profile FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create scam_cases table
CREATE TABLE IF NOT EXISTS scam_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number serial UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text DEFAULT 'Финансовый скам',
  damage_amount numeric DEFAULT 0,
  currency text DEFAULT 'USD',
  perpetrator_nick text NOT NULL,
  victim_nick text NOT NULL,
  evidence_urls jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'approved',
  author_id uuid REFERENCES users_profile(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE scam_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved cases"
  ON scam_cases FOR SELECT
  TO authenticated
  USING (status = 'approved');

CREATE POLICY "Users can insert own cases"
  ON scam_cases FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own cases"
  ON scam_cases FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES scam_cases(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users_profile(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create reactions table
CREATE TABLE IF NOT EXISTS reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES scam_cases(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users_profile(id) ON DELETE CASCADE NOT NULL,
  reaction_type text NOT NULL CHECK (reaction_type IN ('thumbs_up', 'warning', 'cross')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(case_id, user_id)
);

ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reactions"
  ON reactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own reactions"
  ON reactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reactions"
  ON reactions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  target_type text NOT NULL CHECK (target_type IN ('comment', 'profile', 'case')),
  target_id uuid NOT NULL,
  reporter_id uuid REFERENCES users_profile(id) ON DELETE CASCADE NOT NULL,
  reason text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view own reports"
  ON reports FOR SELECT
  TO authenticated
  USING (auth.uid() = reporter_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_scam_cases_created_at ON scam_cases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scam_cases_author ON scam_cases(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_case ON comments(case_id);
CREATE INDEX IF NOT EXISTS idx_reactions_case ON reactions(case_id);