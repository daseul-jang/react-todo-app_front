import { Toast } from "../toast";
import Axios from "../config/axios-config";

const URL_TODO = "/todo";
const URL_AUTH = "/auth";

const getTodoList = (callback) => {
  return Axios
    .get(URL_TODO)
    .then((response) => callback(response.data))
    .catch((error) => {
      console.log(`axios getTodoList() error : ${error.response.status}`);
      if (error.response.status === 403) {
        window.location.href = "/login";
      }
    });
};

const addTodoItem = (req, callback) => {
  return Axios
    .post(URL_TODO, req)
    .then((response) => callback(response.data))
    .catch((error) =>
      console.log(`axios service addTodoItem() error : ${error} `)
    );
};

const deleteTodoItem = (req, callback) => {
  return Axios
    .delete(URL_TODO, { data: req })
    .then((response) => {
      callback(response.data);
      Toast.success("삭제");
    })
    .catch((error) =>
      console.log(`axios service deleteTodoItem() error : ${error}`)
    );
};

const updateTodoItem = (req, callback) => {
  return Axios
    .put(URL_TODO, req)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) =>
      console.log(`Axios service updateTodoItem() error : ${error}`)
    );
};

const signIn = (userDTO) => {
  return Axios
    .post(`${URL_AUTH}/signin`, userDTO)
    .then((response) => {
      localStorage.setItem("ACCESS_TOKEN", response.data.token);
      localStorage.setItem("USER_NAME", response.data.username);
      window.location.href = "/";
    })
    .catch((error) =>
      console.log(`axios signin error : ${JSON.stringify(error.response)}`)
    );
};

const signUp = (userDTO) => {
  return Axios.post(`${URL_AUTH}/signup`, userDTO);
};

const emailCheck = (email) => {
  return Axios.post(`${URL_AUTH}/signup/email-check`, email);
}

const AxiosService = {
  getTodoList,
  addTodoItem,
  deleteTodoItem,
  updateTodoItem,
  signIn,
  signUp,
  emailCheck,
};

export default AxiosService;
