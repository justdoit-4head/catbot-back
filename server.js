import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(
  cors({
    origin: "https://cat-front.onrender.com",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

dotenv.config();
app.use(express.json());

// const uri = process.env.URI;
// const port = process.env.PORT;

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:SuzhWUOT4c7ULDiq@cluster0.wartca5.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("connected to the database sucessfully"))
  .then(
    app.listen(4000, () => {
      console.log(`listening and running on port: 3000`);
    })
  );

import messages from "./models/messages.js";
import users from "./models/users.js";

// eliminating cors error

app.use((req, res, next) => {
  const allowedOrigins = [
    "https://cat-front.onrender.com/messages",
    "https://cat-front.onrender.com/auth",
    "https://cat-front.onrender.com/messages/addnew",
    "https://cat-front.onrender.com/login",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  return next();
});

// retrieving all the messages
app.get("/messages", async (req, res) => {
  const msges = await messages.find();

  res.json(msges);
});

// adding a new message
app.post("/messages/addnew", (req, res) => {
  const newmsg = new messages({
    text: req.body.text,
    user: req.body.user,
  });
  newmsg.save();
  res.json(newmsg);
});

// deleting a message
app.delete("/messages/delete/:id", async (req, res) => {
  const deleteMessage = await messages.findByIdAndDelete(req.params.id);
  res.json(deleteMessage);
});

// updating a message
app.get("/messages/update/:id", async (req, res) => {
  const msg = await messages.findById(req.params.id);

  msg.text = req.body.text;
  msg.save();
  res.json(msg);
});

// login shit

// auth && register

app.post("/login", async (req, res) => {
  const newUser = new users({
    username: req.body.username,
    passowrd: req.body.password,
  });

  newUser.save();
  res.json(newUser);
});

app.get("/users", async (req, res) => {
  const usrs = await users.find();

  res.json(usrs);
});

app.post("/auth", async (req, res) => {
  const authUser = await users.findOne({
    username: req.body.username,
    passowrd: req.body.password,
  });

  res.json(authUser);
});
