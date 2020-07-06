require("dotenv").config();
const { getConnection } = require("./db");
const bcrypt = require("bcrypt");
const faker = require("faker/locale/es");
const { random } = require("lodash");
const { formatDateToDB } = require("./helpers/helpers");

const args = process.argv;

// f.u.n.ci.o.n principal  👑
async function main() {
  try {
    const connection = await getConnection();

    console.log("droping");
    // await connection.query('DROP TABLE IF EXISTS challenge_ranking');
    await connection.query("DROP TABLE IF EXISTS users_answers");
    await connection.query("DROP TABLE IF EXISTS challenge_answers");
    // await connection.query("DROP TABLE IF EXISTS challenge_votes");
    await connection.query("DROP TABLE IF EXISTS challenge_questions");
    await connection.query("DROP TABLE IF EXISTS challenge");
    await connection.query("DROP TABLE IF EXISTS users");

    console.log("prueba");
    // users  👱🏼
    await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        registrationDate DATETIME NOT NULL,
        lastPasswordUpdate DATETIME NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role enum('user', 'admin') default 'user',
        active BOOLEAN DEFAULT false NOT NULL,
        nickName VARCHAR(255) NOT NULL,
        avatar VARCHAR(255),
        registrationCode VARCHAR(255)
          )
          `);

    // challenge  🕵🏼‍♀️
    await connection.query(`
        CREATE TABLE IF NOT EXISTS challenge(
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(50) UNIQUE NOT NULL,
        time VARCHAR(2),           
        difficulty VARCHAR(255),
        hidden boolean default false,
        date DATETIME NOT NULL,
        image varchar(255) default null,
        user_id INTEGER,
        CONSTRAINT FK_challenge_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
                )
        `);
    // challenge_questions ⁉️
    await connection.query(`CREATE TABLE IF NOT EXISTS challenge_questions(
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        text VARCHAR(1000) NOT NULL,
        title VARCHAR(50),  
        answerA VARCHAR(500) NOT NULL,
        answerB VARCHAR(500) NOT NULL,
        answerC VARCHAR(500) NOT NULL,
        answerD VARCHAR(500) NOT NULL,
        solution VARCHAR(1) ,
        user_id INTEGER,
        challenge_id INTEGER,
        date datetime not null,
        CONSTRAINT FK_question_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        CONSTRAINT FK_question_challenge FOREIGN KEY (challenge_id) REFERENCES challenge(id) ON DELETE SET NULL
        );`);
    console.log("prueba1");
    //challenge votes  👍🏻
    // await connection.query(`CREATE TABLE IF NOT EXISTS challenge_votes (
    //   id INTEGER PRIMARY KEY AUTO_INCREMENT,
    //   challenge_questions_id INTEGER,
    //   user_id INTEGER,
    //   vote INTEGER NOT NULL,
    //   date DATETIME NOT NULL,
    //   CONSTRAINT fk_votes_challenge FOREIGN KEY (challenge_questions_id) REFERENCES challenge_questions(id) ON DELETE SET NULL,
    //   CONSTRAINT fk_votes_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    //   );`);
    // console.log("prueba2");

    console.log("prueba3");
    // challenge_answers ❗️
    await connection.query(`CREATE TABLE IF NOT EXISTS challenge_answers(
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        answer VARCHAR(255),      
        challenge_id INTEGER,
        CONSTRAINT fk_answer_challenge FOREIGN KEY (challenge_id) REFERENCES challenge(id) ON DELETE SET NULL
          );`);
    console.log("prueba4");
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
    console.log("prueba5");

    // create initial user a.d.m.i.n  👳🏼
    const password = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);
    await connection.query(`
            INSERT INTO users(registrationDate, lastPasswordUpdate, email, password, role, nickName, active)
            VALUES(NOW(), NOW(), "jaimevelasco3@hotmail.com", "${password}", "admin", "Jaime Velasco", true)
            `);
    await connection.query(`
            INSERT INTO users(registrationDate, lastPasswordUpdate, email, password, role, nickName, active)
            VALUES(NOW(), NOW(), "jaimevelasco680@gmail.com", "${password}", "user", "Jaime", true)
            `);
    console.log("Initial structure created");
    connection.release();
    process.exit();
  } catch (error) {
    throw new Error("err");
  }
}
main();
