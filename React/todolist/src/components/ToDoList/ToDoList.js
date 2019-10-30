import React from 'react'
import ToDoListItem from "../ToDoListItem/ToDoListItem";
import {Redirect, useParams} from "react-router";

export default class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listID: props.id,
            toDoItems: this.props.toDoItems
            // lastID: this.props.toDoItems[this.props.toDoItems.length - 1].id | 0
        };

        this.toggle = this.toggle.bind(this);
        this.removeToDo = this.removeToDo.bind(this);
        this.updateEditMode = this.updateEditMode.bind(this);
    }


    componentDidUpdate() {
        console.log(this.state)
        if (this.state.listID !== this.props.id) this.setState({
            listID: this.props.id,
            toDoItems: this.props.toDoItems, lastID: this.props.toDoItems===undefined?this.props.toDoItems[this.props.toDoItems.length - 1].id:0
        }); // без if будет бесконечный цикл
    }

    getListId() {
        this.props.getListId(this.state.listID)
    }

    updateList(tasks) {
        this.setState({toDoItems: tasks});
        let {id} = useParams();
        console.log(id)
    }

    toggle(TaskId) {
        let changedToDoItems = this.state.toDoItems.map(function (task) {
            if (TaskId === task.id) task.done = !task.done;
            return task;
        });
        console.log(changedToDoItems)
        this.setState({toDoItems: changedToDoItems});
        this.props.updateList(changedToDoItems);
    }

    updateEditMode(reserved, todo) {
        this.props.updateEditMode(reserved, todo)
    }

    removeToDo(id) {
        let changedList = this.state.toDoItems.filter((todo) => todo.id !== id);
        this.setState({toDoItems: changedList});
        this.props.updateList(changedList);
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.toDoItems.map((todo) => {
                            return <ToDoListItem todo={todo} key={todo.id} id={todo.id}
                                                 updateEditMode={this.updateEditMode} removeToDo={this.removeToDo}
                                                 editToDoItem={this.editToDoItem} toggle={this.toggle}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}
