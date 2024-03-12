import databaseClient from "../service/database.mjs";
import express from "express";

const webServer = express.Router();

webServer.post("/cars", async (req, res) => {
  const { station, name, model, licensePlate, remark, address } = req.body;
  if (!station || !name || !model || !licensePlate || !remark || !address) {
    return res.status(400).send({ error: "insufficient input " });
  }
  if (station.trim() === "") {
    return res.status(400).send({ error: "empty station" });
  }
  if (name.trim() === "") {
    return res.status(400).send({ error: "empty name" });
  }
  if (model.trim() === "") {
    return res.status(400).send({ error: "empty model" });
  }
  if (licensePlate.trim() === "") {
    return res.status(400).send({ error: "empty licenseplate" });
  }
  if (remark.trim() === "") {
    return res.status(400).send({ error: "empty remark" });
  }
  if (address.trim() === "") {
    return res.status(400).send({ error: "empty address" });
  }

  const exitingUser = await databaseClient
    .db()
    .collection("cars")
    .findOne({ licensePlate });

  if (exitingUser) {
    return res.status(400).send({ error: { message: "car exist" } });
  }

  const newCar = {
    station,
    name,
    model,
    licensePlate,
    remark,
    address,
  };

  await databaseClient.db().collection("cars").insertOne(newCar);
  res.status(200).send("Create new car success.");
});

webServer.post('/edit-cars', async(req,res)=>{
  const { station, name, model, licensePlate, remark, address } = req.body;
  if (!station || !name || !model || !licensePlate || !remark || !address) {
    return res.status(400).send({ error: "insufficient input " });
  }
  if (station.trim() === "") {
    return res.status(400).send({ error: "empty station" });
  }
  if (name.trim() === "") {
    return res.status(400).send({ error: "empty name" });
  }
  if (model.trim() === "") {
    return res.status(400).send({ error: "empty model" });
  }
  if (licensePlate.trim() === "") {
    return res.status(400).send({ error: "empty licenseplate" });
  }
  if (remark.trim() === "") {
    return res.status(400).send({ error: "empty remark" });
  }
  if (address.trim() === "") {
    return res.status(400).send({ error: "empty address" });
  }

  const cars = await databaseClient.db().collection('cars').findOne({})

});

export default webServer;
