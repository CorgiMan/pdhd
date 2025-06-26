ALTER TABLE "directory" RENAME TO "fileDirectory";--> statement-breakpoint
ALTER TABLE "file" RENAME COLUMN "directoryId" TO "fileDirectoryId";--> statement-breakpoint
ALTER TABLE "fileDirectory" DROP CONSTRAINT "directory_parentId_directory_id_fk";
--> statement-breakpoint
ALTER TABLE "file" DROP CONSTRAINT "file_directoryId_directory_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fileDirectory" ADD CONSTRAINT "fileDirectory_parentId_fileDirectory_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."fileDirectory"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file" ADD CONSTRAINT "file_fileDirectoryId_fileDirectory_id_fk" FOREIGN KEY ("fileDirectoryId") REFERENCES "public"."fileDirectory"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
