import { Todo } from '../models/todo.model.js';

// Get all todos
export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.userId });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create a new todo
export const createTodo = async(req,res)=>{
    const todo = new Todo({
        text: req.body.text,
        user: req.userId
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update a todo
export const updateTodo = async(req,res)=>{
    const todo= await Todo.findById(req.params.id);
    try {
        if(!todo){
            return  res.status(404).json({message:"Todo not found"});
        }
        if(req.body.completed!==undefined){
            todo.completed = req.body.completed;
        }
        if(req.body.text !== undefined){
            todo.text = req.body.text;
        }
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a todo
export const deleteTodo = async(req,res)=>{
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if(!todo){
            return res.status(404).json({message:"Todo not found"});
        }
        res.json({message:"Todo deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

