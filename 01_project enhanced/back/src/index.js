//import {createServer} from 'http';
import app from './app';
import initializeDatabase from './db';

const start = async()=>{

  const controller = await initializeDatabase();
  app.get('/', (req, res)=>{

    res.json({message:"Hello"});
  });
  
  app.get('/contacts', async(req, res)=>{
    const result = await controller.getContacts();
    res.send(result);
  });
  
  app.listen(8080, ()=>{console.log("Listening on port 8080")});
  
  

}
start()

/* db.test()

app.get('/', (req, res)=>{

  res.json({message:"Hello"});
});

app.get('/test', (req, res)=>{

  res.send("This is a test");
});

app.listen(8080, ()=>{console.log("Listening on port 8080")}); */