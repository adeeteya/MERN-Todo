import { useEffect, useState } from 'react';
import './styles.css'
import TodoCard from './TodoCard';

function App() {

  const [todoInputText, setTodoInputText] = useState('');

  const [todoList, setTodoList] = useState([]);

  useEffect(()=>{
    async function getTodos(){
      const response=await fetch("http://localhost:3000/todos/");
      const jsonResponse=await response.json();
      setTodoList(jsonResponse);
    }
    getTodos();
  },[todoList]);

  async function onTodoToggle(todoItem) {
    const response=await fetch(`http://localhost:3000/todos/${todoItem._id}`,{method:"PATCH",headers: { 'Content-Type': 'application/json' },body:JSON.stringify({ 'name': todoItem.name, 'isCompleted':!todoItem.isCompleted })});
    if(response.ok){
      setTodoList([]);
    }
    else{
      alert("Error Occurred Please Try Again!");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response=await fetch(`http://localhost:3000/todos/`,{method:"POST",headers: { 'Content-Type': 'application/json' },body:JSON.stringify({ 'name': todoInputText, 'isCompleted': false })});
    if(response.ok){
      setTodoList([]);
      setTodoInputText('');
    }
    else{
      alert("Error Occurred Please Try Again!");
    }
  }

  async function removeTodo(_id){
    const response=await fetch(`http://localhost:3000/todos/${_id}`,{method:"DELETE"});
    if(response.ok){
      setTodoList([]);
    }
  }

  return (
    <>
      <h1>Todo List Application</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add a Todo" value={todoInputText} onChange={(e) => setTodoInputText(e.target.value)} className='add-todo-input' required />
        <button type="submit" className='add-todo-button' >Add</button>
      </form>
      {todoList.length==0 &&"No Todos Added"}
      {todoList.map((todoItem) => {
            return (<TodoCard key={todoItem._id} todoItem={todoItem} onTodoToggle={() => onTodoToggle(todoItem)} removeTodo={()=>removeTodo(todoItem._id)} />);
          })}
    </>
  )
}

export default App;
