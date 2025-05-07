import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { sql } from 'drizzle-orm';

import * as schema from './schema';
import { logger, env } from '../utils';

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000,
});

const db = drizzle(pool, { schema });

const connectDb = async () => {
  try {
    await pool.query('SELECT 1');
    logger.info('✅ Database connection successful.');

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
  } catch (error) {
    logger.error('❌ DB setup failed:', error);
    process.exit(1);
  }
};

export { connectDb, db, pool };
