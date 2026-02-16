ALTER TABLE "users" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "is_verified";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "last_seen_at";