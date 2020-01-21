import React, { useState, useEffect } from "react";
import uuidv4 from "uuid/v4";
import AddNew from "./components/AddNew";
import Filter from "./components/Filter";
import List from "./components/List";

//Local Storage Key
const LOCAL_STORAGE_KEY = "todoApp.todos";

/*
const fakeData = ([
  {id: 1, name:"Todo 1", done: false}, 
  {id: 2, name:"Todo 2", done: false},
  {id: 3, name:"Todo 3", done: false}, 
]);
*/

function App() {
  //Initialize State
  var [todoList, setTodoList] = useState([]);
  var [doneListTotal, setDoneListTotal] = useState(0);
  var [activeListTotal, setActiveListTotal] = useState(0);
  var [filterType, setFilterType] = useState("All");

  //On Load Check local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodoList(storedTodos);
    }
  }, []);

  //On Update of Todos Save to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));

    updateListCounters();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList]);

  //Update Done List
  function updateListCounters() {
    //New Copy
    let newList = [...todoList];

    //Filter out done
    newList = newList.filter(x => x.done === true);

    //Set Done Counter
    setDoneListTotal(newList.length);

    //Calculate Active counter
    let activeCounter = todoList.length - newList.length;

    //Set Active counter
    setActiveListTotal(activeCounter);
  }

  function handleAddTodo(newTodo) {
    setTodoList(prevTodos => {
      return [{ id: uuidv4(), name: newTodo, done: false }, ...prevTodos];
    });
  }

  function handleTodoDelete(itemId) {
    //Copy list
    let newList = [...todoList];

    //Filter out Item
    newList = newList.filter(x => {
      return x.id.toString() !== itemId.toString();
    });

    //Update List
    setTodoList(newList);
  }

  function handleSaveTodo(newVal, saveId) {
    //Copy list
    let newList = [...todoList];

    newList.find(x => x.id === saveId).name = newVal;

    //Update List
    setTodoList(newList);
  }

  function handleDoneTodo(val, doneId) {
    //Copy list
    let newList = [...todoList];

    newList.find(x => x.id === doneId).done = val;

    //Update Todos
    setTodoList(newList);

    //Update List Counters
    updateListCounters();
  }

  function handleFilter(getFilterType) {
    setFilterType(getFilterType);
  }

  return (
    <div
      className="todoListC"
      style={{ margin: "0px auto", width: "50%", textAlign: "center" }}
    >
      <h1>Todo List</h1>

      <AddNew handleAddTodo={handleAddTodo} />

      <Filter
        todoList={todoList}
        doneListTotal={doneListTotal}
        activeListTotal={activeListTotal}
        handleFilter={handleFilter}
      />

      <List
        todoList={todoList}
        filterType={filterType}
        handleTodoDelete={handleTodoDelete}
        handleSaveTodo={handleSaveTodo}
        handleDoneTodo={handleDoneTodo}
      />
    </div>
  );
}

export default App;
