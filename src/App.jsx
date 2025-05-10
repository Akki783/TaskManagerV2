import { Routes, Route, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Task from './Pages/Task';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import OpenRoute from "./components/Auth/OpenRoute";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from './Store/Slices/user';
import Layout from './components/Dashboard/Layout';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    let token = localStorage.getItem("token");
    let userData = localStorage.getItem("sys");

    if (token) {
      dispatch(setUser({ token, user: JSON.parse(userData) }));
      // dispatch(setUser)
    }
    else {
      navigate("/login");
    }
  }, []);


  return (
    <main className='w-full min-h-screen bg-[#f3f4f6] '>
      <Routes>

        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />

        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />


        <Route element={<Layout />}>
          <Route path='/' element={<Navigate to="/dashboard" />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Task />} />
          <Route path='/settings' element={<Task />} />
          <Route path='/logout' element={<Task />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
