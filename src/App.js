 
import { useEffect, useState } from 'react';
import './App.css';
import { CiTrash } from "react-icons/ci";

function App() {

  const [todos,setTodos] = useState([]);
  const [action, setAction] = useState('');
  useEffect(()=>{
    fetch('http://localhost:8000/todos')
      .then(res=>res.json())
      .then(data=>setTodos(data));
  },[]);

 
  const handleTodo = () =>{
    const newTodo ={action}
    fetch('http://localhost:8000/todos',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(newTodo)
    }).then(()=>{
      setTodos(prev=>[...prev, newTodo]);
    }) ;
   }
 const handleDelete = (id) =>{
  fetch('http://localhost:8000/todos/' + id,{
    method:"DELETE"
  }).then( 
    ()=>{
      const updatedTodos = todos.filter((item)=> item.id !== id);
      console.log(updatedTodos);
      setTodos(updatedTodos);

    }   
  );
 }
 
  
  return (
    <div className="App">
        <div className="todo-app">
          <div className="todo-input">
            <input value={action} type="text" placeholder='Type your todo...' onChange={(e)=>setAction(e.target.value)}/>
            <button onClick={handleTodo}>Add Todo</button>
          </div>
          
          <div className="todo-app-display"> 
            <ul>
              {
                todos.length ?
                todos.map(todo=>(
                  <li key={todo.id}><button onClick={()=>{handleDelete(todo.id)}} key={todo.id}><CiTrash /></button>{todo.action}</li>
                )) 
              : <p>No todos</p>}
            </ul>
          </div>
        </div>
    </div>
  );
}

export default App;
