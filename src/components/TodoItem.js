import {
  Checkbox,
  IconButton,
  InputBase,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import { Toast } from "../swal";

// 체크 시 글자 색상 변경을 위함 (material-ui)
const useStyles = makeStyles((theme) => ({
  input: {
    color: "#868e96",
  },
}));

export default function TodoItem(props) {
  const [edited, setEdited] = useState(false);
  const [newItem, setNewItem] = useState(props.todoItem);
  const focusRef = useRef(null);

  // Todo 삭제 메서드
  const onDelete = () => {
    props.deleteTodo(props.todoItem);
  };

  // Todo 체크 메서드
  const onToggleChkbox = () => {
    const checkedItem = {
      ...props.todoItem, // checked를 제외한 todoItem 객체의 모든 아이템을 보여줌 (id, title)
      checked: !props.todoItem.checked, // checked 아이템의 상태 변경
    };

    props.updateTodo(checkedItem);
  };

  // 수정 버튼 클릭 이벤트
  const editToggleBtn = () => {
    setEdited(!edited);

    // 수정을 하지 않고 버튼만 누르는 경우 원래 있던 text로 돌아감
    focusRef.current.value = props.todoItem.title;
  };

  useEffect(() => {
    const refValLen = focusRef.current.value.length;

    // 해당 input box로 포커스
    edited && focusRef.current.focus();
    // 포커스 시 커서를 글자의 맨 뒤로 보냄
    focusRef.current.setSelectionRange(refValLen, refValLen);
  }, [edited]);

  // 수정 input 에 값 입력시 newItem에 해당 값을 넣어줌
  const editChangeHandler = (e) => {
    setNewItem(e.target.value);
  };

  // Todo 수정 메서드
  const submitEvent = () => {
    if (newItem === "") return;

    const editTodo = {
      ...props.todoItem,
      title: newItem, // Todo 내용(title)을 newItem에 담긴 값으로 변경
    };

    props.updateTodo(editTodo);
  };

  // 엔터 키 프레스 이벤트 (엔터를 누르면 수정 완료)
  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      submitEvent();
      Toast.success("수정");

      // 수정이 끝났으므로 false로 변경
      setEdited(false);
    }
  };

  const classes = useStyles();

  return (
    <ListItem>
      <Checkbox
        checked={props.todoItem.checked}
        onChange={onToggleChkbox}
        disableRipple
      />
      <ListItemText>
        <InputBase
          inputProps={{
            "aria-label": "naked",

            // readOnly 가 true이면 오직 읽기만 가능.
            // 처음 로딩시에는 true여야 함.
            // edited의 기본값은 false 이므로 부정형으로 표현해
            // true or false 유동적인 변경이 가능하게 해줌.
            readOnly: !edited,

            // 체크 시 글자색을 회색으로 바꿔줌
            className: `${props.todoItem.checked && classes.input}`,
          }}
          inputRef={focusRef}
          type="text"
          id={newItem.id}
          name={newItem.id}
          value={newItem.title}
          multiline={true}
          fullWidth={true}
          onChange={editChangeHandler}
          onKeyPress={enterKeyEventHandler}
          className={
            // 체크 시 삭선 추가를 위한 css class
            `
            ${props.todoItem.checked && "todoItem-checked"}
            ${edited && "edit-true"}
            `
          }
          style={{width: "80%", padding: "10px"}}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        {props.todoItem.checked === false && (
          <IconButton aria-label="Update Todo" onClick={editToggleBtn}>
            <EditOutlined />
          </IconButton>
        )}
        <IconButton aria-label="Delete Todo" onClick={onDelete}>
          <DeleteOutline />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
