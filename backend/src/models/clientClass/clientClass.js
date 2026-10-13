import Database from '../dbClass/dbClass.js';

export default class Client{
    
    constructor(){
        this.client_email = null ; 
        this.client_name = null ; 
        this.client_id = null ; 
    }

    setter(client_email, client_name , client_id ){
        this.client_email = client_email ; 
        this.client_name = client_name ; 
        this.client_id = client_id ; 
    }

    getter(){
        return {client_email : this.client_email , client_name : this.client_name , client_id : this.client_id }
    }
    
    async createNew(client_email, client_name, passwd) {
        const pool = Database.getInstance().client;
        try {
            const result = await pool.query(
                `INSERT INTO public.clients (client_email, client_name, passwd)
                 VALUES ($1, $2, $3)
                 RETURNING *;`,
                [client_email, client_name, passwd]
            );
            const row = result.rows[0];
            this.setter(row.client_email, row.client_name, row.client_id ?? null);
            return row;
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(client_email, client_name, passwd) {
        const pool = Database.getInstance().client;
        try {
            await pool.query(
                `UPDATE public.clients
                 SET client_name = $1, client_email = $2, passwd = $3
                 WHERE client_email = $4;`,
                [client_name, client_email, passwd, this.client_email]
            );
            this.setter(client_email, client_name, this.client_id);
        } catch (err) {
            throw new Error(err);
        }
    }
    async auth(client_email, passwd) {
        const pool = Database.getInstance().client;
        try {
            const result = await pool.query(
                `SELECT * FROM public.clients
                 WHERE client_email = $1 AND passwd = $2;`,
                [client_email, passwd]
            );
            if (result.rows.length === 0) return null;
            const { client_name, client_id } = result.rows[0];
            this.setter(client_email, client_name, client_id);
            return 1;
        } catch (err) {
            throw new Error(err);
        }
    }
    async getInfo(client_email, client_name) {
        const pool = Database.getInstance().client;
        try {
            const result = await pool.query(
                `SELECT * FROM public.clients
                 WHERE client_email = $1 OR client_name = $2 ;`,
                [client_email, client_name]
            );
            if (result.rows.length === 0) return null;
            const { client_name: fetched_name, clientid } = result.rows[0];
            this.setter(result.rows[0].client_email, fetched_name, clientid);
            return result.rows[0];
        } catch (err) {
            throw new Error(err);
        }
    }
    delete(){
        //db.delete() 
    }
}
