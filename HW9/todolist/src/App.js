import React from 'react';
import './App.css';


var todoItems = [];
todoItems.push({index: 1, value: "learn react", done: false});
todoItems.push({index: 2, value: "Go shopping", done: true});
todoItems.push({index: 3, value: "buy flowers", done: true});

class ToDoHeader extends React.Component{
  render(){
    return(
        <h1>ToDoApp!</h1>
    )
  }
}

class ToDoList extends React.Component {
  constructor(props){
    super(props);
    this.state =  {
      toDoItems: [
        {id: 1, value: "learn react", done: false},
        {id: 2, value: "Go shopping", done: true},
        {id: 3, value: "buy flowers", done: true}
      ]
    };
  }


  render () {
    var items = this.state.toDoItems.map((item, index) => {
      return (
          <ToDoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
        <ul className="list-group"> {items} </ul>
    );
  }
}

class ToDoListItem extends React.Component{
  constructor(props){
    super(props);
  }
  removeToDo(id){
    this.props.removeToDo(id);
  }
  render() {
    return(
        <div className="toDoWrapper">
          <button className="removeToDo" onClick={(e) => this.removeToDo(this.props.id)}>Remove </button>{this.props.todo.value}
        </div>
    )
  }
}
class App extends React.Component{
  constructor(props){
    super(props);
    this.state =  {
      toDoItems: [
        {id: 1, value: "learn react", done: false},
        {id: 2, value: "Go shopping", done: true},
        {id: 3, value: "buy flowers", done: true}
      ]
    };
    this.addToDo = this.addToDo.bind(this);
    this.removeToDo = this.removeToDo.bind(this);
  }
  addToDo(toDoText){
    let todos = this.state.toDoItems.slice();
    todos.push({id:this.state.toDoItems.length+1, value: toDoText});
    this.setState({
      toDoItems: todos
    });
    console.log(this.state);
  }
  removeToDo(id){
    console.log(this.state);
    this.setState({
      toDoItems: this.state.toDoItems.filter((todo,index) => todo.id !== id)
    });
    console.log(this.state);

  }

  render() {
    return(
        <div id="toDoApp">
          <ToDoHeader/>
          <ToDoInput toDoText="" addToDo={this.addToDo}/>
          <ul>
            {
              this.state.toDoItems.map((todo) => {
                return <ToDoListItem todo={todo} key={todo.id} id={todo.id} removeToDo={this.removeToDo}/>
              })
            }
          </ul>
        </div>
    )
  }
}
class ToDoInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: ""};
this.handleChange = this.handleChange.bind(this);
this.addToDo = this.addToDo.bind(this);
  }
  handleChange(e){
    this.setState({value:e.target.value});
    console.log("change here");
  }
  addToDo(todo) {
    if(todo.length > 0) {
      this.props.addToDo(todo);
    }
    this.setState({value: ""});
    console.log("ToDO: ", todo)
  }

  render() {
    return(
        <div className="inp">
          <input type="text" name="text"  onChange={this.handleChange}/>
          <button className="" onClick={() => this.addToDo(this.state.value)}>+</button>
        </div>
    )
  }
}
export default App;
