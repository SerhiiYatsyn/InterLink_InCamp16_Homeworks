import React from 'react';
import './App.css';
// import ToDoListItem from 'src/components/ToDoListItem/ToDoListItem'

class ToDoHeader extends React.Component {
    render() {
        return (
            <h1>ToDoApp!</h1>
        )
    }
}

class ToDoListItem extends React.Component {
    constructor(props) {
        super(props);
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
                <button className="editToDo" onClick={(e) => this.editToDoItem(this.props.id)}>Edit</button>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoItems: [
                {id: 1, value: "Learn React", done: true},
                {id: 2, value: "Make ToDoList", done: true},
                {id: 3, value: "Go on lesson", done: false}
            ],
            lastId: 3
        };
        this.addToDo = this.addToDo.bind(this);
        this.removeToDo = this.removeToDo.bind(this);
        this.editToDoItem = this.editToDoItem.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    addToDo(toDoText) {
        let todos = this.state.toDoItems.slice();
        todos.push({id: ++this.state.lastId, value: toDoText, done: false});
        this.setState({
            toDoItems: todos,
            lastId: this.state.lastId,
        });
    }

    removeToDo(id) {
        this.setState({
            toDoItems: this.state.toDoItems.filter((todo, index) => todo.id !== id)
        });

    }

    editToDoItem(id) {
        console.log(id);
    }

    changeState(TaskId) {
        let todoItems = this.state.toDoItems.map(function (iterator) {
            if (TaskId === iterator.id) iterator.done = !iterator.done;
            return iterator;
        });
        this.setState({
            toDoItems: todoItems
        });
    }

    render() {
        return (
            <div id="toDoApp">
                <ToDoHeader/>
                <ToDoInput toDoText="" addToDo={this.addToDo}/>
                <ul>
                    {
                        this.state.toDoItems.map((todo) => {
                            return <ToDoListItem todo={todo} key={todo.id} id={todo.id} removeToDo={this.removeToDo}
                                                 editToDoItem={this.editToDoItem} changeState={this.changeState}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}

class ToDoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
        this.addToDo = this.addToDo.bind(this);

    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    onKeyPress = e => {
        if (e.key === 'Enter') {
            this.addToDo(e.target.value)
        }
    };

    addToDo(todo) {
        if (todo.length > 0) {
            this.props.addToDo(todo);
        }
        this.setState({value: ""});
        document.getElementById('addTask').value = "";
    }

    render() {
        return (
            <div className="inp">
                <input id="addTask" type="text" name="text" onChange={this.handleChange} onKeyPress={this.onKeyPress}/>
                <button className="" onClick={() => {
                    this.addToDo(this.state.value);
                }}>+
                </button>
            </div>
        )
    }
}

export default App;
