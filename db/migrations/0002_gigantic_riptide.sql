CREATE TABLE IF NOT EXISTS "directory" (
	"id" varchar(30) PRIMARY KEY DEFAULT lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0') NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"deletedAt" timestamp (6) with time zone,
	"name" text NOT NULL,
	"parentId" varchar(30) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "file" (
	"id" varchar(30) PRIMARY KEY DEFAULT lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0') NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"deletedAt" timestamp (6) with time zone,
	"name" text NOT NULL,
	"directoryId" varchar(30) NOT NULL,
	"size" text NOT NULL,
	"mimeType" text NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "featureFlag" ALTER COLUMN "id" SET DEFAULT lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0');--> statement-breakpoint
ALTER TABLE "featureFlagAudit" ALTER COLUMN "id" SET DEFAULT lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0');--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "id" SET DEFAULT lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0');--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0');--> statement-breakpoint
ALTER TABLE "userSession" ALTER COLUMN "id" SET DEFAULT lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
                  || lpad(to_hex((random()*(2^32))::bigint), 8, '0');--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "directory" ADD CONSTRAINT "directory_parentId_directory_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."directory"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file" ADD CONSTRAINT "file_directoryId_directory_id_fk" FOREIGN KEY ("directoryId") REFERENCES "public"."directory"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
