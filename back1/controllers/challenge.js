const { getConnection } = require("../db");
const {
  searchSchema,
  entrySchema,
  voteSchema,
  questionSchema,
  challengeSchema,
} = require("./validations");
const {
  formatDateToDB,
  processAndSavePhoto,
  deletePhoto,
} = require("../helpers/helpers");

// Post challenge questions 🚀
async function challengeQuestions(req, res, next) {
  try {
    const { id } = req.params;
    const {
      title,
      text,
      answerA,
      answerB,
      answerD,
      answerC,
      solution,
      user_id,
      challenge_id,
    } = req.body;

    // Validate payload
    await questionSchema.validateAsync(req.body);

    const connection = await getConnection();
    await connection.query("SELECT id from challenge_questions where id=?", [
      id,
    ]);
    // Check if the user with the current ID already voted for this entry
    const [
      existingChallenge,
    ] = await connection.query(
      "SELECT id from challenge_questions where id=?",
      [id]
    );
    if (existingChallenge.length) {
      const error = new Error(
        "Ya se creo un challenge en esta entrada con tu usuario"
      );
      error.httpCode = 403;
      throw error;
    }

    const date = formatDateToDB(new Date());
    await connection.query(
      "INSERT INTO challenge_questions(id, user_id, challenge_id, title, text, answerA, answerB, answerC, answerD, solution, date) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        id,
        user_id,
        challenge_id,
        title,
        text,
        answerA,
        answerB,
        answerD,
        answerC,
        solution,
        date,
      ]
    );

    res.send({
      status: "ok",
      id: id,
      user_id: user_id,
      challenge_id,
      title: title,
      text: text,
      respuestas: answerA,
      answerB,
      answerC,
      answerD,
      solution,
      date: date,
    });
  } catch (error) {
    next(error);
  }
}
// create challenge
async function createChallenge(req, res, next) {
  try {
    const { id } = req.params;
    const { title, difficulty, user_id, time } = req.body;
    await challengeSchema.validateAsync(req.body);
    const connection = await getConnection();

    // SI EXISTE UN TITLE COM ESE NOMBRE
    await connection.query("SELECT id from challenge where id=?", [id]);
    const [
      existingChallenge,
    ] = await connection.query("SELECT title from challenge where title=?", [
      id,
    ]);
    if (existingChallenge.length) {
      const error = new Error(
        "Ya existe un challenge con este nombre. Elige otro"
      );
      error.httpCode = 403;
      throw error;
    }

    // IMPORTAR DATA
    const date = formatDateToDB(new Date());
    // IMAGE
    let savedFileName;

    if (req.files && req.files.photo) {
      try {
        savedFileName = await processAndSavePhoto(req.files.photo);
      } catch (error) {
        const imageError = new Error(
          "Can not process upload image. Try again."
        );
        imageError.httpCode = 400;
        throw imageError;
      }
    }
    console.log(savedFileName);
    await connection.query(
      "INSERT INTO challenge(image, id,time, title, difficulty, date, user_id) VALUES (?,?,?,?,?,?,?)",
      [savedFileName, id, time, title, difficulty, date, user_id]
    );
    res.send({
      status: "ok",
      id: id,
      image: savedFileName,
      time: time,
      title: title,
      difficulty,
      date: date,
      user_id: user_id,
    });
  } catch (error) {
    next(error);
  }
}
// GET challenge 👀
async function listChallengeQuestions(req, res, next) {
  try {
    const connection = await getConnection();
    const { search } = req.query;
    let result;
    if (search) {
      result = await connection.query(
        `SELECT * FROM challenge WHERE hidden=false AND title LIKE ? AND date>CURDATE()
         OR hidden=false AND difficulty LIKE ? AND date>CURDATE() 
        ORDER BY date ASC`,
        [`%${search}%`, `%${search}%`]
      );
    } else {
      result = await connection.query(
        `SELECT * FROM challenge 
        WHERE hidden=false AND date>CURDATE()
        ORDER BY date ASC`
      );
    }
    connection.release();
    const [questions] = result;
    res.send({
      status: "ok",
      data: questions,
    });
  } catch (error) {
    next(error);
  }
}
// GET challenge id 👀
async function challengeQuestionslist(req, res, next) {
  try {
    const { id } = req.params;
    const connection = await getConnection();

    const [result] = await connection.query(
      `SELECT * FROM challenge
      WHERE hidden=0 and id=?`,
      [id]
    );
    if (!result[0].id) {
      const error = new Error(`The entry with id ${id} does not exist`);
      error.httpCode = 404;
      throw error;
    }

    connection.release();

    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
// GET challenge questions:id 👀
async function challengeQuestion(req, res, next) {
  try {
    const { id } = req.params;
    const connection = await getConnection();

    const [result] = await connection.query(
      `SELECT * FROM challenge_questions
      WHERE title=?`,
      [id]
    );
    if (!result[0].id) {
      const error = new Error(`The entry with id ${id} does not exist`);
      error.httpCode = 404;
      throw error;
    }

    connection.release();

    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

// POST challenge_answer  🚀
async function challengeAnswers(req, res, next) {
  try {
    const { id } = req.params;
    const { answer, challenge_id } = req.body;
    const connection = await getConnection();
    const [
      result,
    ] = await connection.query("SELECT id FROM challenge_answers WHERE id=?", [
      id,
    ]);
    console.log(result[0]);
    await connection.query(
      "INSERT INTO challenge_answers(id, answer, challenge_id) VALUES (?,?,?)",
      [id, answer, challenge_id]
    );
    res.send({
      status: "ok",
      id: id,
      challenge_id: challenge_id,
      respuestas: answer,
    });
  } catch (error) {
    next(error);
  }
}

// Get challenge answers 👀
async function listChallengeAnswers(req, res, next) {
  try {
    const { id } = req.params;

    const connection = await getConnection();

    // Actualizamos el usuario
    // const [
    //   result
    // ] = await connection.query(
    //   'UPDATE challenge_answers SET hit=1 WHERE challenge_questions_id=?',
    //   [id]
    // );
    // 👀
    const [
      questions1,
    ] = await connection.query(
      "SELECT  from challenge_answers WHERE challenge_questions_id=?",
      [id]
    );
    res.send({
      status: "ok",
      data: questions1[0],
    });
  } catch (error) {
    next(error);
  }
}

// Post user_answers 🚀
async function createNewUserAnswers(req, res, next) {
  try {
    const { id } = req.params;
    const { hit } = req.body;
    const connection = await getConnection();
    // result challenge_answers_id, user_id, challenge_id
    const [
      result,
    ] = await connection.query(
      "SELECT id FROM users_answers WHERE challenge_answers_id=?",
      [id]
    );

    // post
    await connection.query(
      "INSERT INTO users_answers(challenge_answers_id, hit, time) VALUES (?,?,?)",
      [id, hit, formatDateToDB(new Date())]
    );
    res.send({
      status: "ok",
      id: id,
      respuestas: result[0],
    });
  } catch (error) {
    next(error);
  }
}

// get user_answers 👀

async function getNewUserAnswers(req, res, next) {
  try {
    const { id } = req.params;

    const connection = await getConnection();

    // 👀
    const [
      questions1,
    ] = await connection.query(
      "SELECT user_id, SUM(time) AS duration FROM users_answers WHERE challenge_id = ? GROUP BY user_id ORDER BY duration DESC",
      [id]
    );
    res.send({
      status: "ok",
      data: questions1[0],
    });
  } catch (error) {
    next(error);
  }
}

// DELETE - /challenge/:id
async function deleteChallenge(req, res, next) {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const [
      [title],
    ] = await connection.query("SELECT id from challenge WHERE id=?", [id]);
    const formatedMail = "DELETED: " + title.id;
    console.log(formatedMail);
    await connection.query("UPDATE challenge SET hidden=1 WHERE id=?", [id]);

    connection.release();

    res.send({
      status: "ok",
      message: `The user with id ${id} has been deleted`,
    });
  } catch (error) {
    next(error);
  }
}
// GET challenge 👀
async function listChallengeQuestionsID(req, res, next) {
  try {
    console.log("hola");
    const connection = await getConnection();
    const { id } = req.params;
    console.log("hola");
    const [
      result,
    ] = await connection.query("SELECT * from challenge WHERE title=?", [id]);
    console.log("hola");
    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  challengeQuestions,
  listChallengeQuestions,
  challengeAnswers,
  listChallengeAnswers,
  createNewUserAnswers,
  getNewUserAnswers,
  challengeQuestionslist,
  createChallenge,
  challengeQuestion,
  deleteChallenge,
  listChallengeQuestionsID,
};
