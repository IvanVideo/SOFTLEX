class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`РћС€РёР±РєР° РЅР° СЃРµСЂРІРµСЂРµ`)
    }

    createCard(data) {
        return fetch(`${this._baseUrl}/item`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": data.name,
                "mail": data.mail,
                "text": data.text,
                "status": data.status,
            })
        }).then((res) => this._checkResponse(res));
    }

    getCards() {
        return fetch(`${this._baseUrl}/items`, {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => this._checkResponse(res));
      }

}

const config = {
    baseUrl: "http://localhost:4000",
    headers: { "Content-Type": "application/json" },
};
const mainApi = new MainApi(config);
export default mainApi;