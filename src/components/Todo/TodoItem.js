import styled from "styled-components";
import { MEDIA_QUERY_MD } from "../../constants/style";
import PropTypes from "prop-types"

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
  color: #000;
  font-size: 16px;

  ${(props) => props.$isDone && `text-decoration: line-through`}
`;

const TodoBtnWrapper = styled.div``;

const Button = styled.button`
  padding: 4px;
  color: black;
  font-size: 20px;

  ${MEDIA_QUERY_MD} {
    font-size: 16px;
  }

  &:hover {
    color: green;
  }

  & + & {
    margin-left: 8px;
  }
`;

const RedButton = styled(Button)`
  color: red;
`;

export default function TodoItem({
  content,
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
    <TodoItemWrapper>
      <TodoContent $isDone={todo.isDone}>{content}</TodoContent>
      <TodoBtnWrapper>
        <Button onClick={handleToggleClick}>
          {todo.isDone ? "未完成" : "已完成"}
        </Button>
        <RedButton onClick={handleDeleteClick}>刪除</RedButton>
      </TodoBtnWrapper>
    </TodoItemWrapper>
  );
}

TodoItem.propTypes = {
  content: PropTypes.string,
  todo: PropTypes.object.shape ({
    id: PropTypes.number,
    content: PropTypes.string,
    isDone: PropTypes.bool
  }),
  handleDeleteTodo: PropTypes.func,
  handleToggleIsDone: PropTypes.func,
}