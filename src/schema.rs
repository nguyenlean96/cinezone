// @generated automatically by Diesel CLI.

diesel::table! {
    genres (id) {
        id -> Nullable<Integer>,
        name -> Text,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    movie_genres (movie_id, genre_id) {
        movie_id -> Integer,
        genre_id -> Integer,
    }
}

diesel::table! {
    movies (id) {
        id -> Integer,
        title -> Text,
        title_english -> Nullable<Text>,
        title_long -> Nullable<Text>,
        year -> Nullable<Integer>,
        imdb_code -> Nullable<Text>,
        lang -> Nullable<Text>,
        summary -> Nullable<Text>,
        synopsis -> Nullable<Text>,
        description_full -> Nullable<Text>,
        mpa_rating -> Nullable<Text>,
        rating -> Nullable<Float>,
        runtime -> Nullable<Integer>,
        slug -> Nullable<Text>,
        state -> Nullable<Text>,
        large_cover_image -> Nullable<Text>,
        medium_cover_image -> Nullable<Text>,
        background_image -> Nullable<Text>,
        background_image_original -> Nullable<Text>,
        url -> Nullable<Text>,
        yt_trailer_code -> Nullable<Text>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
        date_uploaded -> Nullable<Timestamp>,
        date_uploaded_unix -> Nullable<Integer>,
    }
}

diesel::joinable!(movie_genres -> genres (genre_id));
diesel::joinable!(movie_genres -> movies (movie_id));

diesel::allow_tables_to_appear_in_same_query!(
    genres,
    movie_genres,
    movies,
);
