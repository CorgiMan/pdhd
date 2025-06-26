-- FEATURE FLAGS
CREATE TABLE IF NOT EXISTS "featureFlag" (
	"id" varchar(30) PRIMARY KEY DEFAULT lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
               || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
               || lpad(to_hex((random()*(2^32))::bigint), 8, '0') NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"deletedAt" timestamp (6) with time zone,
	"name" text NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "featureFlagAudit" (
	"id" varchar(30) PRIMARY KEY DEFAULT lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
               || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
               || lpad(to_hex((random()*(2^32))::bigint), 8, '0') NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"featureFlagName" text NOT NULL,
	"oldValue" text,
	"newValue" text
);
--> statement-breakpoint
CREATE OR REPLACE FUNCTION log_feature_flag_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO "featureFlagAudit" ("featureFlagName", "oldValue", "newValue")
    VALUES (
        COALESCE(NEW.name, OLD.name),
        OLD.value,
        NEW.value
    );
    PERFORM pg_notify('feature_flag_changes', json_build_object(
        'name', COALESCE(NEW.name, OLD.name),
        'oldValue', OLD.value,
        'newValue', NEW.value,
        'operation', TG_OP
    )::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
CREATE OR REPLACE TRIGGER feature_flag_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON "featureFlag"
FOR EACH ROW
EXECUTE FUNCTION log_feature_flag_changes();
--> statement-breakpoint
