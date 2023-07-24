import React, { useState,useEffect } from "react";
import "./Admin.css";
import kprimage from "../../assets/kpr.jpg";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Admin = ({setadminbool}) => {
  const [students, setStudents] = useState([]);
  const [year,setYear]=useState("PASSOUT");
  const [department,setDepartment]=useState("DEPARTMENT");
  const [companyType,setCompanyType]=useState("COMPANY TYPE");
  const navigate =new useNavigate();
  const [bool1,setBool1]=useState(true);
  const [bool2,setBool2]=useState(true);
  const [bool3,setBool3]=useState(true);
  const [letter,setLetter]=useState("");
  const [maximizedProfilePic, setMaximizedProfilePic] = useState(null);
  const logout = () =>{
    setadminbool(false);
    navigate("/");
  };

  const maximizeProfilePic = (event) => {
    event.stopPropagation();
    event.target.classList.toggle("maximized");
    setMaximizedProfilePic(event.target);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (maximizedProfilePic && !maximizedProfilePic.contains(event.target)) {
        maximizedProfilePic.classList.remove("maximized");
        setMaximizedProfilePic(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [maximizedProfilePic]);
  

  useEffect(() => {setBool1(true);setBool2(true);setBool3(true)},[bool1,bool2,bool3]);

  useEffect(() => {
    fetchStudents();
  }, []);


  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/students/");
      setStudents(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  console.log(students);
  var filterData=students;

  if(year!="PASSOUT" && department!="DEPARTMENT" && companyType!="COMPANY TYPE"){
    filterData=students.filter((item)=>item.passout==year && item.degree==department && item.type==companyType);
  }

  if(year=="PASSOUT" && department!="DEPARTMENT" && companyType!="COMPANY TYPE"){
    filterData=students.filter((item)=>item.degree==department && item.type==companyType);
  }
  if(year=="PASSOUT" && department!="DEPARTMENT" && companyType=="COMPANY TYPE"){
    filterData=students.filter((item)=>item.degree==department );
  }

  if(year=="PASSOUT" && department=="DEPARTMENT" && companyType!="COMPANY TYPE"){
    filterData=students.filter((item)=>item.type==companyType);
  }

  if(year!="PASSOUT" && department=="DEPARTMENT" && companyType=="COMPANY TYPE"){
    filterData=students.filter((item)=>item.passout==year);
  }

  if(year!="PASSOUT" && department=="DEPARTMENT" && companyType!="COMPANY TYPE"){
    filterData=students.filter((item)=>item.passout==year && item.type==companyType);
  }

  if(year!="PASSOUT" && department!="DEPARTMENT" && companyType=="COMPANY TYPE"){
    filterData=students.filter((item)=>item.passout==year && item.degree==department);
  }

  if (letter !== "") {
    let letter1=letter.toLowerCase();
    const updatedList = [];
    for (let student of filterData) {
      for (let key in student) {
        if(key=='roll_no' || key=='firstName' || key=='degree' || key=='cgpa' || key=='passout' || key=='company' || key=='salary' ){
          const value = student[key].toString().toLowerCase();
          if (value.includes(letter1)) {
            updatedList.push(student);
            break;
          }
        }

      }
    }
    filterData = updatedList;
  }


  return (
    <div className="admin-section">
      <div className="admin">
      <div className="flex-cont">

      <img src={kprimage} className="img-kpr" alt="kpr" />
      <button className="btn1" onClick={logout}>LOGOUT</button>
      </div>
        <h1 className="placed">PLACED STUDENTS IN BE / BTECH</h1>
        <div className="filter">
          <div className="dropdowns">
        <div className="dropdown">
          <button className="filter-btn">{year} &nbsp;&nbsp;&nbsp;&#x25BC;</button>
          {bool1 && (
          <div className="dropdown-content">
          <a onClick={()=>{setYear("PASSOUT");setBool1(false)}}>PASSOUT</a>
          <a onClick={()=>{setYear("2024");setBool1(false)}}>2024</a>
          <a onClick={()=>{setYear("2023");setBool1(false)}}>2023</a>
          <a onClick={()=>{setYear("2022");setBool1(false)}}>2022</a>
          <a onClick={()=>{setYear("2021");setBool1(false)}}>2021</a>

        </div>)}
        </div>

        <div className="dropdown">
          <button  className="filter-btn dept">{department} &nbsp;&nbsp;  &#x25BC;</button>
          {bool2 && (<div className="dropdown-content">
          <a onClick={()=>{setDepartment("DEPARTMENT");setBool2(false)}}>DEPARTMENT</a>
          <a onClick={()=>{setDepartment("AI & DS");setBool2(false)}}>AI & DS</a>
          <a onClick={()=>{setDepartment("BIO-MEDICAL");setBool2(false)}}>BIO-MEDICAL</a>
          <a onClick={()=>{setDepartment("CIVIL");setBool2(false)}}>CIVIL</a>
          <a onClick={()=>{setDepartment("CSE");setBool2(false)}}>CSE</a>
          <a onClick={()=>{setDepartment("CHEMICAL");setBool2(false)}}>CHEMICAL</a>
          <a onClick={()=>{setDepartment("ECE");setBool2(false)}}>ECE</a>
          <a onClick={()=>{setDepartment("EEE");setBool2(false)}}>EEE</a>
          <a onClick={()=>{setDepartment("MECH");setBool2(false)}}>MECH</a>
        </div>)}
        </div>

        <div className="dropdown">
          <button  className="filter-btn dept1">{companyType} &nbsp;&nbsp;  &#x25BC;</button>
          {bool3 && (<div className="dropdown-content">
          <a onClick={()=>{setCompanyType("COMPANY TYPE");setBool3(false)}}>COMPANY TYPE</a>
          <a onClick={()=>{setCompanyType("IT");setBool3(false)}}>IT</a>
          <a onClick={()=>{setCompanyType("NON - IT");setBool3(false)}}>NON - IT</a>

        </div>)}
        </div>
        </div>

        {/* <input type="text" value={letter} onChange={(event)=>{setLetter(event.target.value)}}></input> */}
        <div className="search">
            <input id='search-btn' type='checkbox'/>
            <label for='search-btn'>Show search bar</label>
            <input id='search-bar' type='text' placeholder='Search' value={letter} onChange={(event)=>{setLetter(event.target.value)}}/>
        </div>
</div>


            <table className="student-table">
              <thead>
                <tr>
                  <th><h1>PHOTO</h1></th>
                  <th><h1>DETAILS</h1></th>
                  {/* <th><h1>VIDEO</h1></th> */}
                  <th><h1>COMPANY</h1></th>
                  <th><h1>OFFER LETTER</h1></th>
                  <th><h1>SALARY</h1></th>
                </tr>
                </thead>
                <tbody>
                  {filterData.map((student)=>(
                    <tr key={student.id}>
                      <td><img onClick={maximizeProfilePic} className="profile_pic" src={"http://127.0.0.1:8000/"+student.profile}/></td>
                      <td><p><span>ROLL NO:</span> {student.roll_no}</p>
                      <p><span>NAME:</span> {student.firstName}</p>
                      <p><span>BRANCH:</span> {student.degree}</p>
                      <p><span>CGPA:</span> {student.cgpa}</p>
                      <p><span>PASSOUT:</span> {student.passout}</p>
                      {/* <div className */}
                      <p><a target="_blank" href={student.linkedin} class="linkedin"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg></a></p>
                    </td>
                    {/* <td><iframe width="300" height="215" src="https://www.youtube.com/watch?v=Vwa6Py0D-RI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></td> */}
                    
                    <td><span className="span company">{student.company}</span></td>
                      <td><img onClick={maximizeProfilePic} className="profile_pic" src={"http://127.0.0.1:8000/"+student.testimonial}/></td>
                    <td><span className="span salary">{student.salary} LPA</span></td>

                      {/* <td><iframe width="260" height="150" src="https://www.youtube.com/embed/CKiFgusVe08" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></td> */}

                    </tr>
                  ))}
                </tbody>
            </table>
            

      </div>
    </div>
  );
};

export default Admin;