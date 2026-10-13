import {db} from '../dbclass/dbClass.js' ; 

export default class Client{
    constructor(name , username){
        this.name = name ; 
        this.username = username ; 


    }

    createNew(){
        // db.insert() 
    }

    update(){
        //db.update() 
    }
    auth(){
        //db.auth() 
    }
    getInfo(){
        //db.get(username)
    }
    delete(){
        //db.delete() 
    }
}
