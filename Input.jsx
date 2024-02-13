import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Input(){
    let [todos, setTodos]= useState([]);         // array of objects.
    let [newTodo, setNewTodo]= useState("");
    let [isActive, setActive]= useState(false);

    // handling add event by onClick.
    let addNewTask= () =>{
        setTodos( (prevTodo)=> {
            return [...prevTodo, {task:newTodo, id:uuidv4(), mark:false }]
        } );
        setNewTodo("");
  
    };

    // handling add event by onKeyPress(Enter).
    let enter= (event) =>{
        if(event.key === 'Enter'){
            setTodos( (prevTodo)=> {
                return [...prevTodo, {task:newTodo, id:uuidv4(), mark:false }]
            } );
            setNewTodo("");
        }
    };

    // handling onChange event into input.
    function updateTodoValue(event){
        setNewTodo(event.target.value);
    };


/*
        // handling delete event by onClick.
    function deleteTask(){
        console.log("delete");
        for(let i=0; i< todos.length; i++){
            if(newTodo == todos[i]){
                delete todos[i];
                setTodos([...todos]);
                setNewTodo("");
            } else{
                setNewTodo("");
            }
        }
    }
*/

    function deleteTodo(id){
       setTodos( ()=>{
        return todos.filter( (todo)=> todo.id != id )                // it returns the copy of todos which is not having deleted element
       } );
    }

    function deleteAll(){
        setTodos( (prevTodo)=>{
         return prevTodo.filter( (todo)=> false );                // it returns the copy of todos which is not having deleted element
        } );
    }

    function upperCaseAll() {
        setTodos( (prevTodos)=> (
            prevTodos.map( (todo)=>{
                return{
                    ...todo, task:todo.task.toUpperCase()
                }
            })
        ));    
    }

    function upperCaseOne(id){
        setTodos( (prevTodo)=> (
            prevTodo.map( (todo)=>{
                if(todo.id == id){
                    return { ...todo, task:todo.task.toUpperCase() } ;
                } else{
                    return todo ;
                }
            })
        )); 
    }

    // for mark all tasks at once.
    function markAll(){
        setActive( (preValue) => !preValue);
    }

    // for mark individual task.
    function isMark(id){
        setTodos( (prevTodo)=> 
            prevTodo.map( (todo)=>{
                if(todo.id == id){
                    return {...todo, mark: !todo.mark};
                } else{
                    return todo;
                }
            })
        );
    };

    // for mark individual task.
    function markAll(){
        setTodos( (prevTodo)=> 
            prevTodo.map( (todo)=>{
                return {...todo, mark: !todo.mark};
            })
        );
    };

    return (
        <div>
            <span><button onClick={addNewTask}> Add Task </button></span>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <input type="text" placeholder="add task" value={newTodo} onChange={updateTodoValue} onKeyPress={enter} />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <span><button onClick={deleteAll}> Reset </button></span>

            <hr />

            <ul>
                {
                    todos.map( (todo)=> (
                       <li key={todo.id}>
                            <span style={{textDecoration: todo.mark? "line-through" : "none" }}>{todo.task}</span> 
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <span><button onClick={ ()=> deleteTodo(todo.id) }> delete </button></span> 
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <span><button onClick={ ()=> upperCaseOne(todo.id) }> UpperCase </button></span> 
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <span><button onClick={()=> isMark(todo.id)} > Mark As Done </button></span> 
                        </li>
                    ))
                }
            </ul>

            <button onClick={upperCaseAll} >UpperCaseALL</button>   
            <button onClick={markAll}> Mark All Done </button> 
        </div>
    );
}