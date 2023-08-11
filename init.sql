CREATE DATABASE notes_app_db;
GRANT ALL PRIVILEGES ON DATABASE notes_app_db TO postgres;

\c notes_app_db

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "Categories" (
    "id"        UUID            NOT NULL    DEFAULT uuid_generate_v4(),
    "name"      VARCHAR(255)    NOT NULL    UNIQUE,

    CONSTRAINT "categoryId" PRIMARY KEY (id)
);

CREATE TABLE "Notes" (
    "id"              UUID            NOT NULL    DEFAULT uuid_generate_v4(),
    "name"            VARCHAR(255)    NOT NULL,
    "content"         TEXT            NOT NULL,
    "categoryId"      UUID            NOT NULL,
    "dates"           VARCHAR(255)[]  NOT NULL    DEFAULT ARRAY[]::VARCHAR(255)[],
    "isArchived"      BOOLEAN         NOT NULL    DEFAULT false,
    "createdAt"       DATE            NOT NULL    DEFAULT CURRENT_DATE,

    CONSTRAINT "noteId" PRIMARY KEY ("id"),
    CONSTRAINT "noteCategoryId" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);

-- INSERT INTO "Categories" ("name") VALUES ('Task');
-- INSERT INTO "Categories" ("name") VALUES ('Random Thought');
-- INSERT INTO "Categories" ("name") VALUES ('Idea');
-- INSERT INTO "Categories" ("name") VALUES ('Quote');
--
-- INSERT INTO "Notes" ("name", content, categoryId) SELECT 'Shopping list', 'Tomatoes, bread', id FROM "Categories" WHERE "name"='Task';
-- INSERT INTO "Notes" ("name", content, categoryId) SELECT 'The theory of evolution', 'The evolution is the change in heritable characteristics of biological populations over successive generations.', id FROM "Categories" WHERE "name"='Random Thought';
-- INSERT INTO "Notes" ("name", content, categoryId) SELECT 'New Feature', 'Implemented new feature on the 3/5/2021, I will send it for test on 5/5/2021', id FROM "Categories" WHERE "name"='Idea';
-- INSERT INTO "Notes" ("name", content, categoryId) SELECT 'William Gaddis', 'Power doesn’t corrupt people, people corrupt power.', id FROM "Categories" WHERE "name"='Quote';
-- INSERT INTO "Notes" ("name", content, categoryId) SELECT 'Books', 'The Lean Startup', id FROM "Categories" WHERE "name"='Task';
-- INSERT INTO "Notes" ("name", content, categoryId) SELECT 'Health', 'I’m gonna have a dentist appointment on 08/03/2023', id FROM "Categories" WHERE "name"='Idea';
-- INSERT INTO "Notes" ("name", content, categoryId) SELECT 'Travelling', 'I would like to move to Norway', id FROM "Categories" WHERE "name"='Random Thought';