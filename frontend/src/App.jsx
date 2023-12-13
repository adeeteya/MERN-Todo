import { useEffect, useState } from 'react';
import './styles.css'
import TodoCard from './TodoCard';

function App() {

  const [todoInputText, setTodoInputText] = useState('');

  const [todoList, setTodoList] = useState([]);

  useEffect(()=>{
    let todoItems=localStorage.getItem('todoList');
    console.log(todoItems);
    if(todoItems!=null){
      setTodoList(JSON.parse(todoItems));
    }
  },[]);

  function onTodoToggle(index) {
    let newTodoList=todoList;
    for(let i=0;i<newTodoList.length;i++){
      if(i==index){
        newTodoList[i]['isCompleted']=!newTodoList[i]['isCompleted'];
        console.log(newTodoList[i]);
      }
    }
    setTodoList(newTodoList);
    localStorage.setItem('todoList',JSON.stringify(newTodoList));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTodoList([...todoList, { 'name': todoInputText, 'isCompleted': false }]);
    localStorage.setItem('todoList',JSON.stringify([...todoList, { 'name': todoInputText, 'isCompleted': false }]));
    setTodoInputText('');
  }

  function removeTodo(index){
    let newTodoList=todoList.filter((todoItem,i)=>i!=index);
    setTodoList(newTodoList);
    localStorage.setItem('todoList',JSON.stringify(newTodoList));
  }

  return (
    <>
      <h1>Todo List Application</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add a Todo" value={todoInputText} onChange={(e) => setTodoInputText(e.target.value)} className='add-todo-input' required />
        <button type="submit" className='add-todo-button' >Add</button>
      </form>
      {todoList.length==0 &&"No Todos Added"}
      {todoList.map((todoItem, index) => {
            return (<TodoCard key={`${index} ${todoItem.name}`} todoItem={todoItem} onTodoToggle={() => onTodoToggle(index)} removeTodo={()=>removeTodo(index)} />);
          })}
    </>
  )
}

export default App;
