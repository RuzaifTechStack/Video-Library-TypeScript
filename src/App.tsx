import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserHome } from './Components/User-Dashboard';
import { AdminLogin } from './Components/Admin-Login';
import { AdminHome } from './Components/Admin-Dashboard';
import { UserLogin } from './Components/User-Login';
import { UserRegister } from './Components/User-Register';
import { Invalid } from './Components/Invalid';
import { Home } from './Components/Home';
import { useCookies } from 'react-cookie';

function App() {

  const [Cookie, Setcookie, RemoveCookie] = useCookies(['admin']);
  const [cookie, setcookie, removecookie] = useCookies(['username']);

  return (
    <div className="container-fluid bg-dark text-white body p-2 mobile">
      <BrowserRouter>
       <div>
        {
          (Cookie['admin']== undefined && cookie['username']==undefined)?
          <Home />: <div></div>
        }
       </div>
       <Routes>
          <Route path='adminlogin' element={<AdminLogin />} />
          <Route path='adminhome' element={<AdminHome />} />
          <Route path='login' element={<UserLogin />} />
          <Route path='register' element={<UserRegister />} />
          <Route path='/userhome' element={<UserHome />} />
          <Route path='invalid' element={<Invalid />} />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
