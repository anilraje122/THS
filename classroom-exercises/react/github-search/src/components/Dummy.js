import React, { Component } from "react";
import axios from "axios";

export default class Dummy extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }
  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    this.setState({
      todos: res.data,
    });
  }
  render() {
    return (
      <div>
        <h1>Does it matter</h1>
        {this.state.todos.map((todo) => (
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
}
