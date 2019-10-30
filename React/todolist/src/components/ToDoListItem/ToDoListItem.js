import React from 'react';
import '../ToDoListItem/ToDoListItem.css'

export default class ToDoListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    removeToDo(e, id) {
        this.props.removeToDo(id);
        console.log(e);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    editToDoItem(e, todo) {
        console.log("111 " + todo);
        let reversed = !this.props.editMode;
        this.props.updateEditMode(reversed, todo);
        document.getElementById('toDoEl').value = todo.text;
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    toggle(e, id) {
        console.log(this.props);
        this.props.toggle(id);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    checkOrHideItem() {
        let classes = this.props.todo.done ? 'checked' : '';
        classes += this.props.todo.hidden ? ' hidden' : '';
        return classes;
    }

    render() {
        return (
            <li key={this.props.todo.id} className={this.checkOrHideItem()}
                onClick={(e) => this.toggle(e, this.props.todo.id)}>
                <span className="editBtn" onClick={(e) => this.editToDoItem(e, this.props.todo)}>EDIT</span>
                <span>{this.props.todo.text}</span>
                <span className="close" onClick={(e) => this.removeToDo(e, this.props.id)}>X</span>
            </li>
        )
    }
};
