import API from './api';
import API_ENDPOINTS from '../_shared/constants/api.endpoints';

const getTasks = async (query) => {
    let params = {
        search: query.search,    
    }
    return API.get(`${API_ENDPOINTS.TASK}`, params);
};

const deleteTaskDetails = async (taskId) => {
    return API.deleteIt(`${API_ENDPOINTS.TASK}/${taskId}`);
}

const addTaskDetails = async (task) => {
    return API.post(`${API_ENDPOINTS.TASK}`, task);
}

const updateTaskDetails = async (task) => {
    return API.put(`${API_ENDPOINTS.TASK}/${task._id}`, task);
}

export { getTasks, deleteTaskDetails, updateTaskDetails, addTaskDetails};
