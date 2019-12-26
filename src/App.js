import React, { useState } from "react";
import "./Style.css";

const App = () => {
  const [todo, setTodo] = useState([
    {
      text: "Buy Milk",
      done: false,
      slide: true
    }
  ]);

  const ToDoList = () => {
    if (todo.length !== 0) {
      return (
        <>
          {todo.map((itm, i) => (
            <ul
              className={itm.slide ? "todo-list slide-left" : "todo-list"}
              onAnimationEnd={e => {
                todo[i].slide = false;
                setTodo([...todo]);
              }}
              key={i}
            >
              <li>
                <input
                  id={`item_${i}`}
                  type="checkbox"
                  className="todo-checkbox"
                  name={itm.text}
                  value={itm.text}
                  onChange={() => {
                    if (!todo[i].done) {
                      todo[i].done = true;
                      setTodo([...todo]);
                    } else {
                      todo[i].done = false;
                      setTodo([...todo]);
                    }
                  }}
                  defaultChecked={itm.done}
                />
                <label htmlFor={`item_${i}`}></label>
                <span className="todo-text">{itm.text}</span>
                <button className="btn delete" onClick={() => removeToDo(i)}>
                  x
                </button>
              </li>
            </ul>
          ))}
        </>
      );
    } else {
      return null;
    }
  };

  const addToDo = e => {
    e.preventDefault();
    if (document.getElementById("todo").value !== "") {
      let _todo = {
        text: document.getElementById("todo").value,
        done: false,
        slide: true
      };
      setTodo([...todo, _todo]);
      document.getElementById("todo").value = "";
    }
  };

  const removeToDo = i => {
    if (i !== -1) {
      todo.splice(i, 1);
      setTodo([...todo]);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <form onSubmit={addToDo}>
        <input
          type="text"
          id="todo"
          aria-describedby="todo"
          placeholder="Add some text here"
          autoComplete="off"
        />
        <button type="submit" className="btn btn-add">
          +
        </button>
      </form>
      <ToDoList className="list" />
    </div>
  );
};

export default App;
