import React, { Component } from 'react'

export default class OpenedTask extends Component {


  onComplete = () => {
    this.props.onTaskAction("complete", this.props.task.id)
  }

  onOpen = () => {
    this.props.onTaskAction("open", this.props.task.id)
  }

  onDelete = () => {
    this.props.onTaskAction("delete", this.props.task.id)
  }

  onEdit = () => {
    this.props.onTaskAction("edit", this.props.task.id)
  }

  getClassName = () => {
    const className = "openedTask";
    return this.props.task.completed ? `${className} completed` : className;
  }
  render() {
    return (
      <div className={this.getClassName()}>
        <div className="taskTop">
          <i className="fas fa-check-circle action" onClick={this.onComplete}></i>
          <p className="taskTitle">{this.props.task.title}</p>
          <i className="fas fa-compress-alt action" onClick={this.onOpen}></i>
        </div>
        <div className="taskAction">
          <i className="fas fa-trash-alt action" onClick={this.onDelete}></i>
          <p>{this.props.task.created.toLocaleDateString()}</p>
          <div className="flexRow">
            <i class="far fa-save action"></i>
            <i class="far fa-edit action" onClick={this.onEdit} ></i>
          </div>
        </div>
      </div>
    )
  }
}
