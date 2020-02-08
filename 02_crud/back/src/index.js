//import {createServer} from 'http';
import app from './app';
import initializeDatabase from './db';

const start = async()=>{

  const controller = await initializeDatabase();
  app.get('/', (req, res)=>{

    res.json({message:"Hello"});
  });
  
  app.get('/contacts', async(req, res)=>{
    const {orderBy} = req.query;
    const result = await controller.getContacts(orderBy);
    res.json(result);
  });

  app.get('/contact/:id', async(req, res)=>{
    const {id} = req.params;
    const result = await controller.getContactByID(id);
    res.json(result);
  });

  app.get('/contacts/create', async(req, res)=>{
    const{name, email} = req.query;
    console.log(req.query);
    const result = await controller.createContact({name, email});
    res.json(result);
  });

  app.get('/contacts/delete/:id', async(req, res)=>{
   
    const {id}= req.params;
    const result = await controller.deleteContact(id);
    res.json(result);
  });

  app.get('/contacts/update/:id', async(req, res)=>{
   
    const {id}= req.params;
    const {name, email } = req.query;
    const result = await controller.updateContact(id, {name, email});
    res.json(result);
  });

  
  app.listen(8080, ()=>{console.log("Listening on port 8080")});
  
  

}
start()
