require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { getConnection } = require("../db");

const {
  processAndSavePhoto,
  deletePhoto,
  randomString,
  sendEmail,
  generateError,
} = require("../helpers/helpers");

const {
  userSchema,
  editUserSchema,
  editPasswordUserSchema,
} = require("./validations/index");
const { get } = require("lodash");

// POST - /user ✅
async function newUser(req, res, next) {
  let connection;
  console.log("hola");
  try {
    // Validate body payload
    await userSchema.validateAsync(req.body);
    connection = await getConnection();
    const { email, password, nickName } = req.body;

    // Check if user email is already in the db
    const [
      existing,
    ] = await connection.query("SELECT id from users where email=?", [email]);

    const [
      existing1,
    ] = await connection.query("SELECT id from users where nickName=?", [
      nickName,
    ]);

    if (existing.length) {
      throw generateError("El email ya existe en la base de datos", 409);
    }

    if (existing1.length) {
      throw generateError("El nickname ya esta en uso", 409);
    }

    // hash password
    const dbPassword = await bcrypt.hash(password, 10);
    const registrationCode = randomString(40);

    const validationURL = `${process.env.PUBLIC_HOST}/users/validate?code=${registrationCode}`;

    let role = "user";

    try {
      await sendEmail({
        email: email,
        title: "Valida tu cuenta de usuario en la app de diario mysql",
        content: `Para validar tu cuenta de usuario pega esta url en tu navegador: ${validationURL}`,
      });
    } catch (error) {
      throw new Error(
        "Error en el envío de mail. Inténtalo de nuevo más tarde."
      );
    }
    console.log("8");
    await connection.query(
      `
      INSERT INTO users (registrationDate, lastPasswordUpdate, email, password, role, nickName, registrationCode)
      VALUES(NOW(), NOW(), ?, ?, ?, ?, ?)
    `,
      [email, dbPassword, role, nickName, registrationCode]
    );
    console.log(email);
    res.send({
      status: "ok",
      message:
        "Usuario registrado. Mira tu email para activarlo. Mira la carpeta del SPAM que seguro que está allí.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
// GET - /users ✅
async function getUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query("SELECT * FROM users");
    // Throw 404 if no results

    // const [userData] = result;

    // const payload = {
    //   registrationDate: userData.registrationDate,
    //   realName: userData.realName,
    //   avatar: userData.avatar
    // };

    // if (userData.id === req.auth.id || req.auth.role === 'admin') {
    //   payload.email = userData.email;
    //   payload.role = userData.role;
    // }

    res.send({
      status: "ok",
      data: result[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

//getUserLog
async function getUserLog(req, res, next) {
  console.log("hola");
  let connection;
  try {
    const { id } = req.params;
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT * 
      FROM users WHERE id=?  
    `,
      [id]
    );
    const [userData] = result;

    // Throw 404 if no results
    if (!result.length) {
      throw generateError(`There is no user with the id ${id}`, 404);
    }

    // const payload = {
    //   registrationDate: userData.registrationDate,
    //   realName: userData.realName,
    //   avatar: userData.avatar,
    // };

    // if (userData.id === req.auth.id || req.auth.role === "admin") {
    //   payload.email = userData.email;
    //   payload.role = userData.role;
    // }

    res.send({
      status: "ok",
      data: userData,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

// Get validate user ✅
async function validateUser(req, res, next) {
  let connection;

  try {
    const { code } = req.query;

    connection = await getConnection();

    // Actualizamos el usuario
    const [
      result,
    ] = await connection.query(
      "UPDATE users SET active=1,registrationCode=NULL WHERE registrationCode=?",
      [code]
    );

    if (result.affectedRows === 0) {
      throw generateError("Validación incorrecta", 400);
    }

    // // Si queremos dar el token descomentar las siguientes líneas
    // const [user] = await connection.query('SELECT role from users where id=?', [
    //   id
    // ]);

    // // Build jsonwebtoken
    // const tokenPayload = { id: id, role: user[0].role };
    // const token = jwt.sign(tokenPayload, process.env.SECRET, {
    //   expiresIn: '30d'
    // });

    res.send({
      status: "ok",
      message: "Usuario validado, ya puedes hacer login.",
      // data: {
      //   token
      // }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
// POST - /users/login ✅
async function loginUser(req, res, next) {
  let connection;

  try {
    await userSchema.validateAsync(req.body);

    const { email, password } = req.body;

    connection = await getConnection();

    // Find the user in the db by email
    const [
      dbUser,
    ] = await connection.query(
      "SELECT id, email, password, role from users where email=? AND active=1",
      [email]
    );

    if (!dbUser.length) {
      throw generateError(
        "No hay ningún usuario activo con ese email en la base de datos. Si te acabas de registrar valida el email",
        404
      );
    }

    const [user] = dbUser;

    const passwordsMath = await bcrypt.compare(password, user.password);

    if (!passwordsMath) {
      throw generateError("Contraseña incorrecta", 401);
    }

    // Build jsonwebtoken
    const tokenPayload = { id: user.id, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: "30d",
    });

    // Create response
    res.send({
      status: "ok",
      message: "Login correcto",
      data: {
        token: token,
        id: user.id,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

// PUT user :id -- edit user ✅
async function editUser(req, res, next) {
  let connection;
  console.log("hola");
  try {
    await editUserSchema.validateAsync(req.body);

    const { id } = req.params;
    const { nickName } = req.body;

    connection = await getConnection();

    // Check if user exists

    const [current] = await connection.query(
      `
      SELECT id, avatar FROM users WHERE id=?
    `,
      [id]
    );
    console.log(current);
    if (!current.length) {
      throw generateError(`The user with id ${id} does not exist`, 404);
    }

    // Check if auth user is the same as :id or is admin
    // if (current[0].id !== req.auth.id && req.auth.role !== "admin") {
    //   throw generateError("No tienes permisos para editar este usuario", 401);
    // }

    // Check if there is a uploaded avatar and process it

    let savedFileName;

    if (req.files && req.files.avatar) {
      try {
        savedFileName = await processAndSavePhoto(req.files.avatar);

        if (current && current.avatar) {
          await deletePhoto(current.avatar);
        }
      } catch (error) {
        throw generateError("Can not process upload image. Try again.", 400);
      }
    } else {
      savedFileName = current.avatar;
    }

    // Update user

    await connection.query(
      `
      UPDATE users SET nickName=?, avatar=? WHERE id=?
    `,
      [nickName, savedFileName, id]
    );

    res.send({
      status: "ok",
      message: "Usuario actualizado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

// POST - /users/:id/password
async function updatePasswordUser(req, res, next) {
  let connection;
  console.log("hola");
  try {
    const { id } = req.params;
    // body: oldpassword, newPassword, newPasswordRepeat (opcional)
    connection = await getConnection();

    await editPasswordUserSchema.validateAsync(req.body);

    const { oldPassword, newPassword } = req.body;

    // Comprobar que el usuario del token es el mismo que el que vamos a cambiar la pass

    // if (Number(id) !== req.auth.id) {
    //   throw generateError(
    //     `You are not allowed to change the password of the user with id: ${id}`,
    //     401
    //   );
    // }

    if (oldPassword === newPassword) {
      throw generateError(
        "The new password can not be the same as the older one",
        400
      );
    }

    // Sacar la info del usuario de la base de datos
    const [currentUser] = await connection.query(
      `
      SELECT id, password from users where id=?
      `,
      [id]
    );

    // Código un poco redundante
    if (!currentUser.length) {
      throw generateError(`The user with id ${id} does not exist`, 404);
    }

    const [dbUser] = currentUser;
    console.log(dbUser);
    // Comprobar que la vieja password envíada sea la correcta
    // el orden es: password sin encriptar, password encriptada
    const passwordsMath = await bcrypt.compare(oldPassword, dbUser.password);

    if (!passwordsMath) {
      throw generateError("Tu antigua contraseña es incorrecta", 401);
    }

    // generar hash de la password
    const dbNewPassword = await bcrypt.hash(newPassword, 10);

    // actualizar la base de datos
    await connection.query(
      `
      UPDATE users SET password=?, lastPasswordUpdate=NOW() WHERE id=?
    `,
      [dbNewPassword, id]
    );

    res.send({
      status: "ok",
      message:
        "Password changed. Old tokens will not work, login to get your new token.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
// DELETE - /users/:id
async function deleteUser(req, res, next) {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const [
      [email],
    ] = await connection.query("SELECT email from users WHERE id=?", [id]);
    const formatedMail = "DELETED: " + email.email;
    console.log(formatedMail);
    await connection.query("UPDATE users SET email=? WHERE id=?", [
      formatedMail,
      id,
    ]);
    await connection.query(
      "UPDATE challenge_questions SET hidden=1 where user_id=?",
      [id]
    );

    connection.release();

    res.send({
      status: "ok",
      message: `The user with id ${id} has been deleted`,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  newUser,
  getUser,
  validateUser,
  loginUser,
  updatePasswordUser,
  editUser,
  getUserLog,
  deleteUser,
};
