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

  updateLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  updateState = (tasks) => {
    this.setState({ tasks: [...tasks] });
    this.updateLocalStorage(tasks);
  }
  componentDidMount = () => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      console.log("found local storage");
      this.setState({ tasks: JSON.parse(tasks) });
    }
    else {
      console.log("did not found local storage");
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }
    console.log("did mount:", this.state);
  }

  componentDidUpdate = () => {
    console.log("did update:", this.state);
  }

  onTaskAction = (action, data) => {
    console.log(action, data);
    switch (action) {
      case "complete":
        this.onCompleteTask(data);
        break;
      case "open":
        this.onOpenTask(data);
        break;
      case "delete":
        this.onDeleteTask(data);
        break;
      case "save":
        this.onSave(data);
        break;
      default:

    }
  }

  onSave = (data) => {
    console.log(data);
    const tasks = this.state.tasks.map(t => {
      if (t.id === data.id) {
        console.log(t)
        t.title = data.edit.title;
        t.text = data.edit.text;
      }
      console.log(t)
      return t;
    })
    this.updateState(tasks);
    // this.setState({ tasks })
    // this.updateLocalStorage();
  }

  onDeleteTask = (id) => {
    const tasks = this.state.tasks.filter(t => t.id !== id);
    this.updateState(tasks);
    // this.setState({ tasks });
    // this.updateLocalStorage();
  }

  onOpenTask = (id) => {
    const tasks = this.state.tasks.map(t => {
      if (t.id === id) {
        t.opened = !t.opened;
      }
      return t;
    });
    // this.setState({ tasks: tasks });
    this.updateState(tasks);
  }

  onCompleteTask = (id) => {
    console.log("onCompleteTask", id);
    const tasks = this.state.tasks.map(t => {
      if (t.id === id) {
        t.completed = !t.completed;
      }
      return t;
    });
    // this.setState({ tasks: tasks });
    this.updateState(tasks);
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
    // this.setState({ tasks: t });
    this.updateState(t);
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
