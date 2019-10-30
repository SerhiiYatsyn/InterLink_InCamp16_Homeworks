import React from 'react'
import '../ToDoInput/ToDoInput.css'
import {BrowserRouter} from "react-router-dom";
import ToDoList from "../ToDoList/ToDoList";

export default class ToDoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ""};
        this.handleChange = this.handleChange.bind(this);
        this.addToDo = this.addToDo.bind(this);
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    onKeyPress = e => {
        if (e.key === 'Enter') {
            this.addToDo(e.target.value)
        }
    };

    addToDo(toDoText) {
        if (toDoText.length > 0) {
            let changedList = this.props.toDoItems;
            if (changedList.length !== 0)
                changedList.push({
                    id: (1 + this.props.toDoItems[this.props.toDoItems.length - 1].id),
                    text: toDoText,
                    done: false,
                    hidden: false
                });
            else changedList.push({
                id: 0,
                text: toDoText,
                done: false,
                hidden: false
            });
            this.props.updateList(changedList);
        }
        this.setState({text: ""});
        document.getElementById('toDoEl').value = "";
    }

    render() {
        return (
            <div className="form">
                <input placeholder="Введіть нову справу..." id="toDoEl" type="text"
                       name="titleOfTask" onChange={this.handleChange} onKeyPress={this.onKeyPress}/>
                <button className="addBtn" onClick={() => {
                    this.addToDo(this.state.text);
                }}>Добавить
                </button>
                <button
                    className={this.props.editMode ? "editConfirmBtn ConfirmBtnActive" : "editConfirmBtn"}
                    onClick={(e) => {
                        this.props.updateEditMode(!this.props.editMode)
                    }
                    }>Редагувати
                </button>
            </div>

        )
    }
}
