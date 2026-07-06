-- AlterTable
ALTER TABLE "Event" ADD COLUMN "bannerUrl" TEXT;
ALTER TABLE "Event" ADD COLUMN "thumbnailUrl" TEXT;

UPDATE "Event"
SET "thumbnailUrl" = 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80'
WHERE "thumbnailUrl" IS NULL;

ALTER TABLE "Event" ALTER COLUMN "thumbnailUrl" SET NOT NULL;
