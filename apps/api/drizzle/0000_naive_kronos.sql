CREATE TYPE "public"."privacy_level" AS ENUM('public', 'private', 'anonymous');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'moderator', 'admin');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firebase_uid" varchar(255),
	"email" varchar(255) NOT NULL,
	"display_name" varchar(255) NOT NULL,
	"photo_url" text,
	"bio" text,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"privacy_level" "privacy_level" DEFAULT 'public' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"last_seen_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_firebase_uid_unique" UNIQUE("firebase_uid"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
