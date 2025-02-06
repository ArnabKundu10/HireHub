// src/App.jsx
import React from 'react';
import { Routes, Route,/*  useLocation */} from 'react-router-dom';
// import Layout from './components/Layout';
// import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import CreateJob from './components/CreateJob';
import Stats from './components/Stats';
import CompanyDetails from './components/CompanyDetails';
import PrivateRoute from './private/PrivateRoute';
function App() {
  // const location=useLocation();
  return (
    // <Layout>
    //   </Layout>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/" element={ <PrivateRoute><Dashboard /></PrivateRoute>} >
            <Route path="create-job" element={<CreateJob  />} />
            <Route path="statistics" element={<Stats />} />
            <Route path="company-details" element={<CompanyDetails />} />
        </Route>
      </Routes>
    
  );
}

export default App;
