DROP TABLE IF EXISTS clubs;
CREATE TABLE clubs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country TEXT NOT NULL,
  'name' TEXT NOT NULL,
  short_name TEXT NOT NULL,
  tla TEXT NOT NULL,
  crest_url TEXT,
  'address' TEXT NOT NULL,
  phone TEXT NOT NULL,
  website TEXT NOT NULL,
  email TEXT NOT NULL,
  founded INTEGER NOT NULL,
  club_colors TEXT NOT NULL,
  venue TEXT NOT NULL,
  created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,
  updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL
);