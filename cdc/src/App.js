import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Student from './components/Student/Student';
import Admin from "./components/Admin/Admin";
import Page404 from './components/404/Page404';
import Director from './components/Director/Director';
import AD from './components/Departments/AD/AD';
import BME from './components/Departments/BME/BME';
import Chemical from './components/Departments/Chemical/Chemical';
import Civil from './components/Departments/Civil/Civil';
import CSE from './components/Departments/CSE/CSE';
import ECE from './components/Departments/ECE/ECE';
import EEE from './components/Departments/EEE/EEE';
import Mech from './components/Departments/Mech/Mech';


function App() {
  const [adminbool, setadminbool] = useState(false);
  const [studentbool, setstudentbool] = useState(false);

  useEffect(() => {
    const storedAdminBool = sessionStorage.getItem('adminbool');
    const storedStudentBool = sessionStorage.getItem('studentbool');

    if (storedAdminBool === 'true') {
      setadminbool(true);
    }
    if (storedStudentBool === 'true') {
      setstudentbool(true);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('adminbool', adminbool.toString());
    sessionStorage.setItem('studentbool', studentbool.toString());
  }, [adminbool, studentbool]); 

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setadminbool={setadminbool} setstudentbool={setstudentbool} />} />
          <Route path="/student" element={studentbool  ? <Student setstudentbool={setstudentbool}/> : <Page404/>} />
          <Route path="/admin" element={adminbool ? <Admin setadminbool={setadminbool}/> : <Page404/>}/>
          <Route path='/director' element={<Director/>}/>
          <Route path='/AI&DS' element={<AD/>}/>
          <Route path='/BME' element={<BME/>}/>
          <Route path='/Chemical' element={<Chemical/>}/>
          <Route path='/Civil' element={<Civil/>}/>
          <Route path='/CSE' element={<CSE/>}/>
          <Route path='/ECE' element={<ECE/>}/>
          <Route path='/EEE' element={<EEE/>}/>
          <Route path='/Mech' element={<Mech/>}/>
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
