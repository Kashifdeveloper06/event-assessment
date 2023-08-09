const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DATABASE_URI);
const { ObjectId } = require("mongodb");
module.exports = {
  EventList: async function (req, res, next) {
    try {
      const events = await client
        .db(process.env.DATA_BASE)
        .collection("events")
        .find()
        .toArray();
      if (events.length === 0) {
        res.json({
          message: "No Events found!",
          result: true,
        });
      } else {
        res.json({ events, result: true });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },

  addEvent: async function (req, res, next) {
    try {
      const event = { event: req.body.event, triggerTime: new Date() };
      const result = await client
        .db(process.env.DATA_BASE)
        .collection("events")
        .insertOne(event);
      if (result.insertedId) {
        res.json({
          message: "Event added successfully!",
          result: true,
        });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
};
