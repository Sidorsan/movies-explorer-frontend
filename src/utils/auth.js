export const BASE_URL = "https://api.sidorsan.nomoredomains.sbs";
// export const BASE_URL = "http://localhost:3001";
// export const BASE_URL = "http://194.58.104.236";
const checkResponse = (response) => {
  return response.ok
    ? response.json()
   : Promise.reject(response);
      // : Promise.reject((`Ошибка: ${response.status}`));
      // Promise.reject(console.log(`${response.statusText}`));

};

export const register = ({ password, email, firstName }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
      name: firstName,
    }),
  }).then(checkResponse);
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
