import Database from '../dbClass/dbClass.js';

export default class Worker {
    constructor() {
        this.worker_email = null;
        this.passwd = null;
        this.worker_name = null;
        this.workerid = null;
    }

    setter(worker_email, worker_name, workerid) {
        this.worker_email = worker_email;
        this.worker_name = worker_name;
        this.workerid = workerid;
    }

    getter() {
        return {
            worker_email: this.worker_email,
            worker_name: this.worker_name,
            workerid: this.workerid,
        };
    }

    async createNew(worker_email, worker_name, passwd) {
        const pool = Database.getInstance().client;
        try {
            const result = await pool.query(
                `INSERT INTO public.workers (worker_email, worker_name, passwd)
                 VALUES ($1, $2, $3)
                 RETURNING *;`,
                [worker_email, worker_name, passwd]
            );
            const row = result.rows[0];
            this.setter(row.worker_email, row.worker_name, row.workerid);
            return row;
        } catch (err) {
            throw new Error(err);
        }
    }

    async auth(worker_email, passwd) {
        const pool = Database.getInstance().client;
        try {
            const result = await pool.query(
                `SELECT * FROM public.workers
                 WHERE worker_email = $1 AND passwd = $2;`,
                [worker_email, passwd]
            );
            if (result.rows.length === 0) return null;
            const row = result.rows[0];
            this.setter(row.worker_email, row.worker_name, row.workerid);
            return 1;
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(worker_email, worker_name, passwd) {
        const pool = Database.getInstance().client;
        try {
            await pool.query(
                `UPDATE public.workers
                 SET worker_name = $1, worker_email = $2, passwd = $3
                 WHERE worker_email = $4;`,
                [worker_name, worker_email, passwd, this.worker_email]
            );
            this.setter(worker_email, worker_name, this.workerid);
        } catch (err) {
            throw new Error(err);
        }
    }

    async getInfo(worker_email) {
        const pool = Database.getInstance().client;
        try {
            const result = await pool.query(
                `SELECT * FROM public.workers
                 WHERE worker_email = $1;`,
                [worker_email]
            );
            if (result.rows.length === 0) return null;
            const row = result.rows[0];
            this.setter(row.worker_email, row.worker_name, row.workerid);
            return row;
        } catch (err) {
            throw new Error(err);
        }
    }

    async delete() {
        const pool = Database.getInstance().client;
        try {
            await pool.query(
                `DELETE FROM public.workers
                 WHERE worker_email = $1;`,
                [this.worker_email]
            );
            this.setter(null, null, null);
        } catch (err) {
            throw new Error(err);
        }
    }
}
