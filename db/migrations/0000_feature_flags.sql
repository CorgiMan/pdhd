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

-- TRANSLATIONS
CREATE TABLE IF NOT EXISTS "translation" (
	"id" varchar(30) PRIMARY KEY DEFAULT lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
               || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
               || lpad(to_hex((random()*(2^32))::bigint), 8, '0') NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"deletedAt" timestamp (6) with time zone,
    "lang" text NOT NULL,
	"key" text NOT NULL,
	"formatString" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "translationAudit" (
	"id" varchar(30) PRIMARY KEY DEFAULT lpad(to_hex((extract(epoch from now())*1e3)::bigint),12,'0') || '--'
               || lpad(to_hex((random()*(2^32))::bigint), 8, '0')
               || lpad(to_hex((random()*(2^32))::bigint), 8, '0') NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now() NOT NULL,
    "lang" text NOT NULL,
	"oldKey" text,
    "newKey" text,
	"oldFormatString" text,
	"newFormatString" text
);
--> statement-breakpoint
CREATE OR REPLACE FUNCTION log_translation_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO "translationAudit" ("lang", "oldKey", "newKey", "oldFormatString", "newFormatString")
    VALUES (
        COALESCE(NEW.lang, OLD.lang),
        OLD.key,
        NEW.key,
        OLD."formatString",
        NEW."formatString"
    );
    PERFORM pg_notify('translation_changes', json_build_object(
        'lang', COALESCE(NEW.lang, OLD.lang),
        'oldKey', OLD.key,
        'newKey', NEW.key,
        'oldFormatString', OLD."formatString",
        'newFormatString', NEW."formatString",
        'operation', TG_OP
    )::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
CREATE OR REPLACE TRIGGER translation_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON "translation"
FOR EACH ROW
EXECUTE FUNCTION log_translation_changes();
