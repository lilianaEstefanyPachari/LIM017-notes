/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Welcome from './components/pages/welcome';
// import SignUp from './components/pages/register';
// import SignIn from './components/pages/login';
import RegisterUser from './components/pages/registerUser';
import LoginUser from './components/pages/loginUser';
import Home from './components/pages/home';

import { AuthProvider } from './context/authContext';


function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="login" element={<LoginUser />} />
          <Route path="register" element={<RegisterUser />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </div>

  );
}

export default App;
