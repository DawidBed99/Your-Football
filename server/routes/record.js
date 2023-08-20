const { response } = require("express");
const express = require("express");
const { DateTime } = require("luxon");
const router = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

// creating post
router.route("/addPost").post(async (req, res) => {
  const date = new Date(Date.now());
  const formattedDate = DateTime.fromJSDate(date).toLocaleString(
    DateTime.DATETIME_MED
  );
  let myObj = {
    post: req.body.post,
    postDate: formattedDate,
    imgURL: req.body.imgURL,
  };
  let db_connect = dbo.getDb();
  db_connect
    .collection("posts")
    .insertOne(myObj, function (err, res) {
      if (err) throw err;
      res.json(res);
    })
    .then((data) => {
      res.json(data);
    });
});

//Getting post
router.route("/posts").get(async (req, res) => {
  let db_connect = dbo.getDb();

  db_connect
    .collection("posts")
    .find({})
    .sort({ _id: -1 })
    .toArray()
    .then((data) => {
      res.json(data);
    });
});
module.exports = router;
