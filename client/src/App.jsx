import './App.css';
import { useState } from 'react';
import { Navigate, Route,Routes } from 'react-router';
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import Users from "./pages/Users";
import CreateUser from './pages/CreateUser';
import CreateExam from './pages/CreateExam';
import Exams from './pages/Exams';
import UserExams from './pages/UserExams';
import UpdateUser from './pages/UpdateUser';
import UpdateExam from './pages/UpdateExam';
import ViewUser from './pages/ViewUser';
import RefreshHandlerAdmin from './RefreshHandlerAdmin';
import RefreshHandlerUser from './RefreshHandlerUser';
import Live from './pages/Live';
import Profile from './pages/Profile';

function App() {

  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticatedAdmin ? element : <Navigate to="/login" />
  }

  const PublicRoute = ({ element }) => {
    return isAuthenticatedUser ? element : <Navigate to="/login" />
  }

  return (
    <>
    <RefreshHandlerAdmin setIsAuthenticatedAdmin={setIsAuthenticatedAdmin} />
    <RefreshHandlerUser setIsAuthenticatedUser={setIsAuthenticatedUser} />
    <Routes>
    <Route path='/' element={<Navigate to="/login" />} />
    <Route path='/admin' element={<Navigate to="/admin/users" />} />
    <Route path='/login' element={<UserLogin />}/>
    <Route path='admin/login' element={<AdminLogin />}/>
    <Route path='admin/users' element={<PrivateRoute element={<Users />} />} />
    <Route path='admin/create-user' element={<PrivateRoute element={<CreateUser />} />}/>
    <Route path='admin/update-user' element={<PrivateRoute element={<UpdateUser />} />}/>
    <Route path='admin/view-user' element={<PrivateRoute element={<ViewUser />} />} />
    <Route path='admin/exams' element={<PrivateRoute element={<Exams />} />} />
    <Route path='admin/update-exam' element={<PrivateRoute element={<UpdateExam />} />} />
    <Route path='admin/create-exam' element={<PrivateRoute element={<CreateExam />} />}/>
    <Route path='/courses' element={<PublicRoute element={<UserExams />} />} />
    <Route path='/live' element={<PublicRoute element={<Live />} />} />
    <Route path='/profile' element={<PublicRoute element={<Profile />} />} />
    </Routes>
    </>
  )
}

export default App
