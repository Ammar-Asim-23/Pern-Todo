import React, {Fragment, useState, useEffect} from 'react';
import EditTodo from './EditTodo';





const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    const getTodos = async () => {
        try {
            const res = await fetch("http://localhost:5000/todos");
            const jsonData = await res.json();
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    }

    //delete function
    const deleteTodo = async (id) => {
    try {
        const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,
        {'method' : "DELETE"}
        );

        setTodos(todos.filter(todos => todos.todo_id !== id));

    } catch (err) {
        console.error(err.message)
    }
};
    useEffect(() => {
        getTodos();
    } , [])


    return <Fragment>
        <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td><EditTodo todo={todo}/></td>
            <td><button className='btn btn-danger' 
            onClick= {() => deleteTodo(todo.todo_id)}>Delete</button></td>
        </tr>
      ))};
      
    </tbody>
  </table>
    </Fragment>
} ;

export default ListTodos;