import axios from "axios";
import jwt from "jwt-decode";

const ENDPOINT = "http://localhost:3000";
const AUTH_TOKEN_KEY = "authToken";
const ROLE = "role";

// FUNCIÓN DE LOGIN
export function loginUser(usuario, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${ENDPOINT}/users/login`, // URL DE LA AUTENTICACIÓN
        method: "POST", // MÉTODO DE LA AUTENTICACIÓN
        data: {
          email: usuario,
          password: password,
        }, // DATOS DE LA AUTENTICACIÓN
      });
      setAuthToken(res.data.data);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
//GET USERNAME (GETS AN USERNAME WITH AN INPUT ID)
export function getUserName(id) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${ENDPOINT}/userName`, // URL DE LA AUTENTICACIÓN
        method: "GET", // MÉTODO DE LA AUTENTICACIÓN
        data: {
          id: id,
        },
      });
      resolve(res.data.emailExists);
    } catch (err) {
      console.log("Error consiguiendo el nombre: ", err);
      reject(err);
    }
  });
}

// FUNCIÓN DE ADDCHALLENGE-questions
export function addChallengeQuestion(photoFormData) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${ENDPOINT}/challenge/questions`, // URL DE LA AUTENTICACIÓN
        method: "POST", // MÉTODO DE LA AUTENTICACIÓN
        data: photoFormData,
        headers: {
          "Content-Type": "multipart/form-data; boundary=${form._boundary}",
        },
      });
      resolve();
    } catch (err) {
      console.log("Error en Registro: ", err);
      reject(err);
    }
  });
}
// FUNCIÓN DE ADDCHALLENGE
export function addChallenge(photoFormData) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${ENDPOINT}/challenge`, // URL DE LA AUTENTICACIÓN
        method: "POST", // MÉTODO DE LA AUTENTICACIÓN
        data: photoFormData,
        headers: {
          "Content-Type": "multipart/form-data; boundary=${form._boundary}",
        },
      });
      resolve();
    } catch (err) {
      console.log("Error en Registro: ", err);
      reject(err);
    }
  });
}

// LOGOUT
export function clearLogin() {
  axios.defaults.headers.common["Authorization"] = ``;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  localStorage.removeItem("Usuario");
  localStorage.removeItem("user_id");
  localStorage.removeItem("title");
  localStorage.removeItem("solucion");
  localStorage.removeItem("time");
}

// ========================= TOKEN =====================

// GUARDAR TOKEN EN LOCALSTORAGE
export function setAuthToken(token) {
  axios.defaults.headers.common["Authorization"] = token.token;
  localStorage.setItem(AUTH_TOKEN_KEY, token.token);
  localStorage.setItem("id", token.id);
}

//COGER EL TOKEN
export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

//CONSIGUIENDO FECHA DE CADUCIDAD DEL TOKEN
export function getTokenExpirationDate(encodedToken) {
  let token = jwt(encodedToken);
  //si no hay, no sigue
  if (!token.exp) {
    return null;
  }
  let date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}

//COMPROBANDO SI LA FECHA SIGUE VIGENTE O NO
export function isTokenExpired(token) {
  let expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

//COMPROBAR SI EL USER ESTÁ LOGEADO O NO
export function isLoggedIn() {
  let authToken = getAuthToken();
  return !!authToken && !isTokenExpired(authToken);
}

// ========================= ROL USUARIO =====================

//GUARDAR SI ES ADMIN EN LOCAL STORAGE
export function setIsAdmin(isAdmin) {
  localStorage.setItem(ROLE, isAdmin);
}

//BORRAR ROL DEL USER EN LOCAL STORAGE
export function clearAdmin() {
  return localStorage.removeItem(ROLE);
}

// RECUPERAR ROL DESDE LOCAL STORAGE
export function getIsAdmin() {
  return localStorage.getItem(ROLE);
}

//COMPROBAR ROL
export function checkAdmin() {
  let role = false;
  let isAdmin = getIsAdmin();
  if (isAdmin === "true") {
    role = true;
  } else {
    role = false;
  }
  return role;
}
