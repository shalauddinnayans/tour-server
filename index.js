const express = require("express");
// const axios = require("axios");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const { json } = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gd4wf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("tourism");
    const hotelCollection = database.collection("hotels");
    const tourCollection = database.collection("tours");
    const tourOrderCollection = database.collection("tourOrder");
    const hotelOrderCollection = database.collection("hotelOrder");

    app.get("/hotels", async (req, res) => {
      const cursor = hotelCollection.find({});
      const hotels = await cursor.toArray();
      res.send(hotels);
    });
    app.get("/hotels/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      console.log("hit");
      const result = await tourCollection.findOne(query);
      res.json(result);
    });
    app.post("/hotels", async (req, res) => {
      const hotel = req.body;
      const result = await hotelCollection.insertOne(hotel);
      res.json(result);
    });
    app.get("/hotelorder", async (req, res) => {
      const cursor = hotelOrderCollection.find({});
      const hotel = await cursor.toArray();
      res.send(hotel);
    });
    app.post("/hotelorder", async (req, res) => {
      const order = req.body;
      const result = await hotelOrderCollection.insertOne(order);
      res.json(result);
    });

    app.get("/tours", async (req, res) => {
      const cursor = tourCollection.find({});
      const tours = await cursor.toArray();
      res.send(tours);
    });
    app.post("/tours", async (req, res) => {
      const tour = req.body;
      const result = await tourCollection.insertOne(tour);
      res.json(result);
    });

    app.get("/tourorder", async (req, res) => {
      const cursor = tourOrderCollection.find({});
      const tours = await cursor.toArray();
      res.send(tours);
    });
    app.delete("/tourorder", async (req, res) => {
      const id = req.body.ObjectId;
      const query = { _id: ObjectId(id) };
      console.log("hit ");
      const result = await tourOrderCollection.deleteOne();
      res.json(result);
    });
    app.post("/tourorder", async (req, res) => {
      const tour = req.body;
      console.log("hit the server");
      const result = await tourOrderCollection.insertOne(tour);
      res.json(result);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("server rukfdfk nning");
});
app.listen(port, () => {
  console.log("server is runing", port);
});
