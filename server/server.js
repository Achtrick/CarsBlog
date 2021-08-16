const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app = express();
const mongoose = require("mongoose");
const carsModel = require("./models/cars");
const usersModel = require("./models/users");
var ObjectID = require("mongodb").ObjectID;
mongoose.connect(
  "mongodb+srv://root:root@abnex.wkamj.mongodb.net/ABNEX?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

app.listen(3001, () => {
  console.log("Running on port 3001");
});
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "user",
    resave: false,
    secret: "ABNEX",
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 1000 * 24,
    },
  })
);

app.put("/api/insertComment", async (req, res) => {
  const id = req.body.id;
  const userName = req.body.user.userName;
  const comment = req.body.comment;
  try {
    await carsModel.findById(id, (err, updatedCar) => {
      const objectid = new ObjectID();
      updatedCar.comments.unshift({
        name: userName,
        comment: comment,
        id: objectid,
      });
      updatedCar.save();
      res.send("updated");
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  usersModel.findOne(
    { userName: userName, password: password },
    function (err, user) {
      if (err) {
        res.send("ERROR");
      } else if (user) {
        req.session.user = user;
        res.send(req.session.user);
      } else {
        res.send("ERROR");
      }
    }
  );
});

app.get("/api/getlogin", (req, res) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.send({ userName: "", password: "" });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.user = { userName: "", password: "" };
  res.send(req.session.user);
});

app.get("/api/getCars", (req, res) => {
  carsModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
