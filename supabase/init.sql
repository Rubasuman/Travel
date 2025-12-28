-- supabase/init.sql
-- Run this in Supabase SQL editor to create core tables, seed a test user and destination,
-- and (optionally) add example RLS policies for trips and itineraries.

-- 1) Users
CREATE TABLE IF NOT EXISTS public.users (
  id serial PRIMARY KEY,
  uid text NOT NULL UNIQUE,
  username text NOT NULL,
  email text NOT NULL UNIQUE,
  photo_url text,
  display_name text
);

-- 2) Destinations
CREATE TABLE IF NOT EXISTS public.destinations (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  country text NOT NULL,
  city text,
  description text,
  image_url text
);

-- 3) Trips
CREATE TABLE IF NOT EXISTS public.trips (
  id serial PRIMARY KEY,
  user_id integer NOT NULL,
  destination_id integer NOT NULL,
  title text NOT NULL,
  start_date timestamptz NOT NULL DEFAULT now(),
  end_date timestamptz NOT NULL DEFAULT now(),
  description text,
  image_url text,
  activities integer DEFAULT 0,
  is_favorite boolean DEFAULT false,
  CONSTRAINT fk_trips_user FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE,
  CONSTRAINT fk_trips_destination FOREIGN KEY (destination_id) REFERENCES public.destinations (id) ON DELETE SET NULL
);

-- 4) Itineraries
CREATE TABLE IF NOT EXISTS public.itineraries (
  id serial PRIMARY KEY,
  trip_id integer NOT NULL,
  day integer NOT NULL,
  date timestamptz NOT NULL DEFAULT now(),
  activities jsonb NOT NULL,
  notes text,
  CONSTRAINT fk_itineraries_trip FOREIGN KEY (trip_id) REFERENCES public.trips (id) ON DELETE CASCADE
);

-- 5) Photos
CREATE TABLE IF NOT EXISTS public.photos (
  id serial PRIMARY KEY,
  user_id integer NOT NULL,
  trip_id integer,
  image_url text NOT NULL,
  caption text,
  uploaded_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_photos_user FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE,
  CONSTRAINT fk_photos_trip FOREIGN KEY (trip_id) REFERENCES public.trips (id) ON DELETE SET NULL
);

-- 6) Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id serial PRIMARY KEY,
  user_id integer NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE
);

-- 7) Hotels
CREATE TABLE IF NOT EXISTS public.hotels (
  id serial PRIMARY KEY,
  destination_id integer NOT NULL,
  name text NOT NULL,
  address text,
  rating numeric(3,1),
  price_per_night numeric(10,2),
  phone text,
  website text,
  CONSTRAINT fk_hotels_destination FOREIGN KEY (destination_id) REFERENCES public.destinations (id) ON DELETE CASCADE
);

-- 8) Places
CREATE TABLE IF NOT EXISTS public.places (
  id serial PRIMARY KEY,
  destination_id integer NOT NULL,
  name text NOT NULL,
  category text,
  description text,
  latitude numeric(10,8),
  longitude numeric(11,8),
  CONSTRAINT fk_places_destination FOREIGN KEY (destination_id) REFERENCES public.destinations (id) ON DELETE CASCADE
);

-- 9) Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id serial PRIMARY KEY,
  user_id integer NOT NULL,
  hotel_id integer,
  place_id integer,
  rating numeric(3,1),
  comment text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE,
  CONSTRAINT fk_reviews_hotel FOREIGN KEY (hotel_id) REFERENCES public.hotels (id) ON DELETE CASCADE,
  CONSTRAINT fk_reviews_place FOREIGN KEY (place_id) REFERENCES public.places (id) ON DELETE CASCADE
);

-- 10) Budgets
CREATE TABLE IF NOT EXISTS public.budgets (
  id serial PRIMARY KEY,
  trip_id integer NOT NULL UNIQUE,
  total_amount numeric(15,2),
  currency text DEFAULT 'USD',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_budgets_trip FOREIGN KEY (trip_id) REFERENCES public.trips (id) ON DELETE CASCADE
);

-- 11) Expenses
CREATE TABLE IF NOT EXISTS public.expenses (
  id serial PRIMARY KEY,
  budget_id integer NOT NULL,
  category text,
  amount numeric(15,2),
  description text,
  date timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_expenses_budget FOREIGN KEY (budget_id) REFERENCES public.budgets (id) ON DELETE CASCADE
);

