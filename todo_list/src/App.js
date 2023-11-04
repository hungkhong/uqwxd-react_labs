import React, {useState,useEffect} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  
  useEffect(()=> {
      const json = localStorage.getItem("todos");
      const loadedTodos = JSON.parse(json);
      if (loadedTodos) {
          setTodos(loadedTodos);
      }
  },[]);

  useEffect(()=>{
      if (todos.length > 0) {
          const json = JSON.stringify(todos);
          localStorage.setItem("todos",json);
      }
  },[todos]);

  // Add the handlesubmit code here
  function handlesubmit(e){
      e.preventDefault();

      let todo = document.getElementById('todoAdd').value
      const newTodo = {
          id: new Date().getTime(),
          text: todo.trim(),
          completed: false,
      };
      if (newTodo.text.length > 0) {
          setTodos([...todos].concat(newTodo));
      } else {
          alert("Enter valid task");
      }
      document.getElementById('todoAdd').value = ""
  }
  
  // Add the deleteToDo code here
  function deleteTodo(id){
      //alert(id);
      let updatedTodos = [...todos].filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
  }
  
  // Add the toggleComplete code here
  function toggleComplete(id){
      //alert(id);
      let updateTodos = [...todos].map((todo)=> {
          if (todo.id === id){
              todo.completed = !todo.completed;
          }
          return todo;
      })
      setTodos(updateTodos);
  }
  
  // Add the submitEdits code here
  function submitEdits(newtodo){
    //   alert(newtodo.id);
      const updatedTodos = [...todos].map((todo)=>{
          if (todo.id === newtodo.id) {
              todo.text = document.getElementById(newtodo.id).value;
            //   todo.text = newtodo.text;
          }
          return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
  }

  
return(
    <div id="todo-list">
        <h1>Todo List</h1>
        <form onSubmit={handlesubmit}>
            <input type="text" id="todoAdd"/>
            <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) =>
            // <div className="todo" key={todo.id}>
            //     <div className="todo-text">
            //         {todo.text}
            //         <input type="checkbox" id="completed" checked={todo.completed} onChange={()=> toggleComplete(todo.id)} />

            //     </div>
            //     {/*insert delete button here*/}
            //     <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
            // </div>
            (
                <div key={todo.id} className="todo">
                    <div className="todo-text">
                        <input type="checkbox" id="completed" checked={todo.completed} onChange={()=> toggleComplete(todo.id)} />
                        {
                            todo.id === todoEditing ?
                            (<input type="text" id={todo.id} defaultValue={todo.text} />) :
                            (<div>{todo.text}</div>)
                        }
                    </div>
                    <div className="todo-actions">
                        {
                            todo.id === todoEditing ?
                            (
                                <button onClick={()=> submitEdits(todo)}>Submit Edit</button>
                            ) :
                            (
                                <button onClick={()=> setTodoEditing(todo.id)}>Edit</button>
                            )
                        }
                        <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
                    </div>
                </div>
            )
        )}
    </div>
    );
};
export default App;
