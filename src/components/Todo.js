import React, { useState } from "react";

export default function TodoMain({
  todoItem,
  handleTodoDelete,
  handleSaveTodo,
  handleDoneTodo
}) {
  var [editTodoValue, setEditTodoValue] = useState(todoItem.name);
  var [editing, setEditing] = useState(false);

  //Manage views
  let editView = {};
  let mainView = {};

  if (editing) {
    mainView.display = "none";
  } else {
    editView.display = "none";
  }

  function toggleView() {
    editing = !editing;
    setEditing(editing);
  }

  function deleteTodo(e) {
    e.preventDefault();
    handleTodoDelete(e.target.id);
  }

  function saveEditTodo(e) {
    e.preventDefault();

    toggleView();

    let newValue = editTodoValue;
    let todoId = e.target.id;
    handleSaveTodo(newValue, todoId);
  }

  function updateTodo(e) {
    setEditTodoValue(e.target.value);
  }

  function doneTodo(e) {
    let curValue = e.target.checked;
    let todoId = e.target.id;
    handleDoneTodo(curValue, todoId);
  }

  return (
    <>
      <div className="todoMain" style={mainView}>
        <label style={{ float: "left" }}>
          <input
            id={todoItem.id}
            type="checkbox"
            checked={todoItem.done}
            onChange={doneTodo}
          />
          {todoItem.name}
        </label>
        <div style={{ float: "right" }}>
          <button onClick={toggleView}>Edit</button>
          <button id={todoItem.id} onClick={deleteTodo}>
            Delete
          </button>
        </div>
        <br />
      </div>

      <div className="todo" style={editView}>
        <input
          type="text"
          value={editTodoValue}
          onChange={updateTodo}
          style={{ float: "left", width: "calc(100% - 120px)" }}
        />
        <div style={{ float: "right" }}>
          <button id={todoItem.id} onClick={saveEditTodo}>
            Save
          </button>
          <button onClick={toggleView}>Cancel</button>
        </div>
      </div>
    </>
  );
}
