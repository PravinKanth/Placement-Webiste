import React,{useState,useEffect} from "react";
import "./CSE.css";

import Swal from "sweetalert2";
import kprimage from "../../../assets/kpr.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import filter from "../../../assets/filter.png";

const CSE = () => {
    const [cls,setCls]=useState("na")
    const [cls1,setCls1]=useState("nalive1")
    const [start,setStart]=useState("dashboard");
    const [students, setStudents] = useState([]);
    const [approvedstudents, setApprovedStudents] = useState([]);
    const [year,setYear]=useState("PASSOUT");
    const [companyType,setCompanyType]=useState("COMPANY TYPE");
    const [bool1,setBool1]=useState(false);
    const [bool2,setBool2]=useState(true);
    const [bool3,setBool3]=useState(true);
    const [letter,setLetter]=useState("");
    const [back,setBack]=useState("");
    const [maximizedProfilePic, setMaximizedProfilePic] = useState(null);
    const [order,setOrder]=useState(1);
    const [filterData11,setFilterData11]=useState([]);
    const [last,setLast]=useState([]);
    const [loader,setLoader]=useState(true);


    const navigate= new useNavigate();

    const logout = async () =>{
      const response= await axios.get("http://127.0.0.1:8000/logout/",{
        withCredentials:true,
      });
    navigate("/");

  };

      const generateYearList = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
    
        for (let i = currentYear+2;i>currentYear-5 ; i--) {
          years.push(i.toString());
        }
    
        return years;
      };

      const maximizeProfilePic = (event) => {
        event.stopPropagation();
        setBack("outer");
        event.target.classList.toggle("maximized");
        setMaximizedProfilePic(event.target);
      };
    
      useEffect(() => {
        const handleOutsideClick = (event) => {
          setBack("");
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
        getDept();
      }, []);

      const getDept = async() => { 
        setLoader(true);
        try{
        const response=await axios
          .get('http://127.0.0.1:8000/getdeptstudents/', {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials:true,
          })
          const data=response.data.filter((item)=>item.status=="PROCESSING")
          const data1=response.data.filter((item)=>item.status=="APPROVED")
          console.log(response.data);
          setStudents(data);
          setApprovedStudents(data1);
          console.log('Response:', response.data); 
        
        }catch (error) {
            console.log(error);
          }
        setLoader(false);
      };

      const updateList =(roll,stat) => {
        const meta={
          roll:roll,
          status:stat
        }
        axios.post('http://127.0.0.1:8000/updatestudents/',meta,{
          headers:{"Content-Type":"multipart/form-data"}
        }).then((response)=>{
          console.log("Done");
        }).catch((error)=>{
          console.log("error");
        })

        getDept();

      }
      console.log(students);

      var filterData=students;
    
      if(year!="PASSOUT" && companyType!="COMPANY TYPE"){
        filterData=students.filter((item)=>item.passout==year && item.type==companyType);
      }
    
      if(year=="PASSOUT" && companyType!="COMPANY TYPE"){
        filterData=students.filter((item)=> item.type==companyType);
      }
      if(year!="PASSOUT" && companyType=="COMPANY TYPE"){
        filterData=students.filter((item)=>item.passout==year);
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

        console.log(filterData);
}

useEffect(()=>{
  rendering();
},[year,companyType,students,letter]);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoader(false);
  }, 500); 

  return () => clearTimeout(timer);
}, []);

const rendering = () =>{ 

var filterData1=approvedstudents;
    
if(year!="PASSOUT" && companyType!="COMPANY TYPE"){
  filterData1=approvedstudents.filter((item)=>item.passout==year && item.type==companyType);
}

if(year=="PASSOUT" && companyType!="COMPANY TYPE"){
  filterData1=approvedstudents.filter((item)=> item.type==companyType);
}
if(year!="PASSOUT" && companyType=="COMPANY TYPE"){
  filterData1=approvedstudents.filter((item)=>item.passout==year);
}



if (letter !== "") {
  let letter1=letter.toLowerCase();
  const updatedList1 = [];
  for (let student of filterData1) {
    for (let key in student) {
      if(key=='roll_no' || key=='firstName' || key=='degree' || key=='cgpa' || key=='passout' || key=='company' || key=='salary' ){
        const value = student[key].toString().toLowerCase();
        if (value.includes(letter1)) {
          updatedList1.push(student);
          break;
        }
      }

    }
  }
  filterData1 = updatedList1;

  console.log(filterData1);
}
setLast(filterData1);

setFilterData11(filterData1);


}

