import Database from "../dbClass/dbClass";
export default class Milestone{
    constructor(){
        this.mile_name = null ; 
        this.mileid = null ; 
        this.budget = null  ;
        this.status = null ; 
        this.description = null; 
        this.parent_mile = null ; 
        this.child_mile = null; 
    }
    setter(mile_name,mileid , budget , status , description  , parent_mile  , child_mile ){
        this.mile_name = mile_name ;
        this.mileid = mileid ;
        this.budget = budget ;
        this.status = status ;
        this.description = description;
        this.parent_mile = parent_mile;
        this.child_mile = child_mile;
    }
    getter(){
        return {
            mile_name : this.mile_name,
            mileid : this.mileid,
            budget : this.budget,
            status : this.status,
            description : this.description,
            parent_mile : this.parent_mile,
            child_mile : this.child_mile
        } 
    }
    async createNew(){
        const pool = Database.getInstance().client;
        try {
            const result = await pool.query(
                `INSERT INTO public.milestones (mile_name, mileid, budget, status, description, parent_mile, child_mile)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 RETURNING *;`,
                [this.mile_name, this.mileid, this.budget, this.status, this.description, this.parent_mile, this.child_mile]
            );
            const row = result.rows[0];
            this.setter(row.mile_name, row.mileid, row.budget, row.status, row.description, row.parent_mile, row.child_mile);
            return row;
        } catch (err) {
            throw new Error(err);
        } 

    }
    async update(){
        const pool = Database.getInstance().client; 
        try{
            await pool.query(
                `UPDATE public.milestones
                 SET mile_name = $1, mileid = $2, budget = $3, status = $4, description = $5, parent_mile = $6, child_mile = $7
                 WHERE mileid = $8;`,
                [this.mile_name, this.mileid, this.budget, this.status, this.description, this.parent_mile, this.child_mile, this.mileid]
            );
            const row = await pool.query(
                `SELECT * FROM public.milestones
                 WHERE mileid = $1;`,
                [this.mileid]
            );
            row = result.rows[0];
            this.setter(row.mile_name, row.mileid, row.budget, row.status, row.description, row.parent_mile, row.child_mile);
            return row;
        } catch (err) {
            throw new Error(err);
        } 
    }
    async delete(){
        const pool = Database.getInstance().client;
        try {
            await pool.query(
                `DELETE FROM public.milestones
                 WHERE mileid = $1;`,
                [this.mileid]
            );
            this.setter(null, null, null, null, null, null, null);
        } catch (err) {
            throw new Error(err);
        }   
    }
}