-- 12) Currency Rates
CREATE TABLE IF NOT EXISTS public.currency_rates (
  id serial PRIMARY KEY,
  base_currency text NOT NULL,
  target_currency text NOT NULL,
  rate numeric(20,8) NOT NULL,
  last_updated timestamptz NOT NULL DEFAULT now(),
  UNIQUE(base_currency, target_currency)
);

-- Optional: Indexes for common lookups
CREATE INDEX IF NOT EXISTS idx_trips_user_id ON public.trips (user_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_trip_id ON public.itineraries (trip_id);
CREATE INDEX IF NOT EXISTS idx_photos_user_id ON public.photos (user_id);
CREATE INDEX IF NOT EXISTS idx_photos_trip_id ON public.photos (trip_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications (user_id);
CREATE INDEX IF NOT EXISTS idx_hotels_destination_id ON public.hotels (destination_id);
CREATE INDEX IF NOT EXISTS idx_places_destination_id ON public.places (destination_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews (user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_hotel_id ON public.reviews (hotel_id);
CREATE INDEX IF NOT EXISTS idx_reviews_place_id ON public.reviews (place_id);
CREATE INDEX IF NOT EXISTS idx_budgets_trip_id ON public.budgets (trip_id);
CREATE INDEX IF NOT EXISTS idx_expenses_budget_id ON public.expenses (budget_id);

-- === Seed data (run after the CREATE TABLE statements) ===
-- Insert a test user. Replace uid/email as needed.
INSERT INTO public.users (uid, username, email, display_name)
VALUES ('test-uid-1', 'testuser', 'test@example.com', 'Test User')
ON CONFLICT (uid) DO NOTHING
RETURNING id;

-- Insert a test destination
-- Option A: Upsert by unique name (requires destinations.name to be UNIQUE)
INSERT INTO public.destinations (name, country, city, description)
VALUES ('Testville', 'Testland', 'Test City', 'Seeded destination')
ON CONFLICT (name) DO NOTHING
RETURNING id;

-- Option B (fallback): If you don't want to add a UNIQUE constraint, run this instead
-- INSERT INTO public.destinations (name, country, city, description)
-- SELECT 'Testville', 'Testland', 'Test City', 'Seeded destination'
-- WHERE NOT EXISTS (SELECT 1 FROM public.destinations WHERE name = 'Testville');

-- Example: to insert a trip referencing the seeded user+destination, run separately after noting the returned ids:
-- INSERT INTO public.trips (user_id, destination_id, title, start_date, end_date, description)
-- VALUES (<USER_ID>, <DEST_ID>, 'Seeded Test Trip', now(), now() + interval '3 days', 'Seeded from SQL');

-- === Row Level Security examples (recommended for production) ===
-- NOTE: Run these policies only after you understand auth and testing. Service role key bypasses RLS.

-- Enable RLS for trips
-- ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Policy: allow authenticated users to SELECT their trips
-- CREATE POLICY "Trips: select own" ON public.trips
--   FOR SELECT
--   USING ( user_id = (SELECT id FROM public.users WHERE uid = auth.uid()) );

-- Policy: allow authenticated users to INSERT trips where user_id matches auth
-- CREATE POLICY "Trips: insert own" ON public.trips
--   FOR INSERT
--   WITH CHECK ( user_id = (SELECT id FROM public.users WHERE uid = auth.uid()) );

-- Policy: allow authenticated users to UPDATE their own trips
-- CREATE POLICY "Trips: update own" ON public.trips
--   FOR UPDATE
--   USING ( user_id = (SELECT id FROM public.users WHERE uid = auth.uid()) )
--   WITH CHECK ( user_id = (SELECT id FROM public.users WHERE uid = auth.uid()) );

-- Itineraries RLS examples
-- ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Itineraries: insert if trip belongs to user" ON public.itineraries
--   FOR INSERT
--   WITH CHECK (
--     (SELECT user_id FROM public.trips WHERE id = NEW.trip_id) = (SELECT id FROM public.users WHERE uid = auth.uid())
--   );
-- CREATE POLICY "Itineraries: select if trip belongs to user" ON public.itineraries
--   FOR SELECT
--   USING (
--     (SELECT user_id FROM public.trips WHERE id = public.itineraries.trip_id) = (SELECT id FROM public.users WHERE uid = auth.uid())
--   );

-- End of file
