import './App.css';
import React from "react";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import FAQs from './Components/FAQs/FAQs';
import Team from './Components/Team/Team';
import Footer from './Components/Footer/Footer';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import VerifyEmail from './Components/VerifyEmail/VerifyEmail';
import { AuthProvider } from "./Contexts/AuthContext"
import VerifiedRoute from "./Utils/VerifiedRoute"
import FreeRoute from "./Utils/FreeRoute"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <React.Fragment>
          <AuthProvider>
          
          <Header />
          <Routes>

            <Route path="/" element={
              <FreeRoute>

            <React.Fragment>
              <Home />
              <AboutUs />
              <FAQs />
              <Team />
            </React.Fragment>
              </FreeRoute>
          } />

            <Route path="/signup" element={<FreeRoute><Signup/></FreeRoute>} />
            <Route path="/login" element={<FreeRoute><Login/></FreeRoute>} />
            <Route path="/forgotpassword" element={<FreeRoute><ForgotPassword/></FreeRoute>} />
            <Route path="/verifyemail" element={<VerifiedRoute><VerifyEmail/></VerifiedRoute>} />
          </Routes>
          <Footer />

        </AuthProvider>
        </React.Fragment>
      </Router>
    </>
  );
}

export default App;
