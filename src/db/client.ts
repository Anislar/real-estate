import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@/db/schema';
import { logger, env } from '@/utils';

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
  } catch (error) {
    logger.error('❌ DB setup failed:', error);
    process.exit(1);
  }
};

export { connectDb, db, pool };
