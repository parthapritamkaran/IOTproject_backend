

const express = require("express");
const router = express.Router();
const TruckData = require("../models/TruckData");

router.post("/gps-data", async (req, res) => {
  console.log("POST /api/gps-data hit");
  console.log("Incoming data:", req.body);

  try {
    const data = new TruckData(req.body);
    await data.save();

    const io = req.app.get("io");
    io.emit("truck_update", data);

    console.log("Emitted truck_update:", data.truck_id);

    res.json({ message: "Data stored" });
  } catch (error) {
    console.error("POST /api/gps-data error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/latest-trucks", async (req, res) => {
  console.log("GET /api/latest-trucks hit");

  try {
    const trucks = await TruckData.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$truck_id",
          latestData: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$latestData" }
      }
    ]);

    res.json(trucks);
  } catch (error) {
    console.error("GET /api/latest-trucks error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
