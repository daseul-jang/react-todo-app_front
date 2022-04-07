import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import TodoApp from "./components/TodoApp";

import AxiosService from "./service/AxiosService";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);

  // 백엔드 서버(스프링부트)로 연결
  useEffect(() => {
    AxiosService.getTodoList((res) => {
      setTodoList(res.data);
      setLoading(false);
    });
  }, []);

  // Todo 추가
  const addTodo = (req) => {
    AxiosService.addTodoItem(req, (res) => {
      setTodoList(res.data);
    });
  };

  // Todo 삭제
  const deleteTodo = (req) => {
    AxiosService.deleteTodoItem(req, (res) => {
      setTodoList(res.data);
    });
  };

  // Todo 수정
  const updateTodo = (req) => {
    AxiosService.updateTodoItem(req, (res) => {
      setTodoList(res.data);
    });
  };

  return (
    <div className="App">
      {
        // loading 값이 true (서버에서 정보를 가져오기 전) 일 땐 로딩중 글자를,
        // false (서버에서 정보를 가져온 후) 일 땐 Todo 리스트를 보여줌
        loading ? (
          <Loading />
        ) : (
          <div>
            <NavBar />
            <Container maxWidth="sm">
              <TodoApp
                todoList={todoList}
                setTodoList={setTodoList}
                addTodo={addTodo}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            </Container>
          </div>
        )
      }
    </div>
  );
}
