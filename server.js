import express from "express";
import bodyParser from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/User.js";
import contactRouter from "./Routes/Contact.js";
import {config} from "dotenv";
import cors from "cors"



const app = express();
const port = 1000;
app.use(bodyParser.json());


// .env Setup
config({path: '.env'});



// Cors
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Connect to MongoDB
mongoose
  .connect(
    process.env.MongoUrl,
    { dbName: "Contact_Apis" }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


//   User routes
app.use("/api/user", userRouter);

// contact routes
app.use("/api/contact", contactRouter);

// Start the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
