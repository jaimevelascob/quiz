const { getConnection } = require('../db');
const {
  searchSchema,
  entrySchema,
  voteSchema,
  questionSchema
} = require('./validations');
const {
  formatDateToDB,
  processAndSavePhoto,
  deletePhoto
} = require('../helpers/helpers');

// POST VOTES challenge id --  👍🏻
async function voteChallenge(req, res, next) {
  try {
    const { id } = req.params;

    // Validate payload
    await voteSchema.validateAsync(req.body);

    const { vote } = req.body;

    const connection = await getConnection();
    // Check if the entry actually exists
    const [
      entry
    ] = await connection.query('SELECT id from challenge where id=?', [id]);

    if (!entry.length) {
      const error = new Error('La entrada con la id específicada no existe');
      error.httpCode = 404;
      throw error;
    }
    // Check if the user with the current ID already voted for this entry
    const [
      existingVote
    ] = await connection.query(
      'SELECT id from challenge_votes where challenge_id=? AND user_id=?',
      [id, req.auth.id]
    );

    if (existingVote.length) {
      const error = new Error('Ya se votó a esta entrada tu usuario');
      error.httpCode = 403;
      throw error;
    }
    //Vote
    await connection.query(
      'INSERT INTO challenge_votes(challenge_id, vote, date, user_id) VALUES (?,?,?,?)',
      [id, vote, formatDateToDB(new Date()), req.auth.id]
    );
    connection.release();
    res.send({
      status: 'ok',
      message: `The vote (${vote} points) to the entry with id ${id} was successful`
    });
  } catch (error) {
    next(error);
  }
}

// GET VOTES Challenge id.  👀👍🏻
async function getChallengeVotes(req, res, next) {
  try {
    const { id } = req.params;
    const connection = await getConnection();

    const [
      votes
    ] = await connection.query(
      'SELECT * from challenge_votes WHERE challenge_id=?',
      [id]
    );
    connection.release();
    res.send({
      status: 'ok',
      data: votes
    });
  } catch (error) {
    next(error);
  }
}

// Post challenge questions 🚀
async function challengeQuestions(req, res, next) {
  try {
    console.log('hola');
    const { id } = req.params;
    const {
      text,
      answerA,
      answerB,
      answerD,
      answerC,
      solution,
      title,
      time
    } = req.body;
    console.log('quetal');
    // Validate payload
    await questionSchema.validateAsync(req.body);

    const connection = await getConnection();
    await connection.query('SELECT id from challenge_questions where id=?', [
      id
    ]);
    // Check if the user with the current ID already voted for this entry
    const [
      existingChallenge
    ] = await connection.query(
      'SELECT id from challenge_questions where id=?',
      [id]
    );
    if (existingChallenge.length) {
      const error = new Error(
        'Ya se creo un challenge en esta entrada con tu usuario'
      );
      error.httpCode = 403;
      throw error;
    }

    // IMAGE
    let savedFileName;

    if (req.files && req.files.photo) {
      try {
        savedFileName = await processAndSavePhoto(req.files.photo);
      } catch (error) {
        const imageError = new Error(
          'Can not process upload image. Try again.'
        );
        imageError.httpCode = 400;
        throw imageError;
      }
    }
    const date = formatDateToDB(new Date());
    console.log('espera');
    console.log(answerA);
    await connection.query(
      'INSERT INTO challenge_questions(image, id, title, text, answerA, answerB, answerC, answerD, solution, time, date) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [
        savedFileName,
        id,
        title,
        text,
        answerA,
        answerB,
        answerD,
        answerC,
        solution,
        time,
        date
      ]
    );

    // Check if the entry actually exists
    // const [
    //   entry
    // ] = await connection.query('SELECT id from challenge where id=?', [id]);
    // if (!questions.length) {
    //   const error = new Error('La entrada con la id específicada no existe');
    //   error.httpCode = 404;
    //   throw error;
    // }

    res.send({
      status: 'ok',
      id: id,
      title: title,
      preguntas: text,
      respuestas: answerA,
      answerB,
      answerC,
      answerD,
      solution,
      time,
      image: savedFileName,
      date: date
    });
  } catch (error) {
    next(error);
  }
}

