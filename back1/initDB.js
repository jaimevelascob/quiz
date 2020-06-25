require('dotenv').config();
const { getConnection } = require('./db');
const bcrypt = require('bcrypt');
const faker = require('faker/locale/es');
const { random } = require('lodash');
const { formatDateToDB } = require('./helpers/helpers');

const args = process.argv;

const addData = args[2] === '--data';

// global variables  🏴‍
// users 👱🏼
const users = 5;
// entries 💓
const estries = 10;
//userID 👱🏼
const userId = random(2, users + 1);
// votes 👍🏻
const votes = 10;

// f.u.n.ci.o.n principal  👑
async function main() {
  try {
    const connection = await getConnection();

    console.log('droping');
    // await connection.query('DROP TABLE IF EXISTS challenge_ranking');
    await connection.query('DROP TABLE IF EXISTS users_answers');
    await connection.query('DROP TABLE IF EXISTS challenge_answers');
    await connection.query('DROP TABLE IF EXISTS challenge_votes');
    await connection.query('DROP TABLE IF EXISTS challenge_questions');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('prueba');
    // users  👱🏼
    await connection.query(`
          CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          registrationDate DATETIME NOT NULL,
          lastPasswordUpdate DATETIME NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) UNIQUE NOT NULL,
          role ENUM("normal", "admin") DEFAULT "normal" NOT NULL,
          active BOOLEAN DEFAULT false NOT NULL,
          nickName VARCHAR(255) NOT NULL,
          avatar VARCHAR(255),
          registrationCode VARCHAR(255)
          )
          `);
    // challenge_questions ⁉️
    await connection.query(`CREATE TABLE IF NOT EXISTS challenge_questions(
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(50) NOT NULL,
        text VARCHAR(1000) NOT NULL,
        answerA VARCHAR(500) NOT NULL,
        answerB VARCHAR(500) NOT NULL,
        answerC VARCHAR(500) NOT NULL,
        answerD VARCHAR(500) NOT NULL,
        solution VARCHAR(1) ,
        time VARCHAR(2),
        user_id INTEGER,
        image varchar(255) default null,
        hidden boolean default false,
        date datetime not null,
        difficulty INTEGER NOT NULL,
        CONSTRAINT FK_entry_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
        );`);
    console.log('prueba1');
    //challenge votes  👍🏻
    await connection.query(`CREATE TABLE IF NOT EXISTS challenge_votes (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      challenge_questions_id INTEGER,
      user_id INTEGER,
      vote INTEGER NOT NULL,
      date DATETIME NOT NULL,
      CONSTRAINT fk_votes_challenge FOREIGN KEY (challenge_questions_id) REFERENCES challenge_questions(id) ON DELETE SET NULL,
      CONSTRAINT fk_votes_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      );`);
    console.log('prueba2');

    console.log('prueba3');
    // challenge_answers ❗️
    await connection.query(`CREATE TABLE IF NOT EXISTS challenge_answers(
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          answer VARCHAR(255),      
          challenge_questions_id INTEGER,
          CONSTRAINT fk_entry_questions FOREIGN KEY (challenge_questions_id) REFERENCES challenge_questions(id) ON DELETE SET NULL
          );`);
    console.log('prueba4');
    // user_answers ❗️
    await connection.query(`CREATE TABLE IF NOT EXISTS users_answers(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            time INT,
            hit boolean DEFAULT false,
            challenge_answers_id INTEGER,
            user_id INTEGER,
            challenge_questions INTEGER,
            CONSTRAINT FK_user_entry FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
            CONSTRAINT fk_user_answers FOREIGN KEY (challenge_answers_id) REFERENCES challenge_answers(id) ON DELETE SET NULL,
            CONSTRAINT fk_user_challenge FOREIGN KEY (challenge_questions) REFERENCES challenge_questions(id) ON DELETE SET NULL
            );`);
    console.log('prueba5');
    // challenge_ranking  🆙
    // await connection.query(`CREATE TABLE IF NOT EXISTS challenge_ranking(
    //           id INTEGER PRIMARY KEY AUTO_INCREMENT,
    //           users_answers_id INTEGER,
    //           position INT,
    //           CONSTRAINT fk_user_answers_ranking FOREIGN KEY (users_answers_id) REFERENCES users_answers(id) ON DELETE SET NULL
    //           );`);

    // create initial user a.d.m.i.n  👳🏼
    const password = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);
    await connection.query(`
            INSERT INTO users(registrationDate, lastPasswordUpdate, email, password, role, nickName, active)
            VALUES(NOW(), NOW(), "jaimevelasco3@hotmail.com", "${password}", "admin", "Jaime Velasco", true)
            `);
    // bucle
    if (addData) {
      console.log('Adding initial data');
      for (let index = 0; index < users; index++) {
        // create random user  👩🏼‍💻
        const email = faker.internet.email();
        const password = await bcrypt.hash(faker.internet.password(), 10);
        await connection.query(`INSERT INTO users(registrationDate, lastPasswordUpdate, email, password, role, nickName, active)
            VALUES(NOW(), NOW(), "${email}", "${password}", "normal", "${faker.name.findName()}", true)
    `);
      }

      // create challenge 🕵🏼‍♀️

      for (let index = 0; index < estries; index++) {
        await connection.query(`INSERT INTO challenge (tittle, description, difficulty, date, user_id)
        VALUES ("${faker.lorem.sentence()}","${faker.lorem.sentence()}","${random(
          1,
          5
        )}","${formatDateToDB(faker.date.recent())}
            ","${userId}")`);
      }
      // create votes 👍🏻

      for (let index = 0; index < votes; index++) {
        await connection.query(
          `INSERT INTO challenge_votes (challenge_id,user_id, vote, date)
          VALUES ("${random(1, estries)}","${userId}","${random(
            1,
            5
          )}","${formatDateToDB(faker.date.recent())}
            ")`
        );
      }

      // create challenge_questions ❓
      for (let index = 0; index < estries; index++) {
        await connection.query(`INSERT INTO challenge_questions (text, answerA, answerB, answerC, answerD, solution, limits, challenge_id) 
        VALUES ("${faker.lorem.sentence()}","${faker.lorem.sentence()}","${userId}","${userId}","${userId}","p","${userId}","${userId}")`);
      }
      console.log('ey');
      // create challenge_answers ❗️
      for (let index = 0; index < estries; index++) {
        await connection.query(`INSERT INTO challenge_answers (answer, challenge_questions_id) 
          VALUES ("${faker.lorem.sentence()}","${userId}")`);
      }
      console.log('y');
      // create users_answers ❗️
      for (let index = 0; index < estries; index++) {
        await connection.query(`INSERT INTO users_answers (time, hit, challenge_answers_id, user_id, challenge_id) 
        VALUES ("${userId}
        ","${random(1, 5)}","${random(1, estries)}","${userId}","${random(
          1,
          estries
        )}")`);
      }
      // for (let index = 0; index < estries; index++) {
      //   await connection.query(`INSERT INTO challenge_ranking(users_answers_id, position) VALUES
      //   ("${random(1, 5)}","${random(1, 1000)}")`);
      // }
    }

    console.log('Initial structure created');
    connection.release();
    process.exit();
  } catch (error) {
    throw new Error('err');
  }
}
main();
