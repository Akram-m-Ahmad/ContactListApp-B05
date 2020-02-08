import sqlite from 'sqlite';


const initializeDatabase = async()=>{
    const db = await sqlite.open('./db.sqlite');
   
    const getContacts = async()=>{
        
        const rows = await db.all("SELECT contact_id AS id, name, email FROM contacts")
        return rows;
    }

    const controller={
        getContacts
    }
  
    return controller;
  
}

export default  initializeDatabase ;

    
