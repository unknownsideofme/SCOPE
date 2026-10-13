
import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

class Database {
    static #instance = null;

    #client = null;
    #connecting = null;

    constructor() {
        if (Database.#instance) {
            return Database.#instance;
        }
        Database.#instance = this;
    }

    static getInstance() {
        return Database.#instance ?? new Database();
    }

    async connect() {
        if (this.#client) return this.#client;
        if (this.#connecting) return this.#connecting;

        this.#connecting = (async () => {
            const url = process.env.DATABASE_URL;

            if (!url) {
                throw new Error('DATABASE_URL must be set');
            }

            const pool = new Pool({
                connectionString: url,
                ssl: { rejectUnauthorized: false }
            });

            try {
                // Test the actual PostgreSQL connection
                await pool.query('SELECT 1');

                this.#client = pool;
                console.log('PostgreSQL connected to Supabase');

                return this.#client;
            } catch (err) {
                await pool.end();
                throw err;
            }
        })().catch((err) => {
            this.#connecting = null;
            throw err;
        });

        return this.#connecting;
    }

    get client() {
        if (!this.#client) {
            throw new Error('Database not connected. Call connect() first.');
        }
        return this.#client;
    }

    async disconnect() {
        if (this.#client) {
            await this.#client.end();
            this.#client = null;
            this.#connecting = null;
        }
    }
}

export default Database; 
