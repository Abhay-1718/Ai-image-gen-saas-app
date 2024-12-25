import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify';
import { ToastContainer } from 'react-toastify';
import ResetPassword from './pages/ResetPassword'


const App = () => {
  return (
    <>
    <ToastContainer>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
      </ToastContainer>

    </>
  )
}

export default App
