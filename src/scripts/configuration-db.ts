import { db } from '@/db/client';
import { logger } from '@/utils';
import { sql } from 'drizzle-orm';

const main = async () => {
  logger.info('⚠️  Configuring the types...');

  await db.execute(sql.raw(`CREATE EXTENSION IF NOT EXISTS postgis`));

  // handle type in pg geo
  await db.execute(
    sql.raw(`
  DO $$
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'location'
        AND column_name = 'coordinates'
        AND udt_name != 'geography'
    ) THEN
      ALTER TABLE location
      ALTER COLUMN coordinates TYPE geography(Point, 4326)
      USING ST_GeogFromText(coordinates);
    END IF;
  END;
  $$;
`)
  );
  logger.info('✅ PostGIS and coordinates column configured.');
};
main();
