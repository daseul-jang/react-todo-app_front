import { Grid, List, Typography } from "@material-ui/core";
import TodoItem from "./TodoItem";

export default function TodoList(props) {
  return (
    <Grid container spacing={2} style={{ minHeight: "150px" }}>
      <Grid item xs={12}>
        {
          // todoList에 값이 있으면 Todo 리스트 보여줌
          props.todoList.length > 0 ? (
            <List>
              {props.todoList.map((item) => (
                <TodoItem
                  key={item.id}
                  todoItem={item}
                  todoList={props.todoList}
                  setTodoList={props.setTodoList}
                  deleteTodo={props.deleteTodo}
                  updateTodo={props.updateTodo}
                />
              ))}
            </List>
          ) : (
            // todoList에 값이 없으면 항목이 없다고 알려줌
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "134px",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                항목이 없습니다.
              </Typography>
            </div>
          )
        }
      </Grid>
    </Grid>
  );
}
