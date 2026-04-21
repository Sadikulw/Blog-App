import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import AddBlogs from './pages/AddBlogs'
import BlogDetail from './pages/BlogDetail'
import NavBar from './components/NavBar'
import Edit from './pages/Edit'
import { useState,useEffect } from 'react'
import { Toaster } from "react-hot-toast";
import axios from 'axios'

const App = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "/api/users/me",
          { withCredentials: true }
        );
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    
    <div>
        <Toaster position="top-right" />
      <NavBar
        user={user}
        setUser={setUser}
      />
      <Routes>
          <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/register' element={<Register/>} />

        <Route path='/add-blog' element={<AddBlogs/>} />
        <Route path='/blogs/:id' element={<BlogDetail user={user} />} />
        <Route path='/blogs/:id/edit' element={<Edit/>} />
      </Routes>
    </div>
  )
}

export default App
