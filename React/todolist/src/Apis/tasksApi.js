import api from './api.js';
const baseEndpoint = `tasks`;

class TasksApi {
    static post(task) {
        return api.post(baseEndpoint, task);
    }

    static edit(id, task) {
        return api.patch(`${baseEndpoint}/${id}`, task);
    }

    static delete(id) {
        return api.delete(`${baseEndpoint}/${id}`);
    }
}

export default TasksApi;
