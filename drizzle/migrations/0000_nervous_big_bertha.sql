CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(30) PRIMARY KEY DEFAULT lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
               || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
               || lpad(to_hex((random()*(2^32))::bigint), 8, '0') NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"deletedAt" timestamp (6) with time zone,
	"name" text NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userSession" (
	"id" varchar(30) PRIMARY KEY DEFAULT lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
               || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
               || lpad(to_hex((random()*(2^32))::bigint), 8, '0') NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"deletedAt" timestamp (6) with time zone,
	"userId" varchar(30) NOT NULL,
	"expiresAt" timestamp (6) with time zone NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userSession" ADD CONSTRAINT "userSession_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userSession_userId_index" ON "userSession" USING btree ("userId");