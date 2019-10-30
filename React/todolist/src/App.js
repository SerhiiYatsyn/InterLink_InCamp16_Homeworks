import React from 'react';
import './App.css';
import ToDoList from "./components/ToDoList/ToDoList";
import ToDoHeader from '../src/components/ToDoHeader/ToDoHeader'
import ToDoInput from '../src/components/ToDoInput/ToDoInput'
import createBrowserHistory from 'history/createBrowserHistory'
// import {Redirect, Router/*, Switch*/} from "react-router"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {/*Route,*/ NavLink} from "react-router-dom"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [
                [
                    {id: 1, text: "Learn React", done: true, hidden: false},
                    {id: 2, text: "Make ToDoList", done: true, hidden: false},
                    {id: 3, text: "Go on lesson", done: false, hidden: false},
                ],
                [
                    {id: 1, text: "React", done: true, hidden: false},
                    {id: 2, text: "ToDoList", done: false, hidden: false},
                ]],
            namesOfLists: ["first", "second"],
            editMode: false,
            tempForEdit: "",
            currentListId: 0,

        };
        this.editToDoItem = this.editToDoItem.bind(this);
        this.updateList = this.updateList.bind(this);
    }

    editToDoItem(id) {
        console.log(id);
    }

    updateEditMode = (value, todo) => {
        debugger;
        this.setState({editMode: value});
        if (todo !== undefined)
            this.setState({tempForEdit: todo.id});
        if (todo === undefined) {
            let idForEdit = this.state.tempForEdit;
            this.state.lists[this.state.currentListId].map(function (el) {
                if (idForEdit === el.id) {
                    el.text = document.getElementById('toDoEl').value;
                    document.getElementById('toDoEl').value = "";
                }
                return el;
            });
            this.setState({lists: this.state.lists});
        }
    };

    tasksFilter(chosen) {
        let filteredToDos = this.state.lists[this.state.currentListId];
        filteredToDos.forEach(task => task.hidden = false);
        switch (chosen) {
            case "Всі справи":
                break;
            case "Виконані":
                filteredToDos.forEach(task => {
                    if (!task.done) {
                        task.hidden = true;
                    }
                });
                break;
            case "Не виконані":
                filteredToDos.forEach(task => {
                    if (task.done) {
                        task.hidden = true;
                    }
                });
                break;
            default:
                break;
        }
        let changedLists = this.state.lists;
        changedLists[this.state.currentListId] = filteredToDos;
        this.setState({lists: changedLists});
    }

    updateList(tasks) {
        let allLists = this.state.lists;
        allLists[this.state.currentListId] = tasks;
        this.setState({lists: allLists});
    }

    set = (index) => {
        this.setState({currentListId: index});
        document.getElementById('filter').value = "Всі справи";
    };

    getDoneTasks() {
        return this.state.lists[this.state.currentListId].reduce(function (sum, current) {
            if (current.done) return sum + 1;
            return sum;
        }, 0)
    }

    addNewList() {
        if (document.getElementById('listName').value.length > 0) {
            this.state.lists.push([]);
            this.state.namesOfLists.push(document.getElementById('listName').value);
            this.setState({lists: this.state.lists, namesOfLists: this.state.namesOfLists});
            document.getElementById('listName').value = "";
            console.log(this.state.lists)
        }
    }

    render() {
        return (
            <Router>
                <div id="toDoApp">
                    <div id="lists">
                        <input type="text" id='listName'/>
                        <button onClick={() => this.addNewList()}>AddList</button>
                        {this.state.lists.map((list, index) => {
                            {
                                return <NavLink onClick={() => this.set(index)} exact to={`/List/${index}`} key={index}
                                                activeClassName="active_link">{this.state.namesOfLists[index]}</NavLink>
                            }
                        })
                        }
                    </div>


                    <div className="wrapper">
                        <div className="header">
                            <h1>Список справ</h1>
                            <ToDoInput toDoItems={this.state.lists[this.state.currentListId]}
                                       updateList={this.updateList}
                                       toDoText=""
                                       addToDo={this.addToDo} editMode={this.state.editMode}
                                       updateEditMode={this.updateEditMode}/>
                            <div className="container">
                                <select id="filter" onChange={(e) => this.tasksFilter(e.target.value)}>
                                    <option selected>Всі справи</option>
                                    <option>Виконані</option>
                                    <option>Не виконані</option>
                                </select>
                                <div className="counters">
                                    <p>Всього справ: <span
                                        id="all">{this.state.lists[this.state.currentListId].length}</span>
                                    </p>
                                    <p>Виконано справ: <span id="done">{this.getDoneTasks()}</span></p>
                                    <p>Не виконано справ: <span
                                        id="undone">{this.state.lists[this.state.currentListId].length - this.getDoneTasks()}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/*<Route path="/header" exact component={ToDoHeader}></Route>*/}
                        {/*<Route path="/notFound" exact component={ToDoHeader}></Route>*/}
                        <Switch>
                            <Route path="/List/:id" exact
                                   render={(props) => <ToDoList
                                       id={props.match.params.id}
                                       toDoItems={this.state.lists[props.match.params.id]}
                                       updateList={this.updateList}
                                       updateEditMode={this.updateEditMode}/>}>
                            </Route>

                        </Switch>
                    </div>
                </div>
            </Router>

        )

    }


}


export default App;
