//import {createServer} from 'http';
import app from "./app";
import multer from 'multer'
import initializeDatabase from "./db";

const upload = multer({dest:'uploads/'})

const start = async () => {
  const controller = await initializeDatabase();
  app.get("/", (req, res, next) => {
    try {
      res.json({ message: "Hello" });
    } catch (err) {
      next(err);
    }
  });
 
  app.get("/contacts", async (req, res, next) => {
    const { orderBy } = req.query;
    try {
      const result = await controller.getContacts(orderBy);
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });

  app.get("/contact/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await controller.getContactByID(id);
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });

  app.get("/contacts/create", async (req, res, next) => {
    const { name, email } = req.query;
    console.log(req.query);
    try {
      const result = await controller.createContact({ name, email });
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });

  app.get("/contacts/delete/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await controller.deleteContact(id);
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });

  app.get("/contacts/update/:id", async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.query;
    console.log(name, email)
    try {
      const result = await controller.updateContact(id, { name, email });
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });

  app.post("/testfile",upload.single('image'), async (req, res, next)=>{
    console.log(req.file)
    console.log(req.body)
    res.json({message:'ok'})
  })
  app.use((err, req, res, next) => {
    res.status(500).json({ success: false, message: err });
  });

  app.listen(8080, () => {
    console.log("Listening on port 8080");
  });
};
start();
