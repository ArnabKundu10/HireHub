// src/App.jsx
import React from 'react';
import { Routes, Route} from 'react-router-dom';
// import Layout from './components/Layout';
// import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import PostJob from './pages/PostJob';

function App() {
  return (
    // <Layout>
    //   </Layout>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
      </Routes>
    
  );
}

export default App;
