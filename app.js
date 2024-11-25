const express = require("express");
const app = express();
const newMsgRouter = express.Router();
const messagesRouter = express.Router();
const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello Worldddd!",
    user: "Charles",
    added: new Date(),
  },
];

newMsgRouter.get("/", (req, res) => res.render("new"));
newMsgRouter.post("/", (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect("/");
});

messagesRouter.get("/:user", (req, res) => {
  const user = messages.find((msg) => msg.user === req.params.user);
  res.render("message", { user: user });
});

app.use("/new", newMsgRouter);
app.use("/messages", messagesRouter);

app.get("/", (req, res) => res.render("index", { messages: messages }));

app.listen(3000);
