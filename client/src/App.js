import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage.js';
import RegisterPage from './components/views/RegisterPage/RegisterPage.js';

function App() {
  return (
    <Router>
    <div>

      {}
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/dashboard" element={<RegisterPage/>}/>
        
      </Routes>
    </div>
  </Router>
  )
}
  
export default App