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
        
        const newTodo = pool.query("INSERT INTO todo (description) VALUES ($1)"
        , [description]
        );

        res.json(newTodo);
    }
    catch(err){
        console.log(err.message)
    }
})

//get all todos



//get a todo 





//update a todo





//delete a todo






app.listen(5000 , () => {
    console.log('server is running')
})