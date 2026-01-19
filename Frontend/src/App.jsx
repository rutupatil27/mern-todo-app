import React from 'react'
import Todo from './components/todo.jsx'
import Login from './components/login.jsx'
import Signin from './components/signin.jsx'
import ProtectedRoute from './components/protectedRoute.jsx'
import { Route, Routes, BrowserRouter} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App