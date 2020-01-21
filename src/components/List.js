import React from "react";
import Todo from "./Todo";

export default function List({
  todoList,
  filterType,
  handleTodoDelete,
  handleSaveTodo,
  handleDoneTodo
}) {
  function todoListDis() {
    //get the todos and conditionaly filter and map them out
    let getTodos = todoList;

    if (filterType !== "all") {
      if (filterType === "done") {
        getTodos = getTodos.filter(x => x.done === true);
      }

      if (filterType === "active") {
        getTodos = getTodos.filter(x => x.done === false);
      }
    }

    getTodos = getTodos.map(function(todoItem, i) {
      return (
        <div
          className="todoItem"
          key={todoItem.id}
          style={{ padding: "10px 0px" }}
        >
          <Todo
            todoItem={todoItem}
            handleTodoDelete={handleTodoDelete}
            handleSaveTodo={handleSaveTodo}
            handleDoneTodo={handleDoneTodo}
          />
        </div>
      );
    });

    if (getTodos.length === 0) {
      return <div style={{ fontWeight: "bold" }}>No Todos</div>;
    } else {
      return getTodos;
    }
  }

  return (
    <div className="listC" style={{ padding: "20px" }}>
      {todoListDis()}
    </div>
  );
}
