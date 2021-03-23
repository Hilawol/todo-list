import React, { Component } from 'react'

export default class ColapsedTask extends Component {

  onComplete = () => {
    this.props.onTaskAction("complete", this.props.task.id)
  }

  onOpen = () => {
    this.props.onTaskAction("open", this.props.task.id)
  }

  getClassName = () => {
    const className = "colapsedTask";
    return this.props.task.completed ? `${className} completed` : className;
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <i className="fas fa-check-circle action" onClick={this.onComplete}></i>
        <p className="taskTitle">{this.props.task.title}</p>
        <i className="fas fa-expand-alt action" onClick={this.onOpen}></i>
      </div>
    )
  }
}
