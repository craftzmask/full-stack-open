import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.post(baseUrl, newObject, config).then(res => res.data);
};

const update = async (newObject) => {
  return axios.put(`${baseUrl}/${newObject.id}`, newObject).then(res => res.data);
};

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.delete(`${baseUrl}/${id}`, config);
};

const addComment = (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.post(`${baseUrl}/${id}/comments`, comment, config).then(res => res.data);
}

export default { setToken, getAll, update, create, remove, addComment };
