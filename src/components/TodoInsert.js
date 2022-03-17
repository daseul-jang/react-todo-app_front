import { Button, Grid, Paper, TextField } from "@material-ui/core";
import { useRef, useState } from "react";

export default function TodoInsert(props) {
  const todoId = useRef(1);
  const [todoItem, setTodoItem] = useState("");

  // Todo 입력시 todoItem에 담아줌
  const onChange = (e) => setTodoItem(e.target.value);

  // Todo 추가 메서드
  const onSubmit = () => {
    if (todoItem === "") return;

    const todo = {
      id: `${todoId.current++}`,
      title: todoItem,  // Todo 내용
      checked: false,   // Todo 체크 상태
    };

    props.addTodo(todo);
    setTodoItem("");
  };

  // 엔터 키 프레스 이벤트
  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} sm={10} item style={{ paddingRight: 16 }}>
          <TextField
            type="text"
            value={todoItem}
            placeholder="할 일을 입력해 주세요."
            onChange={onChange}
            onKeyPress={enterKeyEventHandler}
            fullWidth
          />
        </Grid>
        <Grid xs={2} sm={2} item>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={onSubmit}
          >
            +
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
