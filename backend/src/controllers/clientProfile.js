import Database from "../models/dbClass/dbClass.js";
import Client from "../models/clientClass/clientClass.js";

export default clientProfile =  async ( req , res) => {
    const { client_email  , client_name } = req.body  ;
    const client = new Client() ; 
    if( client_email === "" && client_name === ""){
        return res.status(400).json({message : "enter your credentials"}) ;
    }
    try{
       await client.getInfo(client_email , client_name) ;
       const { client_name , client_email , client_id } = client.getter();
       return res.status(200).json({client_name , client_email , client_id})
    }catch(err){
        console.log(err) ;
    }
}