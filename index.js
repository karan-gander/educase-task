import express from "express";
import connectToDB from "./src/db/connection.js";

const app = express();
const port = 5000;

app.use(express.json());


import schoolRoutes from './src/routes/route.js'
app.use("/api/",schoolRoutes);


connectToDB().then(() => {
  app.listen(port, () => {
    console.log("app is running on port`", port);
  });
}).catch((err)=>{
    console.log(err)
});
