import api from './Api.js';
const baseEndpoint = `lists`;

class ListApi {
    static post(list) {
        return api.post(baseEndpoint, list);
    }

    static get(id) {
        return api.get(`${baseEndpoint}/${id}`);
    }

    static edit(id, list) {
        return api.patch(`${baseEndpoint}/${id}`, list)
    }

    static getAll() {
        return api.get(baseEndpoint);
    }

    static delete(id) {
        return api.delete(`${baseEndpoint}/${id}`);
    }

    static getTasks(id) {
        return api.get(`${baseEndpoint}/${id}/tasks`);
    }
}

export default ListApi;
