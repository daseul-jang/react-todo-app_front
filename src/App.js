import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import TodoApp from "./components/TodoApp";

import { call } from "./service/ApiService";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);

  // 백엔드 서버(스프링부트)로 연결 (최초 1번)
  useEffect(() => {
    // ApiService.js
    call("/todo", "GET", null).then((response) => {
      // 서버에서 받아온 데이터(response.data)로 todoList 세팅
      setTodoList(response.data);

      // 서버에서 정보를 다 읽어오면 로딩이 끝나므로 false
      setLoading(false);
    });
  }, []);

  // Todo 추가
  const addTodo = (req) => {
    call("/todo", "POST", req).then((response) => setTodoList(response.data));
  };

  // Todo 삭제
  const deleteTodo = (req) => {
    call("/todo", "DELETE", req).then((response) => setTodoList(response.data));
  };

  // Todo 수정
  const updateTodo = (req) => {
    call("/todo", "PUT", req).then((response) => {
      setTodoList(response.data);
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
