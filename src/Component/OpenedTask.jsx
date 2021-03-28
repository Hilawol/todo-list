import React, { Component } from 'react'

export default class OpenedTask extends Component {
  state = {
    id: "",
    editMode: false,
    edit: {
      title: "",
      text: "",
    }
  };

  componentDidMount = () => {
    this.setState({ id: this.props.task.id });
  }

  onComplete = () => {
    this.props.onTaskAction("complete", this.state.id)
  }

  onOpen = () => {
    this.props.onTaskAction("open", this.state.id)
  }

  onDelete = () => {
    this.props.onTaskAction("delete", this.state.id)
  }

  onEdit = () => {
    this.props.onTaskAction("edit", this.state.id)
    console.log("edit:", this.props.task)
    this.setState({
      editMode: true,
      edit: { title: this.props.task.title, text: this.props.task.text }
    })
  }

  validEdit = () => {//TODO: add input validation on edit
    return true;
  }

  onSave = () => {
    if (this.validEdit) {
      this.props.onTaskAction("save", this.state);
    }
    this.setState({ editMode: false });
  }

  onCancel = () => {
    this.setState({ editMode: false });
  }

  inputHandler = (e) => {
    const edit = this.state.edit;
    edit[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ edit: { ...edit } });
    console.log(this.state.edit);
  }

  getClassName = () => {
    const className = "openedTask";
    return this.props.task.completed ? `${className} completed` : className;
  }

  render() {
    const editMode = <div className={this.getClassName()}>
      <div className="taskTop">
        <i className="fas fa-check-circle action" onClick={this.onComplete}></i>
        <input type="text" className="taskTitleInput" name="title" value={this.state.edit.title} onChange={this.inputHandler} />
        <i className="fas fa-compress-alt action" onClick={this.onOpen}></i>
      </div>
      <textarea rows="8" cols="50" name="text" onChange={this.inputHandler} value={this.state.edit.text}></textarea>
      <div className="taskAction">
        <i className="fas fa-trash-alt action" onClick={this.onDelete}></i>
        <p>{this.props.task.created.toLocaleDateString()}</p>
        <div className="flexRow">
          <i className="far fa-save action" onClick={this.onSave}></i>
          <i className="fas fa-undo action" onClick={this.onCancel}></i>
        </div>
      </div>
    </div>;

    const normalMode = <div className={this.getClassName()}>
      <div className="taskTop">
        <i className="fas fa-check-circle action" onClick={this.onComplete}></i>
        <p className="taskTitle">{this.props.task.title}</p>
        <i className="fas fa-compress-alt action" onClick={this.onOpen}></i>
      </div>
      <p>{this.props.task.text}</p>
      <div className="taskAction">
        <i className="fas fa-trash-alt action" onClick={this.onDelete}></i>
        <p>{this.props.task.created.toLocaleDateString()}</p>
        <div className="flexRow">
          <i className="far fa-edit action" onClick={this.onEdit} ></i>
        </div>
      </div>
    </div>

    return ((this.state.editMode) ? editMode : normalMode)
  }
}
