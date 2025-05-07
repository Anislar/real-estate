"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.connectDb = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
const drizzle_orm_1 = require("drizzle-orm");
const schema = __importStar(require("./schema"));
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const db = (0, node_postgres_1.drizzle)(pool, { schema });
exports.db = db;
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Test the connection
        yield pool.query('SELECT 1');
        console.log('✅ Database connection successful.');
        // Run migrations
        yield (0, migrator_1.migrate)(db, { migrationsFolder: './drizzle' });
        // Enable PostGIS extension
        yield db.execute(drizzle_orm_1.sql.raw(`CREATE EXTENSION IF NOT EXISTS postgis`));
        // Alter 'coordinates' column to geography(Point, 4326) if not already done
        yield db.execute(drizzle_orm_1.sql.raw(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
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
    `));
        console.log('✅ PostGIS and geography column setup complete.');
    }
    catch (error) {
        console.error('❌ Database connection or migration failed:', error);
        process.exit(1);
    }
});
exports.connectDb = connectDb;
