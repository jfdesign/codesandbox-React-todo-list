import React, { useRef } from "react";

export default function AddNew({ handleAddTodo }) {
  const todoValRef = useRef();

  function addTodo(e) {
    e.preventDefault();

    let todoValue = todoValRef.current.value;

    if (todoValue !== "") {
      handleAddTodo(todoValue);
      todoValRef.current.value = null;
    }
  }

  return (
    <form className="addC" onSubmit={addTodo} style={{ width: "100%" }}>
      <input
        ref={todoValRef}
        type="text"
        placeholder="Add a new item"
        style={{ width: "calc(100% - 90px)" }}
      />
      <input type="submit" value="Add" style={{ width: "80px" }} />
    </form>
  );
}
