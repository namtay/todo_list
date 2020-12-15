const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const app = express();
require('dotenv').config();

app.use(cors);
app.use(express.json());


const config={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(process.env.MONGODB_URI,config)
.then(
    ()=>{
        console.log("Successfully connected to MongoDB")
    }
)
.catch(err=>{
    console.log("Some problem occured")
})


app.get("/",(req,res)=>{
    Todo.find((err,todos)=>{
        if(err){
            console.log(err);
        }else{
            res.json({message:"successfully connected",todos});
        }
    }
)})

app.post("/create",(req,res)=>{
    const todo = new Todo(req.body);
    todo
    .save()
    .then((todo)=>{res.json(todo)})
    .catch((err)=>{
        res.status(500).send(err.message);

    })
})

app.get(":/",(req,res)=>{
    const id =req.params.id;
    Todo.findById(id,(err,todo)=>{
        res.json(todo)
    })
})

app.post("/:id",(req,res)=>{
    const id =req.params.id;
    Todo.findById(id,(err,todo)=>{
        if(!todo){
            res.status(404).send("Todo not found")

        }else{
            todo.text= req.body.text;
            todo.save().then(todo=>{
                res.json(todo)
            }).catch(err =>res.status(500).send(err.message))
        }
        }
    )}
)

app.listen(process.env.PORT,()=>{
    console.log("Server is running ")
})
