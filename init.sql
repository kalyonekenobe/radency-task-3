CREATE DATABASE notes_app_db;
GRANT ALL PRIVILEGES ON DATABASE notes_app_db TO postgres;

\c notes_app_db

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE categories (
    id          UUID            NOT NULL    DEFAULT uuid_generate_v4(),
    "name"      VARCHAR(255)    NOT NULL    UNIQUE,

    CONSTRAINT category_id PRIMARY KEY (id)
);

CREATE TABLE notes (
    id              UUID            NOT NULL    DEFAULT uuid_generate_v4(),
    "name"          VARCHAR(255)    NOT NULL,
    content         TEXT            NOT NULL,
    category_id     UUID            NOT NULL,
    isArchived      BOOLEAN         NOT NULL    DEFAULT false,
    createdAt       DATE            NOT NULL    DEFAULT CURRENT_DATE,

    CONSTRAINT note_id PRIMARY KEY (id),
    CONSTRAINT note_category_id FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE NO ACTION ON UPDATE CASCADE
);

INSERT INTO categories ("name") VALUES ('Task');
INSERT INTO categories ("name") VALUES ('Random Thought');
INSERT INTO categories ("name") VALUES ('Idea');
INSERT INTO categories ("name") VALUES ('Quote');

INSERT INTO notes ("name", content, category_id) SELECT 'Shopping list', 'Tomatoes, bread', id FROM categories WHERE "name"='Task';
INSERT INTO notes ("name", content, category_id) SELECT 'The theory of evolution', 'The evolution is the change in heritable characteristics of biological populations over successive generations.', id FROM categories WHERE "name"='Random Thought';
INSERT INTO notes ("name", content, category_id) SELECT 'New Feature', 'Implemented new feature on the 3/5/2021, I will send it for test on 5/5/2021', id FROM categories WHERE "name"='Idea';
INSERT INTO notes ("name", content, category_id) SELECT 'William Gaddis', 'Power doesn’t corrupt people, people corrupt power.', id FROM categories WHERE "name"='Quote';
INSERT INTO notes ("name", content, category_id) SELECT 'Books', 'The Lean Startup', id FROM categories WHERE "name"='Task';
INSERT INTO notes ("name", content, category_id) SELECT 'Health', 'I’m gonna have a dentist appointment on 08/03/2023', id FROM categories WHERE "name"='Idea';
INSERT INTO notes ("name", content, category_id) SELECT 'Travelling', 'I would like to move to Norway', id FROM categories WHERE "name"='Random Thought';