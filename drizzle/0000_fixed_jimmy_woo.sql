CREATE TABLE "briefs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" text NOT NULL,
	"topics" jsonb DEFAULT '[]' NOT NULL,
	"length" text NOT NULL,
	"frequency" text NOT NULL,
	"tone" text NOT NULL,
	"sources" jsonb DEFAULT '[]' NOT NULL,
	"restricted_sources" jsonb DEFAULT '[]' NOT NULL,
	"target_audience" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
