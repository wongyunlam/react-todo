import TodoItem from "./TodoItem";
import useTodos from "./useTodos";

function App() {
  const {
    todos,
    handleBtnClick,
    handleDeleteTodo,
    handleToggleIsDone,
    value,
    handleChange,
  } = useTodos();

  return (
    <div className="App">
      <input
        type="text"
        placeholder="todo"
        value={value}
        onChange={handleChange}
      />
      <button onClick={handleBtnClick}>Add todo</button>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          content={todo.content}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleIsDone={handleToggleIsDone}
        />
      ))}
    </div>
  );
}

export default App;
