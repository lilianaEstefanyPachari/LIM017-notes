/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Welcome from "./components/pages/welcome";
// import SignUp from './components/pages/register';
// import SignIn from './components/pages/login';
import RegisterUser from "./components/pages/register/registerUser";
import LoginUser from "./components/pages/login/loginUser";
// import Home from './components/pages/home';
import Homepage from "./components/pages/home/homepage";

import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="login" element={<LoginUser />} />
          <Route path="register" element={<RegisterUser />} />
          {/* <Route path="home" element={<Home />} /> */}
          <Route path="homepage" element={<Homepage />} />
          <Route path="*" element={<>NOT FOUND</>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
