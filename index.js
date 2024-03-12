import express from "express";
import dotenv from "dotenv";
import serviceCar from "./routes/serviceCar.js"
import cors from "cors";


const PORT = process.env.SERVER_PORT || 3000;

dotenv.config();
const webServer = express();
webServer.use(express.json());
webServer.use(express.urlencoded({ extended: true }));
webServer.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// 
webServer.use(serviceCar)


webServer.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT: ==> ${PORT}`);
});
