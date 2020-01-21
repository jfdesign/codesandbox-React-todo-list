import React from "react";

export default function Filter({
  todoList,
  handleFilter,
  doneListTotal,
  activeListTotal
}) {
  function filter(fType) {
    handleFilter(fType);
  }

  return (
    <div className="filterC">
      <br />
      Filter:&nbsp;
      <button onClick={() => filter("all")}>All({todoList.length})</button> /
      <button onClick={() => filter("active")}>
        Active({activeListTotal})
      </button>{" "}
      /<button onClick={() => filter("done")}>Done({doneListTotal})</button>
      <br />
    </div>
  );
}
