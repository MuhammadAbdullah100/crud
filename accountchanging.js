const express = require("express");
const app = express();
var bodyParser = require("body-parser");

const port = 3002;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://abdullah:admin123@brainwavecrm.qejj1.mongodb.net/?retryWrites=true&w=majority";
  app.post("/user-account-changing", function (req, res, next) {
    // console.log("req", req.body);
    MongoClient.connect(url, function (err, db) {
        if (err) res.send({"error": err});
      var dbo = db.db("crm");
      const controller = dbo.collection("crud");
      var myobj = req.body;
      myobj.status === "delete"? controller.deleteOne({"email": myobj.email}, (err, obj)=>{
        if (err) res.send({"error": err});
        res.send({
            "status": "1 document deleted",
            "result": obj
        })
      }) : myobj?.status !== "delete" ? controller.findOneAndUpdate({"email": myobj.email}, { $set : myobj } , (err, result)=>{
        if (err) res.send({"error": err});
        console.log(result);
        res.send({"status": "Updated", "result": result })
      }) : res.send({"error": "There is any problem. Please Contact"})
      
     
    });
  });
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  
//   for edit account
//   {
//     "name": "STaha",
//     "username": "guddi123",
//     "email": "staha@gmail.com",
//     "phone": "123",
//     "password": "admin1234",
//     "id": 4
// }
// for delete
// {

//     "email": "mohdabdullah@gmail.com",
//     "status": "delete"
// }