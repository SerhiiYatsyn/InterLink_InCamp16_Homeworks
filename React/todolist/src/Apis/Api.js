const baseUrl = 'http://localhost:3004';

class Api {
    /*Basic functions to work with RestAPi*/

    static get(endpoint) {
        return Api.sendJson(`GET`, endpoint);
    }

    static post(endpoint, data) {
        return Api.sendJson(`POST`, endpoint, data);
    }

    static patch(endpoint, data) {
        return Api.sendJson(`PATCH`, endpoint, data);
    }

    static delete(endpoint) {
        return Api.sendJson(`DELETE`, endpoint);
    }

    /*Functions to directly work with RestApi*/

    static sendJson(method, endpoint, data) {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };
        return fetch(`${baseUrl}/${endpoint}`, options).then(response => {
            if (!response.ok) return;
            return response.json().then(data => data);
        });
    }
}

export default Api;
