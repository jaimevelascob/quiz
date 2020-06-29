require("dotenv").config();
const jwt = require("jsonwebtoken");

const { getConnection } = require("../db");
const { generateError } = require("../helpers/helpers");

async function userIsAuthenticated(req, res, next) {
  let connection;

  try {
    // Check if the authorization header is valid
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError("Falta la cabecera de Authorization");
    }

    const authorizationParts = authorization.split(" ");

    let token;

    if (authorizationParts.length === 1) {
      token = authorization;
    } else if (authorizationParts[0] === "Bearer") {
      token = authorizationParts[1];
    } else {
      throw generateError("No puedo leer el token");
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      throw new Error("El token no está bien formado");
    }

    // Comprobar que la fecha de expedición del token sea mayor a la
    // fecha de última actualización de password del usuario
    const { id, iat } = decoded;

    connection = await getConnection();

    const [
      result,
    ] = await connection.query(
      "SELECT lastPasswordUpdate FROM users WHERE id=?",
      [id]
    );

    if (!result.length) {
      throw new Error("El usuario no existe en la base de datos");
    }
    console.log("hola ");
    const [user] = result;

    // comprobar que la fecha del token menor mayor que user.lastPasswordUpdate
    // Tened en cuenta que el iat del token está guardado en segundos y node trabaja en
    // milisegundos
    if (new Date(iat * 10000) < new Date(user.lastPasswordUpdate)) {
      throw new Error("El token ya no vale, haz login para conseguir otro");
    }

    req.auth = decoded;
    next();
  } catch (error) {
    error.httpCode = 401;
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

function userIsAdmin(req, res, next) {
  if (!req.auth || req.auth.role !== "admin") {
    const error = new Error("No tienes privilegios de administración");
    error.httpCode = 401;
    return next(error);
  }

  next();
}

module.exports = {
  userIsAuthenticated,
  userIsAdmin,
};
