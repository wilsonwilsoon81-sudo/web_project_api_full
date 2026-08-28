class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  setToken(token) {
    this._token = token;
  }

  _getHeaders() {
    return {
      authorization: `Bearer ${this._token}`,
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  register({ email, password }) {
    return fetch(`${this._address}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  authorize({ email, password }) {
    return fetch(`${this._address}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

    getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  address: "https://api.wilson-around.mooo.com",
  token: localStorage.getItem("jwt") || "",
});

export default api;
