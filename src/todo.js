import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [editMode, setEditMode] = useState(null);

  // Function to add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== "" && inputTime.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, time: inputTime, completed: false },
      ]);
      setInputValue("");
      setInputTime("");
    }
  };

  // Function to update a todo
  const updateTodo = (id, newText, newTime) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, time: newTime } : todo
      )
    );
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (editMode === id) {
      setEditMode(null); 
    }
  };

  // toggle edit mode for a todo
  const toggleEditMode = (id) => {
    setEditMode(editMode === id ? null : id);
  };

  // toggle completion status for a todo
  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // current day and date
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Todo List</h1>
        <p>{formattedDate}</p>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a todo"
        />
        <input
          type="text"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          placeholder="Enter time for todo"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo.id)}
              />
              {editMode === todo.id ? (
                <React.Fragment>
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) =>
                      updateTodo(todo.id, e.target.value, todo.time)
                    }
                    className="todo-input"
                  />
                  <input
                    type="text"
                    value={todo.time}
                    onChange={(e) =>
                      updateTodo(todo.id, todo.text,  e.target.value)
                    }
                    className="todo-input"
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <span
                    className={
                      todo.completed ? "todo-text completed" : "todo-text"
                    }
                  >
                    {todo.text}
                  </span>
                  <span className="todo-time">{"("+todo.time+")"}</span>
                </React.Fragment>
              )}
            </div>
            <div>
              <button
                onClick={() => toggleEditMode(todo.id)}
                className="edit-button"
              >
                {editMode === todo.id ? "Done" : "Edit"}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
