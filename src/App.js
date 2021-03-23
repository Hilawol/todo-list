import React, { Component } from 'react';
import './App.css';
import CreateTodo from './Component/CreateTodo';
import TaskList from './Component/TaskList';

class App extends Component {

  static id = 1;

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      completed: [],
    }
  }

  componentDidMount = () => {
    console.log("did mount:", this.state);
  }

  componentDidUpdate = () => {
    console.log("did update:", this.state);
  }

  onTaskAction = (action, id) => {
    console.log(action, id);
    switch (action) {
      case "complete":
        this.onCompleteTask(id);
        break;
      case "open":
        this.onOpenTask(id);
        break;
      case "delete":
        this.onDeleteTask(id);
    }
  }

  onDeleteTask = (id) => {
    const tasks = this.state.tasks.filter(t => t.id !== id);
    this.setState({ tasks });
  }

  onOpenTask = (id) => {
    const tasks = this.state.tasks.map(t => {
      if (t.id === id) {
        t.opened = !t.opened;
      }
      return t;
    });
    this.setState({ tasks: tasks });
  }

  onCompleteTask = (id) => {
    console.log("onCompleteTask", id);
    const tasks = this.state.tasks.map(t => {
      if (t.id === id) {
        t.completed = !t.completed;
      }
      return t;
    });
    this.setState({ tasks: tasks });
    console.log(this.state);
  }

  onAdd = (taskTitle) => {
    const task = {
      id: App.id,
      title: taskTitle,
      text: "",
      created: new Date(),
      completed: false,
      opened: false,
    }
    App.id += 1;
    const t = this.state.tasks;
    t.push(task);
    this.setState({ tasks: t });
  }

  getTodoList = () => {
    return this.state.tasks.filter(t => !t.completed);
  }

  getCompletedTasks = () => {
    return this.state.tasks.filter(t => t.completed);
  }

  render() {
    return (
      <div className="App" >
        <CreateTodo onAdd={this.onAdd} onComplete={this.onComplete} />
        <TaskList tasks={this.getTodoList()} title="TO-DO:"
          className="todoList-tasks" onTaskAction={this.onTaskAction} />
        {<TaskList tasks={this.getCompletedTasks()} title="COMPLETED:"
          className="completedList-tasks" onTaskAction={this.onTaskAction} />}
      </div>
    );
  }
}

export default App;
