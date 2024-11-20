-- Sqlite3 Raw SQL
CREATE TABLE movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  title TEXT NOT NULL,
  title_english TEXT,
  title_long TEXT,
  year INTEGER,
  imdb_code TEXT,
  lang TEXT,

  summary TEXT,
  synopsis TEXT,
  description_full TEXT,
  mpa_rating TEXT,
  rating REAL,
  runtime INTEGER,
  slug TEXT,
  state TEXT,


  large_cover_image TEXT,
  medium_cover_image TEXT,
  background_image TEXT,
  background_image_original TEXT,

  url TEXT,
  yt_trailer_code TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_uploaded TIMESTAMP,
  date_uploaded_unix INTEGER
)