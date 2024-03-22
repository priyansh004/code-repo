import express from "express";
import record from "./model/input.js";
import dotenv from 'dotenv'; // Import dotenv package

dotenv.config();
import sequelize from "./database/connection.js";
import { addrecord } from "./controller/inputclt.js";
import { getAllrecords , getRecordById } from "./controller/outputclt.js";
import {redisgetAllRecords} from "./controller/redis.js";


const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specified methods
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specified headers
  next();
});
app.post("/addrecord", addrecord);

app.get("/getrecord", getAllrecords);

app.get("/output/:id", getRecordById);

sequelize
  .sync()
  .then(() => {
    console.log("Models synced with database");

    
    app.listen(process.env.port, () => {
      console.log(`Server is running on http://localhost:${process.env.port}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing models with database:", error);
  });
