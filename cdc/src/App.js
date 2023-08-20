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
import axios from 'axios';


function App() {


  const[studentBool,setStudentBool]=useState(false);
  const[CSEBool,setCSEBool]=useState(false);
  const[AIDSBool,setAIDSBool]=useState(false);
  const[BMEBool,setBMEBool]=useState(false);
  const[ChemicalBool,setChemicalBool]=useState(false);
  const[CivilBool,setCivilBool]=useState(false);
  const[ECEBool,setECEBool]=useState(false);
  const[EEEBool,setEEEBool]=useState(false);
  const[MechBool,setMechBool]=useState(false);
  const[adminBool,setAdminBool]=useState(false);

  useEffect(()=>{
    whoisthat();
  },[]);


    const whoisthat = async () => {
      const response= await axios.get("http://127.0.0.1:8000/whoisthis/",{
        withCredentials:true,
      });

      const val=response.data.whoisthis;
      if(val==="Student"){
        setStudentBool(true);
      }

      if(val==="CSE"){
        setCSEBool(true);
      }

      if(val==="AI&DS"){
        setAIDSBool(true);
      }

      if(val==="BME"){
        setBMEBool(true);
      }

      if(val==="CHEMICAL"){
        setChemicalBool(true);
      }

      if(val==="CIVIL"){
        setCivilBool(true);
      }

      if(val==="ECE"){
        setECEBool(true);
      }

      if(val==="EEE"){
        setEEEBool(true);
      }

      if(val==="MECH"){
        setMechBool(true);
      }

      if(val==="admin"){
        setAdminBool(true);
      }

    }
    
;
  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student" element={<Student/>} />
          <Route path='/director' element={<Director/>}/>
          <Route path='/coordinator' element={<CSE/>}/>
          {/* <Route path="/admin" element={<Admin/>}/> */}
          {/* <Route path='/AI&DS' element={<AD/>}/>
          <Route path='/BME' element={<BME/>}/>
          <Route path='/Chemical' element={<Chemical/>}/>
          <Route path='/Civil' element={<Civil/>}/>
          <Route path='/ECE' element={<ECE/>}/>
          <Route path='/EEE' element={<EEE/>}/>
          <Route path='/Mech' element={<Mech/>}/> */}
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
