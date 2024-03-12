import express from "express";
import dotenv from "dotenv";


const PORT = process.env.SERVER_PORT || 3000;

dotenv.config();

const app = express();
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT: ==> ${PORT}`);
});
