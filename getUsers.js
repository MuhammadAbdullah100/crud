const express = require("express");
const app = express();
const port = 3003;
var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://abdullah:admin123@brainwavecrm.qejj1.mongodb.net/?retryWrites=true&w=majority";

app.get("/", (req, res) => {
  

  MongoClient.connect(url, (err, db) => {
    if (err) res.send({ error: err });
    var controller = db.db("crm").collection("crud");
    controller.find({}).toArray((err, users) => {
      if (err) res.send({ error: err });
      res.send(users);
      // console.log(users);
    });
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
