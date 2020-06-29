const Joi = require("@hapi/joi");
const { generateError } = require("../../helpers/helpers");
const searchSchema = Joi.string()
  .min(2)
  .required()
  .error(
    generateError(
      "El campo de búsqueda debe de ser de máis de 2 caracteres",
      400
    )
  );

// Object Schemas
const entrySchema = Joi.object().keys({
  tittle: Joi.string()
    .max(100)
    .required()
    .error(
      generateError(
        "El campo place es obligatorio y no puede tener más de 100 caracteres",
        400
      )
    ),

  description: Joi.string()
    .max(1000)
    .required()
    .error(
      generateError(
        "El campo description es obligatorio y non puede tener más de 1000 caracteres",
        400
      )
    ),
  difficulty: Joi.number()
    .min(1)
    .max(5)
    .integer()
    .required()
    .error(
      generateError(
        "El campo voto debe existir y ser un número entre 1 y 5",
        400
      )
    ),
});

const emailSchema = Joi.string()
  .email()
  .required()
  .error(generateError("El campo email tiene que estar bien formado", 400));
const passwordSchema = Joi.string()
  .min(6)
  .max(100)
  .required()
  .error(
    generateError("La password debe de tener entre 6 y 100 carateres", 400)
  );

const userSchema = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
  nickName: Joi.string()
    .max(255)
    .error(
      generateError("El nombre real no puede pasar de 255 caracteres", 400)
    ),
});
const voteSchema = Joi.object().keys({
  vote: Joi.number()
    .min(1)
    .max(5)
    .integer()
    .required()
    .error(
      generateError(
        "El campo voto debe existir y ser un número entre 1 y 5",
        400
      )
    ),
});
const editUserSchema = Joi.object().keys({
  nickName: Joi.string()
    .max(255)
    .error(
      generateError("El nombre real no puede pasar de 255 caracteres", 400)
    ),
});

// Anwers
const questionSchema = Joi.object().keys({
  answerA: Joi.string()
    .max(255)
    .error(
      generateError("La respuesta A no puede pasar de 255 caracteres", 400)
    ),
  answerB: Joi.string()
    .max(255)
    .error(
      generateError("La respuesta B no puede pasar de 255 caracteres", 400)
    ),
  answerC: Joi.string()
    .max(255)
    .error(
      generateError("La respuesta C no puede pasar de 255 caracteres", 400)
    ),
  answerD: Joi.string()
    .max(255)
    .error(
      generateError("La respuesta D no puede pasar de 255 caracteres", 400)
    ),
  text: Joi.string()
    .max(75)
    .error(
      generateError("El nombre real no puede pasar de 75 caracteres", 400)
    ),
  solution: Joi.string()
    .max(1)
    .error(generateError("El nombre real no puede pasar de 1 caracteres", 400)),
  time: Joi.string()
    .max(75)
    .error(generateError("El tiempo no puede pasar de 2 caracteres", 400)),
  user_id: Joi.string().max(75).error(generateError("elige", 400)),
  title: Joi.string()
    .max(75)
    .error(generateError("El title no puede pasar de 2 caracteres", 400)),
  challenge_id: Joi.string()
    .max(75)
    .error(generateError("El tiempo no puede pasar de 2 caracteres", 400)),
});

// CREATE CHALLENGE
const challengeSchema = Joi.object().keys({
  title: Joi.string()
    .max(255)
    .error(
      generateError("La respuesta A no puede pasar de 255 caracteres", 400)
    ),
  time: Joi.string()
    .max(75)
    .error(generateError("El tiempo no puede pasar de 2 caracteres", 400)),
  difficulty: Joi.string().max(75).error(generateError("elige", 400)),
  user_id: Joi.string().max(75).error(generateError("elige", 400)),
});

const editPasswordUserSchema = Joi.object().keys({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
  newPasswordRepeat: Joi.any()
    .valid(Joi.ref("newPassword"))
    .error(generateError("Las passwords debe ser iguales", 400)),
});

module.exports = {
  searchSchema,
  entrySchema,
  userSchema,
  voteSchema,
  passwordSchema,
  emailSchema,
  editPasswordUserSchema,
  editUserSchema,
  questionSchema,
  challengeSchema,
};
