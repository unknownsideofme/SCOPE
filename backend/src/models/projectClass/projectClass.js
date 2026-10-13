import Database from "../dbClass/dbClass.js"; 
export default class Project{
    constructor(){
        this.name = null ; 
        this.project_id = null ; 
        this.budget = null ; 
        this.client_id = null; 
        this.worker_id = null ; 
    }
    setter(name , project_id , budget , client_id , worker_id ){
        this.name = name ; 
        this.project_id = project_id ; 
        this.budget = budget ; 
        this.client_id = client_id ; 
        this.worker_id = worker_id ; 
    }
    getter(){
        return {
            name : this.name, 
            project_id : this.project_id, 
            budget : this.budget, 
            client_id : this.client_id, 
            worker_id : this.worker_id
        }
    }
    async createNew(){
        const pool = Database.getInstance().client;
        try {
            const result = await pool.query(
                `INSERT INTO public.projects (name, project_id, budget, client_id, worker_id)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING *;`,
                [this.name, this.project_id, this.budget, this.client_id, this.worker_id]
            );
            const row = result.rows[0];
            this.setter(row.name, row.project_id, row.budget, row.client_id, row.worker_id);
            return row;
        } catch (err) {
            throw new Error(err);
        }
    }
    async update(){
        const pool = Database.getInstance().client;
        try {
            await pool.query(
                `UPDATE public.projects
                 SET name = $1, project_id = $2, budget = $3, client_id = $4, worker_id = $5
                 WHERE project_id = $6;`,
                [this.name, this.project_id, this.budget, this.client_id, this.worker_id, this.project_id]
            );
            const row = await pool.query(
                `SELECT * FROM public.projects
                 WHERE project_id = $1;`,
                [this.project_id]
            );
            row = result.rows[0];
            this.setter(row.name, row.project_id, row.budget, row.client_id, row.worker_id);
            return row;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getProject(){
        const pool = Database.getInstance().client;
        try {
            const result = await pool.query(
                `SELECT * FROM public.projects
                 WHERE project_id = $1;`,
                [this.project_id]
            );
            if (result.rows.length === 0) return null;
            const row = result.rows[0];
            this.setter(row.name, row.project_id, row.budget, row.client_id, row.worker_id);
            return row;
        } catch (err) {
            throw new Error(err);
        }

    }
    async delete(){
        const pool = Database.getInstance().client;
        try {
            await pool.query(
                `DELETE FROM public.projects
                 WHERE project_id = $1;`,
                [this.project_id]
            );
            this.setter(null, null, null, null, null);
        } catch (err) {
            throw new Error(err);
        }
    }
}