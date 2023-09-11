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
    userName: req.body.userName,
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
    profilePicture: "null",
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
          console.log(data._id.valueOf());
          res.sendStatus(200);
        } else if (req.body.password !== data.password) {
          res.sendStatus(403);
        }
      } else if (data === null) {
        res.sendStatus(403);
      }
    });
});

//Single user by login
router.route("/profileDetails/:login").get(async (req, res) => {
  let db_connect = dbo.getDb();
  myQuery = {
    login: req.params.login,
  };
  db_connect
    .collection("users")
    .findOne(myQuery, function (err, res) {
      if (err) throw err;
    })
    .then((data) => {
      res.json(data);
    });
});

//Single user by ID
router.route("/users/:id").get(async (req, res) => {
  let db_connect = dbo.getDb();
  myQuery = {
    _id: new ObjectId(req.params.id),
  };
  db_connect
    .collection("users")
    .findOne(myQuery, function (err, res) {
      if (err) throw err;
    })
    .then((data) => {
      res.json(data);
    });
});
//All users
router.route("/users").get(async (req, res) => {
  let db_connect = dbo.getDb();

  db_connect
    .collection("users")
    .find({})
    .sort({ _id: -1 })
    .toArray()
    .then((data) => {
      res.json(data);
    });
});

//Adding profile pictute URL
router.patch("/addProfilePicture/:login", async (req, res) => {
  let myQuery = {
    login: req.params.login,
  };
  const updates = {
    $set: {
      profilePicture: req.body.profilePicture,
    },
  };
  let db_connect = dbo.getDb();
  let result = db_connect.collection("users").updateOne(myQuery, updates);
  res.send(result).status(200);
});

module.exports = router;