// GET challenge questions 👀
async function listChallengeQuestions(req, res, next) {
  try {
    const connection = await getConnection();
    const { search, filter } = req.query;
    let result;
    if (search) {
      result = await connection.query(
        `SELECT * FROM challenge_questions WHERE hidden=false AND title LIKE ? AND date>CURDATE()
        ORDER BY date ASC`,
        [`%${search}%`]
      );
    }
    const [questions] = result;

    res.send({
      status: 'ok',
      data: questions
    });
  } catch (error) {
    next(error);
  }
}
// GET challenge questions:id 👀
async function challengeQuestionslist(req, res, next) {
  try {
    console.log('hola');
    const { id } = req.params;
    console.log(id);
    const connection = await getConnection();

    const questions = await connection.query(
      'SELECT * from challenge_questions where id=?',
      [id]
    );
    res.send({
      status: 'ok',
      data: questions[0]
    });
  } catch (error) {
    next(error);
  }
}
// PUT challenge questions 🤯
async function editChallengeQuestions(req, res, next) {
  try {
    const { id } = req.params;
    const {
      text,
      answerA,
      answerB,
      answerC,
      answerD,
      solution,
      limits
    } = req.body;

    const connection = await getConnection();

    const [
      current
    ] = await connection.query(
      'SELECT challenge_questions_id FROM challenge_answers WHERE id=?',
      [id]
    );

    if (!current.length) {
      const error = new Error(`The entry with id ${id} does not exist`);
      error.httpCode = 404;
      throw error;
    }
    // Check if the authenticated user is the entry author or admin
    if (current[0].user_id !== req.auth.id && req.auth.role !== 'admin') {
      const error = new Error('No tienes permisos para editar esta entrada');
      error.httpCode = 401;
      throw error;
    }
    await connection.query(
      'UPDATE challenge_questions SET text=?,answerA=?,answerB=?,answerC=?,answerD=?,solution=?,limits=? WHERE challenge_id=?',
      [text, answerA, answerB, answerC, answerD, solution, limits, id]
    );
    connection.release();
    res.send({
      status: 'ok',
      data: text
    });
  } catch (error) {
    next(error);
  }
}

// POST challenge_answer  🚀
async function challengeAnswers(req, res, next) {
  try {
    const { id } = req.params;
    const { answer } = req.body;
    const connection = await getConnection();
    const [
      result
    ] = await connection.query(
      'SELECT id FROM challenge_answers WHERE challenge_questions_id=?',
      [id]
    );
    console.log(result[0]);
    // const [
    //   existingChallenge
    // ] = await connection.query(
    //   'SELECT id from challenge_answers where challenge_questions_id=?',
    //   [id]
    // );

    // if (existingChallenge.length) {
    //   const error = new Error(
    //     'Ya has respondido a esta entrada con tu usuario'
    //   );
    //   error.httpCode = 403;
    //   throw error;
    // }
    await connection.query(
      'INSERT INTO challenge_answers(challenge_questions_id, answer) VALUES (?,?)',
      [id, answer]
    );
    res.send({
      status: 'ok',
      id: id,
      respuestas: answer
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
      questions1
    ] = await connection.query(
      'SELECT * from challenge_answers WHERE challenge_questions_id=?',
      [id]
    );
    res.send({
      status: 'ok',
      data: questions1[0]
    });
  } catch (error) {
    next(error);
  }
}

//Put challenge answers 🤯
async function ChangeChallengeAnswers(req, res, next) {
  try {
    const { id } = req.params;
    const { answer } = req.body;

    const connection = await getConnection();

    const [
      current
    ] = await connection.query(
      'SELECT challenge_questions_id FROM challenge_answers WHERE id=?',
      [id]
    );

    if (!current.length) {
      const error = new Error(`The entry with id ${id} does not exist`);
      error.httpCode = 404;
      throw error;
    }
    // Check if the authenticated user is the entry author or admin
    if (current[0].user_id !== req.auth.id && req.auth.role !== 'admin') {
      const error = new Error('No tienes permisos para editar esta entrada');
      error.httpCode = 401;
      throw error;
    }
    await connection.query(
      'UPDATE challenge_answers SET answer=? WHERE challenge_questions_id=?',
      [answer, id]
    );
    connection.release();
    res.send({
      status: 'ok',
      data: answer
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
      result
    ] = await connection.query(
      'SELECT id FROM users_answers WHERE challenge_answers_id=?',
      [id]
    );

    // post
    await connection.query(
      'INSERT INTO users_answers(challenge_answers_id, hit, time) VALUES (?,?,?)',
      [id, hit, formatDateToDB(new Date())]
    );
    res.send({
      status: 'ok',
      id: id,
      respuestas: result[0]
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
      questions1
    ] = await connection.query(
      'SELECT user_id, SUM(time) AS duration FROM users_answers WHERE challenge_id = ? GROUP BY user_id ORDER BY duration DESC',
      [id]
    );
    res.send({
      status: 'ok',
      data: questions1[0]
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
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
  challengeQuestionslist
};
