class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }



  getInitialMovies() {
    return fetch(`https://${this._baseUrl}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkJson(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "api.nomoreparties.co/beatfilm-movies",
});
export default moviesApi;
