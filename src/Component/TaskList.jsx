import React, { Component } from 'react'
import ColapsedTask from './ColapsedTask'
import OpenedTask from './OpenedTask';

export default class TaskList extends Component {
  render() {
    return (
      <div className="taskList">
        <h2>{this.props.title}</h2>
        <div className={this.props.className}>
          {this.props.tasks.map(t => {
            return t.opened ? <OpenedTask task={t} key={t.id} onTaskAction={this.props.onTaskAction} /> :
              <ColapsedTask task={t} key={t.id} onTaskAction={this.props.onTaskAction} />;
          })}
        </div>
      </div>
    )
  }
}
