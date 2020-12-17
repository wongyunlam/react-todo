import "./App.css";
import styled from "styled-components";
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG } from "./constant/style";

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid black;

  & + & {
    margin-top: 12px;
  }
`;
const TodoContent = styled.div`
  color: ${(props) => props.theme.colors.primary_300};
  font-size: 12px;

  ${(props) => props.$size === "XL" && `font-size: 20px;`}

  ${(props) => props.$isDone && `text-decoration: line-through`}
`;

const TodoButtonWrapper = styled.div``;

const Button = styled.button`
  padding: 4px
  color: black;
  font-size: 20px;

  ${MEDIA_QUERY_MD} {
    font-size: 16px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 64px;
  }

  &:hover {
    color: red
  }

  & + & {
    margin-left: 20px
  }
`;

const RedButton = styled(Button)`
  color: red;
`;

export default function TodoItem({
  className,
  size,
  todo,
  handleDeleteTodo,
  handleToggleIsDone,
}) {
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };
  const handleToggleClick = () => {
    handleToggleIsDone(todo.id);
  };

  return (
    <TodoItemWrapper className={className} data-todo-id={todo.id}>
      <TodoContent $isDone={todo.isDone} $size={size}>
        {todo.content}
      </TodoContent>
      <TodoButtonWrapper>
        <Button onClick={handleToggleClick}>
          {todo.isDone ? "Incomplete" : "Completed"}
        </Button>
        <RedButton onClick={handleDeleteClick}>Delete</RedButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}
