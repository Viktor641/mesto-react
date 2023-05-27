export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Код ошибки: ${res.status}`);
    }
  }

  getUserData() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
      .then(res => { return this._checkResponse(res); })
  }

  sendAvatarData(avatarLink) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
      .then(res => { return this._checkResponse(res); })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
      .then(res => { return this._checkResponse(res); })
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link })
    })
      .then(res => { return this._checkResponse(res); })
  }

  sendUserData(profileData) {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name: profileData.name, about: profileData.job })
    })
      .then(res => { return this._checkResponse(res); })
  }

  deleteCardId(card) {
    return fetch(`${this._baseUrl}cards/${card._id}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => { return this._checkResponse(res); })
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then(res => { return this._checkResponse(res); })
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => { return this._checkResponse(res); })
  }
}

const api =  new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
    authorization: '2ae3fdb2-931e-4404-a211-5be66acaac6c',
    'Content-Type': 'application/json'
  }
})

export default api