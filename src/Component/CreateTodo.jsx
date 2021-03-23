import React, { Component } from 'react'

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.taskInput = React.createRef();
  }

  onAdd = () => {
    if (this.taskInput.current.value !== "") {
      this.props.onAdd(this.taskInput.current.value)
      this.taskInput.current.value = "";
    }
  }

  render() {
    return (
      <div className="createTask">
        <input ref={this.taskInput} className="newTaskInput" placeholder="Create new task..."></input>
        <button className="newTaskBtn" onClick={this.onAdd}>+</button>
      </div>
    )
  }
}
