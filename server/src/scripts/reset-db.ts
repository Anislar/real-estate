import { db, pool } from '../db/client';
import { logger } from '../utils';

async function resetDatabase() {
  logger.info('⚠️  Dropping all tables and custom types...');

  try {
    // Step 1: Drop all custom types (e.g., enums, composite types, etc.)
    await db.execute(`
      DO $$ DECLARE
          r RECORD;
      BEGIN
          -- Drop all custom types (excluding system types)
          FOR r IN (SELECT n.nspname, t.typname
                    FROM pg_catalog.pg_type t
                    JOIN pg_catalog.pg_namespace n ON t.typnamespace = n.oid
                    WHERE n.nspname = current_schema() AND t.typtype = 'e') LOOP
              -- Drop enums
              EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.nspname) || '.' || quote_ident(r.typname) || ' CASCADE';
          END LOOP;
      END $$;
    `);
    // Step 2: Drop all the tables and their dependencies
    await db.execute(`
      DO $$ DECLARE
          r RECORD;
      BEGIN
          -- Drop all tables with CASCADE to remove dependent objects
          FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
              EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
          END LOOP;
      END $$;
    `);

    logger.info('✅  All tables and custom types dropped.');
  } catch (err) {
    logger.error('❌ Error dropping tables or types:', err);
  } finally {
    await pool.end();
  }
}

resetDatabase();
