import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const App = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addtodo = async(e)=>{
    e.preventDefault()
    if(!newTodo.trim()) return
    try {
      const response = await axios.post('/api/todos', {text: newTodo})
      setTodos([...todos, response.data])
      setNewTodo('')
    } catch (error) {
      console.log("error while adding todo",error)
    }
  }

  const getTodos = async()=>{
    try {
      const response = await axios.get('/api/todos')
      setTodos(response.data)
    } catch (error) {
      console.log("error while fetching todos",error)
    }
  }

  React.useEffect(()=>{
    getTodos()
  },[])

  const deleteTodo = async(id)=>{
    try {
      await axios.delete(`/api/todos/${id}`)
      setTodos(todos.filter((todo)=>todo._id !== id))
    } catch (error) {
      console.log("error while deleting todo",error)
    }
  }

  const completedTodo = async(id,completed)=>{
      try {
        const response = await axios.post(`/api/todos/${id}`,{completed:!completed})
        setTodos(todos.map((todo)=>todo._id === id ? response.data : todo))
      } catch (error) {
        console.log("error while updating todo",error)
      }
  }

  const updateTodo = async (id,editingText) => {
    try {
      const response = await axios.post(`/api/todos/${id}`, { text: editingText });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
      setEditingTodoId(null);
      setEditingText('');
    }
    catch (error) {
      console.log("error while updating todo", error);
    }
  };

  return (
    <div className='min-h-screen font-serif bg-linear-to-br from-white to-blue-100 flex justify-center items-center'>
      <div className='bg-gray-50 h-100 w-md shadow-2xl rounded-xl relative'>
        <div className='h-15 p-7 flex justify-center items-center shadow-md rounded-t-xl '>
          <h1 className='text-2xl font-medium text-gray-700'>TODO List</h1>
        </div>

        <div className='h-64 overflow-y-auto p-5'>
          {
            todos.map((todo)=>(
              <div key={todo._id} className='bg-white p-4 mb-4 rounded-lg shadow-sm flex items-center'>
                <span
                  onClick={
                    ()=>{
                      completedTodo(todo._id,todo.completed)
                    }
                  }
                  className= {`border-2 border-gray-400 rounded-3xl mr-4 hover:border-gray-800
                  ${todo.completed ? 'bg-green-400 border-green-600':''} p-1 cursor-pointer
                  `}>
                    <TiTick className='text-xl text-gray-700'/>
                </span>

                {editingTodoId === todo._id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={
                      ()=>{
                        updateTodo(todo._id, editingText);
                      }
                    }
                    onKeyDown={async (e) => {
                      if (e.key === 'Enter') {
                        updateTodo(todo._id, editingText);
                      }
                    }}
                    className="flex-1 outline-none border-b-2 border-blue-500"
                    autoFocus
                  />
                ) : (
                  <span className='text-gray-800 flex-1'>{todo.text}</span>
                )}
                  <button
                  onClick={
                    ()=>{
                      setEditingTodoId(todo._id);
                      setEditingText(todo.text);
                    }
                  }>
                    <FaPen className='text-blue-600 cursor-pointer text-xl ml-1' />
                  </button>
                  <button
                  onClick={
                    ()=>{
                      deleteTodo(todo._id)
                    }
                  }>
                    <FaTrash className='text-red-600 cursor-pointer ml-2 text-xl' />
                  </button>
              </div>
            ))
          }
        </div>

        <form onSubmit={addtodo} action="" className='flex absolute bottom-0 p-5 border-2 border-gray-400 rounded-xl w-full'>
          <input 
          type="text" 
          placeholder="What's your goal today?" 
          className='outline-none placeholder:text-gray-400 flex-1'
          value={newTodo}
          onChange={(e)=>{
            setNewTodo(e.target.value)
          }}
          required
          />
          <button 
          type='submit'
          className='bg-gray-700 rounded-3xl px-4 py-2 text-white hover:cursor-pointer hover:-translate-y-0.5'
          >
            Add TODO
          </button>
        </form>
      </div>
    </div>
  )
}

export default App