DROP TABLE "featureFlag";--> statement-breakpoint
DROP TABLE "featureFlagAudit";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "passwordHash" text;