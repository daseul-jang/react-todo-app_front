import { Paper } from "@material-ui/core";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";

export default function TodoApp(props) {
  return (
    <div>
      <TodoInsert
        todoList={props.todoList}
        setTodoList={props.setTodoList}
        addTodo={props.addTodo}
      />
      <Paper style={{ margin: 16 }}>
        <TodoList
          todoList={props.todoList}
          setTodoList={props.setTodoList}
          updateTodo={props.updateTodo}
          deleteTodo={props.deleteTodo}
        />
      </Paper>
    </div>
  );
}
