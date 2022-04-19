import { loginAlert, Toast } from "../swal";
import Axios from "../config/axios-config";

const URL_TODO = "/todo";
const URL_AUTH = "/auth";

const getTodoList = (callback) => {
  return Axios.get(URL_TODO)
    .then((response) => callback(response.data))
    .catch((error) => {
      console.log(`axios getTodoList() error : ${error.response.status}`);
      if (error.response.status === 403) {
        window.location.href = "/login";
      }
    });
};

const addTodoItem = (req, callback) => {
  return Axios.post(URL_TODO, req)
    .then((response) => callback(response.data))
    .catch((error) =>
      console.log(`axios service addTodoItem() error : ${error} `)
    );
};

const deleteTodoItem = (req, callback) => {
  return Axios.delete(URL_TODO, { data: req })
    .then((response) => {
      callback(response.data);
      Toast.success("삭제");
    })
    .catch((error) =>
      console.log(`axios service deleteTodoItem() error : ${error}`)
    );
};

const updateTodoItem = (req, callback) => {
  return Axios.put(URL_TODO, req)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) =>
      console.log(`Axios service updateTodoItem() error : ${error}`)
    );
};

const signIn = (userDTO) => {
  return Axios.post(`${URL_AUTH}/signin`, userDTO)
    .then((response) => {
      localStorage.setItem("ACCESS_TOKEN", response.data.token);
      localStorage.setItem("USER_NAME", response.data.username);
      window.location.replace("/");
    })
    .catch((error) => {
      if (error.response.status === 400) {
        loginAlert("error", "아이디 또는 비밀번호가 틀렸습니다.");
      }
    });
};

const signOut = () => {
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("USER_NAME");
  window.location.href = "/login";
};

const signUp = (userDTO) => {
  return Axios.post(`${URL_AUTH}/signup`, userDTO);
};

const emailCheck = (email) => {
  return Axios.post(`${URL_AUTH}/email-check`, email);
};

const AxiosService = {
  getTodoList,
  addTodoItem,
  deleteTodoItem,
  updateTodoItem,
  signIn,
  signOut,
  signUp,
  emailCheck,
};

export default AxiosService;
