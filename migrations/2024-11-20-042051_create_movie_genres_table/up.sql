-- Sqlite3 Raw SQL
CREATE TABLE movie_genres (
  movie_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  PRIMARY KEY (movie_id, genre_id),
  FOREIGN KEY (movie_id) REFERENCES movies (id),
  FOREIGN KEY (genre_id) REFERENCES genres (id)
)
