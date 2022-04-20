-- nhớ tạo database trc nha :((
-- Database: book_store_manager

-- DROP DATABASE IF EXISTS book_store_manager;

-- CREATE DATABASE book_store_manager
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'Vietnamese_Vietnam.1252'
--     LC_CTYPE = 'Vietnamese_Vietnam.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;


CREATE TABLE "account" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "first_name" varchar,
  "last_name" varchar,
  "gender" varchar,
  "phone_number" varchar,
  "address" varchar,
  "avatar" varchar,
  "created_at" timestamp DEFAULT (now()),
  "uid" varchar,
  "role" varchar DEFAULT 'staff',
  "status" varchar DEFAULT 'active'
);

CREATE TABLE "book" (
  "id" SERIAL PRIMARY KEY,
  "isbn" varchar UNIQUE NOT NULL,
  "title" varchar,
  "num_page" int,
  "publication_date" timestamp,
  "publisher_id" int
);

CREATE TABLE "publisher" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "book_image" (
  "id" SERIAL PRIMARY KEY,
  "book_id" int,
  "src" varchar
);

CREATE TABLE "book_author" (
  "book_id" int,
  "author_id" int,
  PRIMARY KEY ("book_id", "author_id")
);

CREATE TABLE "author" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "book_category" (
  "book_id" int,
  "category_id" int,
  PRIMARY KEY ("book_id", "category_id")
);

CREATE TABLE "import_receipt_detail" (
  "report_receipt_id" int,
  "book_id" int,
  "quantity" int,
  "price" float,
  PRIMARY KEY ("report_receipt_id", "book_id")
);

CREATE TABLE "import_receipt" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp DEFAULT (now()),
  "price" float
);

CREATE TABLE "sale_receipt_detail" (
  "book_id" int,
  "sale_receipt_id" int,
  "quantity" int,
  "price" float,
  PRIMARY KEY ("book_id", "sale_receipt_id")
);

CREATE TABLE "sale_receipt" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp DEFAULT (now()),
  "customer_id" int,
  "price" float
);

CREATE TABLE "customer" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "address" varchar,
  "phone" varchar,
  "email" varchar,
  "dept" float DEFAULT 0
);

CREATE TABLE "bill" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp DEFAULT (now()),
  "customer_id" int,
  "money_received" float
);

CREATE TABLE "book_stock" (
  "id" SERIAL PRIMARY KEY,
  "book_id" int UNIQUE,
  "quantity" int,
  "price" float,
  "status" varchar DEFAULT 'active'
);

CREATE TABLE "regulation" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "value" int,
  "is_used" boolean
);

ALTER TABLE "book" ADD FOREIGN KEY ("publisher_id") REFERENCES "publisher" ("id");

ALTER TABLE "book_image" ADD FOREIGN KEY ("book_id") REFERENCES "book" ("id");

ALTER TABLE "book_author" ADD FOREIGN KEY ("book_id") REFERENCES "book" ("id");

ALTER TABLE "book_author" ADD FOREIGN KEY ("author_id") REFERENCES "author" ("id");

ALTER TABLE "book_category" ADD FOREIGN KEY ("book_id") REFERENCES "book" ("id");

ALTER TABLE "book_category" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "import_receipt_detail" ADD FOREIGN KEY ("book_id") REFERENCES "book" ("id");

ALTER TABLE "import_receipt_detail" ADD FOREIGN KEY ("report_receipt_id") REFERENCES "import_receipt" ("id");

ALTER TABLE "sale_receipt" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("id");

ALTER TABLE "sale_receipt_detail" ADD FOREIGN KEY ("book_id") REFERENCES "book" ("id");

ALTER TABLE "sale_receipt_detail" ADD FOREIGN KEY ("sale_receipt_id") REFERENCES "sale_receipt" ("id");

ALTER TABLE "bill" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("id");

ALTER TABLE "book_stock" ADD FOREIGN KEY ("book_id") REFERENCES "book" ("id");
