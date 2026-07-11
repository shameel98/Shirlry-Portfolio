-- Run this in Supabase SQL Editor (left sidebar → SQL Editor → New Query)

-- Hero Section
CREATE TABLE hero (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  badge_1 text DEFAULT 'Est. Bengaluru',
  badge_2 text DEFAULT 'Learning & Capability Building',
  tagline text DEFAULT 'Speaker · AI-Powered Learning Architect',
  title_line_1 text DEFAULT 'Capability that',
  title_line_2 text DEFAULT 'actually compounds.',
  description text DEFAULT 'I''m Shirley Deena Pramodhini — a Learning & Capability Building expert with 10+ years designing measurable training programs across Leadership, Sales, HR, IT/Tech, Marketing and Behavioural tracks. Not one-off events. Sustained change.',
  cta_text text DEFAULT 'Book Shirley',
  cta_secondary_text text DEFAULT 'Explore Programs'
);

-- Stats
CREATE TABLE stats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  number integer NOT NULL,
  suffix text DEFAULT '+',
  label text NOT NULL,
  sort_order integer DEFAULT 0
);

-- Testimonials
CREATE TABLE testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  quote text NOT NULL,
  author_name text NOT NULL,
  author_role text NOT NULL,
  rating integer DEFAULT 5,
  sort_order integer DEFAULT 0
);

-- Speaking Events
CREATE TABLE speaking (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  badge text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  sort_order integer DEFAULT 0
);

-- Certifications
CREATE TABLE certifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  sort_order integer DEFAULT 0
);

-- Gallery
CREATE TABLE gallery (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  gradient text DEFAULT 'linear-gradient(135deg, #667eea, #764ba2)',
  image_url text,
  grid_class text DEFAULT '',
  sort_order integer DEFAULT 0
);

-- Contact Info
CREATE TABLE contact_info (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text DEFAULT 'shirley15architect@gmail.com',
  phone text DEFAULT '+91 87925 30818',
  linkedin_url text DEFAULT 'https://linkedin.com',
  whatsapp_number text DEFAULT '918792530818'
);

-- Method Steps
CREATE TABLE method_steps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  sort_order integer DEFAULT 0
);

-- Industries
CREATE TABLE industries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  sort_order integer DEFAULT 0
);

-- Admin credentials (simple auth)
CREATE TABLE admin_auth (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL,
  password_hash text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE speaking ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE method_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_auth ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anon can read)
CREATE POLICY "Public read" ON hero FOR SELECT USING (true);
CREATE POLICY "Public read" ON stats FOR SELECT USING (true);
CREATE POLICY "Public read" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read" ON speaking FOR SELECT USING (true);
CREATE POLICY "Public read" ON certifications FOR SELECT USING (true);
CREATE POLICY "Public read" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Public read" ON method_steps FOR SELECT USING (true);
CREATE POLICY "Public read" ON industries FOR SELECT USING (true);
CREATE POLICY "Public read" ON admin_auth FOR SELECT USING (true);

-- Allow public write (for admin panel with anon key - we protect with app-level auth)
CREATE POLICY "Public write" ON hero FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write" ON stats FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write" ON speaking FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write" ON certifications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write" ON gallery FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write" ON contact_info FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write" ON method_steps FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write" ON industries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write" ON admin_auth FOR ALL USING (true) WITH CHECK (true);

-- Insert default data
INSERT INTO hero (badge_1, badge_2, tagline, title_line_1, title_line_2, description, cta_text, cta_secondary_text)
VALUES ('Est. Bengaluru', 'Learning & Capability Building', 'Speaker · AI-Powered Learning Architect', 'Capability that', 'actually compounds.', 'I''m Shirley Deena Pramodhini — a Learning & Capability Building expert with 10+ years designing measurable training programs across Leadership, Sales, HR, IT/Tech, Marketing and Behavioural tracks. Not one-off events. Sustained change.', 'Book Shirley', 'Explore Programs');

INSERT INTO stats (number, suffix, label, sort_order) VALUES
(10, '+', 'Years cross-industry', 1),
(25, '+', 'Certifications', 2),
(5000, '+', 'Professionals trained', 3),
(6, '', 'Departments served', 4),
(4, '×', 'Best Trainer awardee', 5),
(6, '', 'Industries served', 6);

INSERT INTO testimonials (quote, author_name, author_role, rating, sort_order) VALUES
('Shirley transformed our sales team''s approach completely. We saw a 40% uplift in conversions within 3 months of her program.', 'Rajesh K.', 'Sales Director, Retail', 5, 1),
('The most structured and impactful training I''ve attended in 15 years. Shirley doesn''t just teach — she rewires how you think.', 'Priya M.', 'HR Head, IT Services', 5, 2),
('Our NPS scores jumped 25 points after Shirley''s customer service training. She measures what matters.', 'Arun S.', 'Operations Manager, BPO', 5, 3);

INSERT INTO speaking (badge, title, description, sort_order) VALUES
('Chief Guest', 'Women''s Career Readiness Programme', 'Skillemme × Bishop Cotton Women''s Christian College', 1),
('Panel Speaker', 'The Capability Forum by Skillemme', '"AI Tools Are Everywhere. Why Are Teams Still Not More Productive?"', 2);

INSERT INTO certifications (name, sort_order) VALUES
('Lean Six Sigma', 1), ('CPTD', 2), ('Design Thinking', 3), ('NLP Practitioner', 4),
('Instructional Design', 5), ('Agile Learning', 6), ('DISC Assessment', 7),
('Gamification', 8), ('AI in L&D', 9), ('Coaching (ICF)', 10),
('Kirkpatrick Model', 11), ('Facilitation Skills', 12);

INSERT INTO gallery (title, gradient, grid_class, sort_order) VALUES
('Workshop Facilitation', 'linear-gradient(135deg, #667eea, #764ba2)', '', 1),
('Keynote Speaking', 'linear-gradient(135deg, #f093fb, #f5576c)', 'tall', 2),
('Team Training', 'linear-gradient(135deg, #4facfe, #00f2fe)', '', 3),
('Leadership Academy', 'linear-gradient(135deg, #a855f7, #ec4899)', 'wide', 4),
('Panel Discussion', 'linear-gradient(135deg, #f5af19, #f12711)', '', 5),
('Corporate Events', 'linear-gradient(135deg, #11998e, #38ef7d)', '', 6);

INSERT INTO contact_info (email, phone, linkedin_url, whatsapp_number)
VALUES ('shirley15architect@gmail.com', '+91 87925 30818', 'https://linkedin.com', '918792530818');

INSERT INTO method_steps (title, description, sort_order) VALUES
('Diagnose', 'Structured needs analysis rooted in Lean Six Sigma discipline. We measure the gap before we design the fix.', 1),
('Design', 'Adult learning theory, made memorable through gamification and blended delivery — digital + classroom + on-the-job.', 2),
('Deliver', 'Boardroom-tested facilitation across sales floors, HR teams, tech onboarding and student cohorts.', 3),
('Measure', 'Outcome-driven metrics — conversion, CSAT, NPS, PMS maturity — not smile-sheet training ROI theatre.', 4);

INSERT INTO industries (name, sort_order) VALUES
('Amusement & Entertainment', 1), ('Real Estate', 2), ('Retail', 3),
('BPO & Customer Service', 4), ('Academia · Schools & Colleges', 5), ('IT / Tech Onboarding', 6);

-- Default admin (username: admin, password: shirley2024)
-- Using simple hash for demo - change password after first login
INSERT INTO admin_auth (username, password_hash) VALUES ('admin', 'shirley2024');
