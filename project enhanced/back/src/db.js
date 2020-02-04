import sqlite from 'sqlite';


const initializeDatabase = async()=>{
    const db = await sqlite.open('./db.sqlite');
   
    const getContacts = async()=>{
        let string='';
        const rows = await db.all("SELECT contact_id AS id, name, email FROM contacts")
        //rows.forEach( ({ id, name, email }) => string+=`[id:${id}] - ${name} - ${email}`) 
        return rows;
    }

    const controller={
        getContacts
    }
  
    return controller;
  
}

export default  initializeDatabase ;

    
