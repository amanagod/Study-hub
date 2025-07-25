const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const Chat = require('./models/chat.js');
const Data = require('./models/data.js');
require('dotenv').config();

const app = express();
const port = process.env.Port ||3000; 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let docs = [];
let chats = [];

///////////////////////////////////////////////////// Routes

app.get("/home", async (req, res) => {
  try {
    chats = await Chat.find();
    docs = await Data.find();
    res.render("index.ejs", { docs, port, chats });
  } catch (err) {
    console.error("Fetch error:", err);
    res.send("Error fetching data");
  }
});

app.get("/home/notes", (req, res) => {
  res.render("notes.ejs", { docs, port });
});

app.get("/home/notes/:id", (req, res) => {
  const { id } = req.params;
  const post = docs.find((x) => id === x.id);
  if (post) res.download(post.url);
  else res.send("File not found");
});

app.post("/home", upload.single("file"), async (req, res) => {
  const { name, discription } = req.body;
  const newurl = req.file.path;

  const p1 = new Data({
    name,
    discription,
    url: newurl,
    created_at: new Date(),
  });

  try {
    await p1.save();
    console.log("Data saved");
  } catch (err) {
    console.log("Save error:", err);
  }

  res.redirect("/home");
});

app.get("/home/chats", (req, res) => {
  res.render("chats.ejs", { chats, port });
});

app.get("/home/chats/new", (req, res) => {
  res.render("newchat.ejs");
});

app.post("/home/chats", async (req, res) => {
  const { name, discription } = req.body;

  const c1 = new Chat({
    name,
    discription,
    created_at: new Date(),
  });

  try {
    await c1.save();
    console.log("Chat saved");
  } catch (err) {
    console.log("Chat save error:", err);
  }

  res.redirect("/home");
});

///////////////////////////////////////////////////// Clear all data
app.get("/clear-database", async (req, res) => {
  try {
    await Chat.deleteMany({});
    await Data.deleteMany({});
    res.send("All data cleared.");
  } catch (err) {
    res.status(500).send("Failed to clear database.");
  }
});

app.get("/", (req, res) => {
  res.send("Go to /home");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
