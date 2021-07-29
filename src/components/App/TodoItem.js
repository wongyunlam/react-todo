import styled from "styled-components";
import { MEDIA_QUERY_MD } from "../../constants/style";
import PropTypes from "prop-types";

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

const EditTodo = styled.input`
  max-width: 400px;
  padding: 2px;
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
  handleEditChange,
  handleUpdateTodo,
}) {
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };

  const handleToggleClick = () => {
    handleToggleIsDone(todo.id);
  };

  return (
    <TodoItemWrapper>
      {!todo.isEditing && (
        <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
      )}
      {todo.isEditing && (
        <EditTodo
          value={todo.content}
          onChange={(e) => handleEditChange(todo.id, e)}
        />
      )}
      <TodoContent $isDone={todo.isDone}>{content}</TodoContent>
      <TodoBtnWrapper>
        {!todo.isDone && (
          <Button onClick={() => handleUpdateTodo(todo)}>edit</Button>
        )}
        {!todo.isEditing && (
          <Button
            onClick={() => {
              handleToggleClick(todo.id);
            }}
          >
            {todo.isDone ? "undone" : "done"}
          </Button>
        )}
        <RedButton onClick={handleDeleteClick}>delete</RedButton>
      </TodoBtnWrapper>
    </TodoItemWrapper>
  );
}

TodoItem.propTypes = {
  content: PropTypes.string,
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    isDone: PropTypes.bool,
    isEditing: PropTypes.bool,
  }),
  handleDeleteTodo: PropTypes.func,
  handleToggleIsDone: PropTypes.func,
  handleEditChange: PropTypes.func,
  handleUpdateTodo: PropTypes.func,
};
