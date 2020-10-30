
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "pastures" (
	"pasture_id" serial PRIMARY KEY,
	"pasture_name" varchar(255) NOT NULL UNIQUE,
	"user_id" integer REFERENCES "user"
);

CREATE TABLE "notes" (
	"note_id" serial PRIMARY KEY,
	"note" TEXT NOT NULL,
	"animal_id" integer REFERENCES "animals",
	"date" TIMESTAMP DEFAULT current_timestamp,
	"user_id" integer REFERENCES "user"
);

CREATE TABLE "animals" (
	"animal_id" serial PRIMARY KEY,
	"dam_id" varchar(255),
	"sire_id" varchar(255),
	"tag_number" varchar(255) NOT NULL,
	"gender" varchar(75) NOT NULL,
	"user_id" integer NOT NULL,
	"cull" BOOLEAN NOT NULL DEFAULT 'false',
	"archived" BOOLEAN NOT NULL DEFAULT 'false',
	"date_archived" DATE,
	"birth_date" DATE,
	"disposition" integer,
	"status" varchar(255) NOT NULL DEFAULT 'alive',
	"calving_ease" integer,
	"castrated" BOOLEAN DEFAULT 'false',
	"birthweight" integer,
	"calf" BOOLEAN NOT NULL,
	"close_to_calving" BOOLEAN NOT NULL DEFAULT 'false'
	
);