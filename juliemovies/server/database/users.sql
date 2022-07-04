CREATE TABLE users
(
    id       SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    salt     VARCHAR NOT NULL
);

CREATE TABLE user_movies
(
    id          SERIAL PRIMARY KEY,
    user_id     SERIAL  NOT NULL,
    movie_id    INT     NOT NULL,
    movie_title VARCHAR NOT NULL,
    UNIQUE (user_id, movie_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);
