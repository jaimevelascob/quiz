require("dotenv").config();

const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT;

// exportar routes challenges 🚀
const {
  getChallengeVotes,
  voteChallenge,
  challengeQuestions,
  listChallengeQuestions,
  editChallengeQuestions,
  challengeAnswers,
  listChallengeAnswers,
  ChangeChallengeAnswers,
  createNewUserAnswers,
  getNewUserAnswers,
  challengeQuestionslist,
  createChallenge,
  challengeQuestion,
  deleteChallenge,
} = require("./controllers/challenge");

// exportar routes users 👼
const {
  newUser,
  getUser,
  validateUser,
  loginUser,
  updatePasswordUser,
  editUser,
  getUserLog,
  deleteUser,
} = require("./controllers/users");

// Auth middlewares  💲
const { userIsAuthenticated, userIsAdmin } = require("./middlewares/auth");

// Console logger middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(bodyParser.json());

// Multipart parsing middleware
app.use(fileUpload());

// CORS middleware
app.use(cors());

// Serve static
app.use(express.static(path.join(__dirname, "static")));

// U.s.e.r R.o.u.t.e.s  👼

// User post ✅
app.post("/clients", newUser); //  🏁
app.post("/users/login", loginUser);
app.post("/users/:id/password", updatePasswordUser);

// user get ✅
app.get("/users/validate", validateUser); // 👀

// U.r.e.r id ✅
app.get("/users", getUser); // 👀
app.get("/users/:id", getUserLog);
app.put("/users/:id", editUser);
app.delete("/users/:id", deleteUser);
//  c.h.a.l.l.e.n.g.e id votes
app.post("/challenge/:id/votes", userIsAuthenticated, voteChallenge); // 🏁 Solo usuarios ✅
app.get("/challenge/:id/votes", getChallengeVotes); // 👀 ✅

//  c.h.a.l.l.e.n.g.e id questions 🧠 ✅
app.post("/challenge", createChallenge); // 🏁✅
app.get("/challenge/:id", challengeQuestionslist); // 🏁✅
app.delete("/challenge/:id", deleteChallenge);
app.get("/challengelist", listChallengeQuestions); // 👀 ✅
app.post("/challenge/questions", challengeQuestions); // 🏁✅
app.get("/challenge/questions/:id", challengeQuestion); // 👀 ✅
app.put(
  "/challenge/:id/questions",
  userIsAuthenticated,
  userIsAdmin,
  editChallengeQuestions
); // ⛏✅Solo usuarios (que crearon esa entrada) o admin
//  c.h.a.l.l.e.n.g.e id answers 🧠
app.post("/challenge/answers/:id", challengeAnswers); // 👀 ✅
app.get("/challenge/answers/:id", listChallengeAnswers); // ⛏✅
app.put(
  "/challenge/:id/questions/answers",
  userIsAuthenticated,
  ChangeChallengeAnswers
);

// U.s.e.r a.n.s.w.e.r.s  🙋🏾‍♂️

// Post
app.post(
  "/challenge/:id/questions/answers/user_answers",
  userIsAuthenticated,
  userIsAdmin,
  createNewUserAnswers
);

// Get 👀 ✅
app.get(
  "/challenge/:id/questions/answers/user_answers",
  getNewUserAnswers,
  userIsAuthenticated,
  userIsAdmin
);
// ✅
// Error middleware ❎
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpCode || 500).send({
    status: "error",
    message: error.message,
  });
});

// Not found middleware ❎
app.use((req, res) => {
  res.status(404).send({ status: "error", message: "Not found" });
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port} 🚀`);
});
