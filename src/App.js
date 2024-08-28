import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './component/signup/Signup';
import { Login } from './component/login/Login';
import MyTable from './component/table/MyTable';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/table" element={<MyTable />} />
      </Routes>
    </Router>
  );
}

export default App;
