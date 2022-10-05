class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialUser() {
    // return fetch(`https://${this._baseUrl}/users/me`, { расскоментировать когда через сайт запустишь

    return fetch(`http://${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkJson(res));
  }

  getInitialMovies() {
    return fetch(`https://${this._baseUrl}/movies`, {

      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkJson(res));
  }

  getAllNeededData() {
    return Promise.all([this.getInitialUser(), this.getInitialMovies()]);
  }

  postInitialMovies(data) {
    return fetch(`https://${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
      }),
    }).then((res) => this._checkJson(res));
  }

  deleteMovies(id) {
    return fetch(`https://${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkJson(res));
  }
}

const mainApi = new MainApi({
  // baseUrl: "api.sidorsan.diploma.nomoredomains.sbs",
  baseUrl: "localhost:3001",
});
export default mainApi;
