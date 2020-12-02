/* 

What is hooks : Hooks are functions available in react package. Using hooks, you can replace RCC with RFC.
1) useState - helps us to define a state in RFC
2) useEffect - similar to componentDidMount in RCC

*/

import React, { useState, useEffect } from "react";
import axios from "axios";

function DummyHooks() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      setTodos(res.data);
    }
    fetchData();
  });
  return (
    <div>
      <h1>Does it matter</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <div>
            <p>Todo ID : {todo.id}</p>
            <p>Todo Item : {todo.title}</p>
            <p>Status : {todo.completed ? "Done" : "Pending"}</p>
          </div>
          <hr style={{ marginBottom: 20 }} />
        </div>
      ))}
    </div>
  );
}

export default DummyHooks;
