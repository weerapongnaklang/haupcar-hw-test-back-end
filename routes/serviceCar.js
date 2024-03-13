import databaseClient from "../service/database.mjs";
import express from "express";
import { ObjectId } from "mongodb";

const webServer = express.Router();

webServer.get("/cars", async (req, res) => {
  const cars = await databaseClient.db().collection("cars").find({}).toArray();
  res.json(cars);
});
webServer.get("/cars/:id", async (req, res) => {
  const carId = req.params.id;
  const cars = await databaseClient
    .db()
    .collection("cars")
    .findOne({ _id: new ObjectId(carId) });
  res.json(cars);
});

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

webServer.put("/cars/:id", async (req, res) => {
  try {
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
    const carId = req.params.id;
    await databaseClient
      .db()
      .collection("cars")
      .updateOne({ _id: new ObjectId(carId) }, {$set: req.body});
    res.status(200).json({ message: "Edit car successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "failed to update car" });
  }
});

webServer.delete("/cars/:id", async (req, res) => {
  try {
    const carId = req.params.id;
    await databaseClient
      .db()
      .collection("cars")
      .deleteOne({ _id: new ObjectId(carId) });
    res.status(200).send("Delete car success");
  } catch (error) {
    return res.status(500), json({ error: "failed to delete car" });
  }
});

export default webServer;
