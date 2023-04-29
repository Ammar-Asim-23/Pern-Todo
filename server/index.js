//import required dependencies
const express = require('express');
const cors = require('cors');
const pool = require('./db');
//initialize the app
const app = express();
//middleware
app.use(cors())
app.use(express.json());//req.body


//routes

//create a todo request

app.post('/todos' , async (req, res) => {
    try{
        const { description } = req.body;
        
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *"
        , [description]
        );

        res.json(newTodo.rows[0]);
    }
    catch(err){
        console.error(err.message);
    }
});

//get all todos
    app.get('/todos' , async (req, res) => {
        try {
            const allTodos = await pool.query("SELECT * FROM todo")
            res.json(allTodos.rows)
        } catch (error) {
            console.error(err.message)
        }
    });


//get a todo 

    app.get('/todos/:id' , async (req, res) => {
        try {
            const id = req.params.id
            const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1"
          , [id])
          res.json(todo.rows[0]);
        } catch (error) {
            console.error(err.message);
        }
    });



//update a todo

    app.put('/todos/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const {description} = req.body;
            const updatedTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2"
          , [description, id]);

          res.json('todo was updated');

        } catch (error) {
            console.error(err.message);
        }
    });



//delete a todo
    app.delete('/todos/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
            res.json('Todo was deleted successfully')
        } catch (error) {
            console.error(err.message)
        }
    })





app.listen(5000 , () => {
    console.log('server is running')
});