-- Existing communities are backfilled with the zero address so the migration
-- remains deployable. The application refuses donations until each community
-- receives a real treasury address.
ALTER TABLE "Community"
ADD COLUMN "treasuryAddress" TEXT NOT NULL
DEFAULT '0x0000000000000000000000000000000000000000';

ALTER TABLE "Community"
ALTER COLUMN "treasuryAddress" DROP DEFAULT;