const orderfun = () => {

  setOrder((order+1)%3);

  if(order==0){
    setFilterData11(last);
    
  }

  if(order==1){
    const sortedEmployees = [...filterData11].sort((a, b) => a.salary - b.salary);
    setFilterData11(sortedEmployees);
    
  }
  if(order==2){
    const sortedEmployees = [...filterData11].sort((b,a) => a.salary - b.salary);
    setFilterData11(sortedEmployees);     

  }

}

    return(
        <div className="cse-section">
            <div className="cse">
              <div className={back}></div>
            <div className="flex-cont">
        <div className="nav">
            <button onClick={()=>{setCls("nalive");setCls1("na1");setStart("queue");}} className={cls}>
              <p>Queue</p>
            </button>
            </div>
            <div className="nav1">
            <button onClick={()=>{setCls1("nalive1");setCls("na");setStart("dashboard");}} className={cls1}>
              <p>Dashboard</p>
            </button>
            </div>
        <a href="https://www.kpriet.ac.in/"><img src={kprimage} className="img-kpr" alt="kpr" /></a>
        <button className="Btn" onClick={logout}>
            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div className="text">Logout</div>

        </button>
      </div>

      {/* FILTER */}

     {start=="queue" && (<><div className="filter">
          <div className="dropdowns">
          <div className="dropdown">
      <button className="filter-btn" onClick={() => setBool1(!bool1)}>
        {year || 'Select Year'} &nbsp;&nbsp;&nbsp;&#x25BC;
      </button>
      {bool1 && (
        <div className="dropdown-content">
          <a onClick={() => { setYear("PASSOUT"); setBool1(false); }}>PASSOUT</a>
          {generateYearList().map((y) => (
            <a key={y} onClick={() => { setYear(y); setBool1(false); }}>{y}</a>
          ))}
        </div>
      )}
    </div>

        {/* <div className="dropdown">
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
        </div> */}

        <div className="dropdown">
          <button  className="filter-btn dept1">{companyType} &nbsp;&nbsp;  &#x25BC;</button>
          {bool3 && (<div className="dropdown-content">
          <a onClick={()=>{setCompanyType("COMPANY TYPE");setBool3(false)}}>COMPANY TYPE</a>
          <a onClick={()=>{setCompanyType("CORE");setBool3(false)}}>CORE</a>
          <a onClick={()=>{setCompanyType("IT SERVICES");setBool3(false)}}>IT SERVICES</a>
          <a onClick={()=>{setCompanyType("IT PRODUCTS");setBool3(false)}}>IT PRODUCTS</a>
          <a onClick={()=>{setCompanyType("MANAGEMENT");setBool3(false)}}>MANAGEMENT</a>





        </div>)}
        </div>
        </div>

        <div className="search">
            <input id='search-btn' type='checkbox'/>
            <label htmlFor='search-btn'>Show search bar</label>
            <input id='search-bar' type='text' placeholder='Search' value={letter} onChange={(event)=>{setLetter(event.target.value)}}/>
        </div>
</div>





<div className="tab">

<div class="container">
  <ul class="responsive-table">
    <li class="table-header fixed-header">
      <div class="col col-1">Photo</div>
      <div class="col col-2">Details</div>
      <div class="col col-3">Company</div>
      <div class="col col-4">Offer Letter</div>
      <div class="col col-5">Salary</div>
      <div class="col col-6">Approval</div>
    </li>

    {filterData.length==0 && <><p className="norequest">No requests yet, the queue is quiet 🙂</p></>}

    {filterData.map((student)=>(
          <li key={student.roll_no} class="table-row">
          <div class="col col-1"><img onClick={maximizeProfilePic} className="profile_pic" src={"http://127.0.0.1:8000/"+student.profile}/></div>
          <div class="col col-2">
          <p className="p56"><span>ROLL NO:</span> {student.roll_no}</p>
                      <p className="p56"><span>NAME:</span> {student.firstName}</p>
                      <p className="p56"><span>BRANCH:</span> {student.degree}</p>
                      <p className="p56"><span>CGPA:</span> {student.cgpa}</p>
                      <p className="p56"><span>PASSOUT:</span> {student.passout}</p>
                    
                      <p className="p56"><a target="_blank" href={student.linkedin} className="linkedin"><svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg></a></p>
          </div>
          <div class="col col-3"><span className="span1 card company">{student.company}</span></div>
          <div class="col col-4"><img onClick={maximizeProfilePic} className="profile_pic" src={"http://127.0.0.1:8000/"+student.testimonial}/></div>
          <div class="col col-5"><span className="span1 card1   salary">{student.salary} LPA</span></div>
          <div class="col col-6">
            <button onClick={()=>{updateList(student.roll_no,"APPROVED")}} className="noselect0"><span className="text">Approve</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" id="tick"><path d="M223.9 329.7c-2.4 2.4-5.8 4.4-8.8 4.4s-6.4-2.1-8.9-4.5l-56-56 17.8-17.8 47.2 47.2L340 177.3l17.5 18.1-133.6 134.3z"></path></svg></span></button>
            <button onClick={()=>{updateList(student.roll_no,"REJECTED")}}className="noselect"><span className="text">Reject</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button></div>
        </li>
    ))}

  </ul>
</div>
</div>



            
            </>)}



            {/* DASHBOARD */}


            {start=="dashboard" && (<><div className="filter">
          <div className="dropdowns">
          <div className="dropdown">
      <button className="filter-btn" onClick={() => setBool1(!bool1)}>
        {year || 'Select Year'} &nbsp;&nbsp;&nbsp;&#x25BC;
      </button>
      {bool1 && (
        <div className="dropdown-content">
          <a onClick={() => { setYear("PASSOUT"); setBool1(false); }}>PASSOUT</a>
          {generateYearList().map((y) => (
            <a key={y} onClick={() => { setYear(y); setBool1(false); }}>{y}</a>
          ))}
        </div>
      )}
    </div>

        {/* <div className="dropdown">
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
        </div> */}

        <div className="dropdown">
          <button  className="filter-btn dept1">{companyType} &nbsp;&nbsp;  &#x25BC;</button>
          {bool3 && (<div className="dropdown-content">
          <a onClick={()=>{setCompanyType("COMPANY TYPE");setBool3(false)}}>COMPANY TYPE</a>
          <a onClick={()=>{setCompanyType("CORE");setBool3(false)}}>CORE</a>
          <a onClick={()=>{setCompanyType("IT SERVICES");setBool3(false)}}>IT SERVICES</a>
          <a onClick={()=>{setCompanyType("IT PRODUCTS");setBool3(false)}}>IT PRODUCTS</a>
          <a onClick={()=>{setCompanyType("MANAGEMENT");setBool3(false)}}>MANAGEMENT</a>

        </div>)}
        </div>
        </div>

        <div className="search">
            <input id='search-btn' type='checkbox'/>
            <label htmlFor='search-btn'>Show search bar</label>
            <input id='search-bar' type='text' placeholder='Search' value={letter} onChange={(event)=>{setLetter(event.target.value)}}/>
        </div>
</div>


<div className="tab">
<div class="container">
  <ul class="responsive-table">
    <li class="table-header fixed-header">
      <div class="col col-1">Photo</div>
      <div class="col col-2">Details</div>
      <div class="col col-3">Company</div>
      <div class="col col-4">Offer Letter</div>
      <div class="col col-5 filter-parent">Salary<img onClick={orderfun} className="filter" src={filter}></img></div>
      {/* <div class="col col-6">Youtube</div> */}
    </li>

    {filterData11.map((student)=>(
          <li key={student.roll_no} class="table-row">
          <div class="col col-1"><img onClick={maximizeProfilePic} className="profile_pic" src={"http://127.0.0.1:8000/"+student.profile}/></div>
          <div class="col col-2 pad">
          <p className="p56"><span>ROLL NO:</span> {student.roll_no}</p>
                      <p className="p56"><span>NAME:</span> {student.firstName}</p>
                      <p className="p56"><span>BRANCH:</span> {student.degree}</p>
                      <p className="p56"><span>CGPA:</span> {student.cgpa}</p>
                      <p className="p56"><span>PASSOUT:</span> {student.passout}</p>                  
                      <p className="p56"><a target="_blank" href={student.linkedin} className="linkedin"><svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg></a></p>
          </div>
          <div class="col col-3"><span className="span1 card company">{student.company}</span></div>
          <div class="col col-4"><img onClick={maximizeProfilePic} className="profile_pic" src={"http://127.0.0.1:8000/"+student.testimonial}/></div>
          <div class="col col-5"><span className="span1 card1   salary">{student.salary} LPA</span></div>
          {/* <div class="col col-6">
          <Iframe
              width="240"
              height="260"
              src="https://www.youtube.com/embed/3uFDgERY37U"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
        ></Iframe>
          </div> */}
        </li>
    ))}

  </ul>
</div>
</div>
            
            </>)}

            {/* LOADER */}

            {loader && <div class="spinner">
      <span></span>
      <span></span>
      <span></span>
    </div>}

            </div>
        </div>
    );
};


export default CSE;