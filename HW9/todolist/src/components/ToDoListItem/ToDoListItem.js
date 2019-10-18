import React from 'react';

export default class ToDoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.editToDoItem = this.editToDoItem.bind(this);

    }

    removeToDo(id) {
        this.props.removeToDo(id);
    }

    editToDoItem(id) {
        this.props.editToDoItem(id);
    }

    changeState(id) {
        this.props.changeState(id);
    }

    render() {
        let TaskText;
        if (this.props.todo.done === true) {
            TaskText = <span onClick={() => this.changeState(this.props.todo.id)}
                             className="done">{this.props.todo.value}</span>;
        } else {
            TaskText = <span onClick={() => this.changeState(this.props.todo.id)}
                             className="undone">{this.props.todo.value}</span>;
        }
        return (
            <div className="toDoWrapper">
                <button className="removeToDo" onClick={(e) => this.removeToDo(this.props.id)}>Remove</button>
                {TaskText}
                <button className="editToDo" onClick={(e) => this.editToDoItem(this.props.id)}>edit</button>
            </div>
        )
    }
}
