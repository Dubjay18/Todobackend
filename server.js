// importing
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 8000;

// const pusher = new Pusher({
//   appId: "1314321",
//   key: "f246799892c46d056f28",
//   secret: "b7c8e5c6545fda68614e",
//   cluster: "eu",

//   useTLS: true,
// });

// middleware
app.use(express.json());
app.use(cors());

// DB config
const connection_url =
  "mongodb+srv://Dubjay:WeRj9bFBu3YaLo0S@cluster0.zdizk.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");
});
import Todo from "./models/Todo.js";

// ??????

// api routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});
// Listen
app.post("/todos/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();
  res.json(todo);
});
app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});
app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;

  todo.save();
  res.json(todo);
});
app.listen(port, () => console.log(`listening on localhost:${port}`));
