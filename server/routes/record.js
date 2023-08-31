const { res } = require("express");
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
//Creating new account
router.route("/register").post(async (req, res) => {
  let db_connect = dbo.getDb();
  let myObj = {
    email: req.body.email,
    login: req.body.login,
    password: req.body.password,
  };

  db_connect
    .collection("users")
    .findOne(myObj, function (err, res) {
      if (err) throw err;
    })
    .then((data) => {
      console.log(data);
      if (data !== null) {
        res.sendStatus(403);
      } else {
        db_connect
          .collection("users")
          .insertOne(myObj, function (err, res) {
            if (err) throw err;
            res.json(res);
          })
          .then((data) => {
            res.sendStatus(200);
          });
      }
    });
});
//Logging in

router.route("/login").post(async (req, res) => {
  let db_connect = dbo.getDb();
  let myObj = {
    login: req.body.login,
  };

  db_connect
    .collection("users")
    .findOne(myObj, function (err, res) {
      if (err) throw err;
    })
    .then((data) => {
      console.log(data);

      if (data !== null) {
        if (req.body.password === data.password) {
          res.sendStatus(200);
        } else if (req.body.password !== data.password) {
          res.sendStatus(403);
        }
      } else if (data === null) {
        res.sendStatus(403);
      }
    });
});
module.exports = router;
