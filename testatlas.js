require("dotenv").config();
const { MongoClient } = require("mongodb");

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB Atlas connected successfully");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();