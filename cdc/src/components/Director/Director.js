import React from "react";
import "./Director.css";
import { useState,useEffect } from "react";
import kprimage from "../../assets/kpr.jpg";
import add1 from "../../assets/add.png";
import add2 from "../../assets/add1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import filter from "../../assets/filter.png";

const Director = () =>{

    const [menuOpen, setMenuOpen] = useState(false);
    const [addField,setAddField]=useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [coordinatorList, setCoordinatorList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [current,setCurrent]=useState("manage");
    const [bold,setBold]=useState("bold");
    const [bold1,setBold1]=useState("");
    const [bold2,setBold2]=useState("");
    const [state,setState]=useState("records");
    const [students, setStudents] = useState([]);
    const [year,setYear]=useState("PASSOUT");
    const [department,setDepartment]=useState("DEPARTMENT");
    const [companyType,setCompanyType]=useState("COMPANY TYPE");
    const [bool1,setBool1]=useState(true);
    const [bool2,setBool2]=useState(true);
    const [bool3,setBool3]=useState(true);
    const [letter,setLetter]=useState("");
    const [back,setBack]=useState("");
    const [company_Name,setCompany_Name]=useState("");
    const [company_Type,setCompany_Type]=useState("");
    const [addCompany,setAddCompany]=useState(false);
    const [companies,setCompanies]=useState([]);
    const [cur,setCur]=useState("");
    const [order,setOrder]=useState(1);
    const [filterData1,setFilterData1]=useState([]);
    const [last,setLast]=useState([]);
    const [loader,setLoader]=useState(false);



    const [maximizedProfilePic, setMaximizedProfilePic] = useState(null);
    const [cardContent, setCardContent] = useState({
      title: "Card Title",
      description: "Card Description",
    });

    const [coordinator,setCoordinator]=useState({
      coordinatorname:"",
      coordinatormailid:"",
      coordinatorpassword:"",
      coordinatordepartment:""
    });
  
    console.log(companies);
    const handleHover = () => {
      setIsHovered(!isHovered);
    };

    const navigate = new useNavigate();

    const generateYearList = () => {
      const currentYear = new Date().getFullYear();
      const years = [];
  
      for (let i = currentYear+2;i>currentYear-5 ; i--) {
        years.push(i.toString());
      }
  
      return years;
    };


  

    const handleForm = (event) =>{
      const {name,value}=event.target;
      setCoordinator({
        ...coordinator,
        [name]:value
      });

    };



    const handleChange = (event) => {
      const { name, value } = event.target;
      setCardContent({
        ...cardContent,
        [name]: value,
      });
    };

    const handleMenuClick = (num) => {
      setMenuOpen(!menuOpen);
      if(num==0){
        setBold("bold");setBold1("");setBold2("");setState("records");setAddField(false);setAddCompany(false);
      }                 
      if(num==1){
        setBold1("bold");setBold("");setBold2("");setState("company");setAddField(false);setAddCompany(false);
      }

      if(num==2){
        setBold2("bold");setBold("");setBold1("");setState("manage");setAddField(false);setAddCompany(false);
      }
    };


    const handleEdit = (coordinatorname,coordinatormailid,coordinatorpassword,coordinatordepartment) => {
      setAddField(true);
      setIsEditing(true);
      setCoordinator({
        coordinatorname:coordinatorname,
        coordinatormailid:coordinatormailid,
        coordinatorpassword:coordinatorpassword,
        coordinatordepartment:coordinatordepartment
      });
    }

    const ordinaryEdit = ()=>{
      setAddField(true);
      setIsEditing(false);
      setCoordinator({
        coordinatorname:"",
        coordinatormailid:"",
        coordinatorpassword:"",
        coordinatordepartment:""
      });

    }

    const addcompany = () => {
      setAddCompany(true);
    }

    const handleSubmit = (event) => {
      event.preventDefault();

      axios.post("http://127.0.0.1:8000/registercoordinator/",coordinator,{
        headers:{"Content-Type":"multipart/form-data"}
      }).then(response=>{
        console.log(response);
      })
      .catch(error=>{
        console.log(error);
      })


      setCoordinator({
        coordinatorname:"",
        coordinatormailid:"",
        coordinatorpassword:"",
        coordinatordepartment:""
      });

      setAddField(false);

    };


    const handleSubmit1 = (event) => {
      event.preventDefault();
      const company={
        companyname:company_Name,
        companytype:company_Type
      }

      axios.post("http://127.0.0.1:8000/company/",company,{
        headers:{"Content-Type":"multipart/form-data"}
      }).then(response=>{
        console.log(response);
        setCur(response.data);
        if(response.data=="Exists"){
          toast("Already Exists");
          // Swal.fire("Exists");
        }
      })
      .catch(error=>{
        console.log(error);
      })


      setAddCompany(false);

      setCompany_Name("");
      setCompany_Type("");

    };
useEffect(()=>{
  companydetails();
},[addCompany]);

    const companydetails = async () =>{
      const response= await axios.get("http://127.0.0.1:8000/companydetails/",{
        // withCredentials:true,
      });

      setCompanies(response.data);
      console.log(response.data);
      console.log(companies);


  };

    const fetchCoordinators = () => {
      axios.get("http://127.0.0.1:8000/coordinators/").then((response) => {
        setCoordinatorList(response.data);
        console.log(coordinatorList);
      }).catch((error) => {
        console.log(error);
      });
    };




    const handleDeleteCoordinator = (coordinatormailid) => {

      const mailid=new FormData();
      mailid.append("coordinatormailid",coordinatormailid);
      axios.post("http://127.0.0.1:8000/delete_coordinator/",mailid,{
        headers:{"Content-Type":"multipart/form-data"}
      })
        .then((response) => {

          setCoordinatorList((prevCoordinatorList) =>
            prevCoordinatorList.filter((coordinator) => coordinator.coordinatormailid !== coordinatormailid)
          );
          console.log("Coordinator deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting coordinator:", error);
        });
    };

    useEffect(() => {
      fetchCoordinators();
    },[coordinator]);


    const logout = async () =>{
      const response= await axios.get("http://127.0.0.1:8000/logout/",{
        withCredentials:true,
      });
    navigate("/");

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
      fetchStudents();
    }, []);
  
  
    const fetchStudents = async () => {
      setLoader(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/placedstudents/");
        setStudents(response.data);
  
      } catch (error) {
        console.log(error);
      }

      setLoader(false);
    };
  

    useEffect(()=>{
      rendering();
    },[year,companyType,department,students,letter]);
    


    const rendering = () =>{ 
      let filterData=students; 
      
      
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

    setLast(filterData);

    setFilterData1(filterData);
  }


    const orderfun = () => {

      setOrder((order+1)%3);

      if(order==0){
        setFilterData1(last);
        
      }

      if(order==1){
        const sortedEmployees = [...filterData1].sort((a, b) => a.salary - b.salary);
        setFilterData1(sortedEmployees);
        
      }
      if(order==2){
        const sortedEmployees = [...filterData1].sort((b,a) => a.salary - b.salary);
        setFilterData1(sortedEmployees);     

      }
    }



  

  
    return (
        <div className="director-section">
            <div className="director">
            <div className={back}></div>
            <div className="head">
            <div className="sidebar">
                <div class="nav">
                    <input type="checkbox" checked={menuOpen} onChange={handleMenuClick} />
                    <span></span>
                    <span></span>
                    <div class="menu">
                        <li><a className={bold} onClick={()=>handleMenuClick(0)}>RECORDS</a></li>
                        <li><a className={bold1} onClick={()=>handleMenuClick(1)}>COMPANY</a></li>
                        <li><a className={bold2} onClick={()=>handleMenuClick(2)}>MANAGE</a></li>
                        <button class="Btn" onClick={logout}>
            <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div class="text">Logout</div>

        </button>
                    </div>
                </div>
              </div>
              <div>
                <img src={kprimage} className="img-kpr" alt="kpr" />
              </div>
            </div>



{/* RECORDS */}    
<>
{state=="records" && 
<>

<h1 className="placed">PLACED STUDENTS IN BE / BTECH</h1>
        <div className="filter">
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

        <div className="dropdown">
          <button  className="filter-btn dept">{department} &nbsp;&nbsp;  &#x25BC;</button>
          {bool2 && (<div className="dropdown-content">
          <a onClick={()=>{setDepartment("DEPARTMENT");setBool2(false)}}>DEPARTMENT</a>
          <a onClick={()=>{setDepartment("AI&DS");setBool2(false)}}>AI&DS</a>
          <a onClick={()=>{setDepartment("BME");setBool2(false)}}>BME</a>
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
          <a onClick={()=>{setCompanyType("CORE");setBool3(false)}}>CORE</a>
          <a onClick={()=>{setCompanyType("IT SERVICES");setBool3(false)}}>IT SERVICES</a>
          <a onClick={()=>{setCompanyType("IT PRODUCTS");setBool3(false)}}>IT PRODUCTS</a>
          <a onClick={()=>{setCompanyType("MANAGEMENT");setBool3(false)}}>MANAGEMENT</a>

        </div>)}
        </div>
        </div>

        <div className="search">
            <input id='search-btn' type='checkbox'/>
            <label for='search-btn'>Show search bar</label>
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
    </li>

    {filterData1.map((student)=>(
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
        </li>
    ))}

  </ul>
</div>
</div></>
}
</>



{/* COMPANY */}

{state==="company" && <>
<div className="company-content">
<img className="addimage1" onClick={addcompany} src={add2}></img>
{/* {companies.map((company)=>(
  <li key={company.companyname}>
  <p>{company.companyname}</p>
  <p>{company.companytype}</p>
  </li>
))} */}

<div className="grid-2">
{companies.map((company)=>(
  <div key={company.companyname} className="card">
  <div className="card1">
   <p>{company.companyname}</p>
   <p className="small">{company.companytype}</p>
   <div className="go-corner">
     <div className="go-arrow">
       →
     </div>
   </div>
 </div>
</div>
))}
</div>

</div>
</>}

              

      {/* Display cards for each coordinator */}

     {state=="manage" && <><div className="director-content">
              <img className="addimage" onClick={ordinaryEdit} src={add1}></img><div className="flip-grid">{coordinatorList.map((coordinator) => (
      
        <div className="flip-card"  key={coordinator.coordinatormailid}>
            <div className="flip-card-inner">
                  <div className="flip-card-front">
                      <p className="detail-title">{coordinator.coordinatordepartment}</p>
                  </div>
                  <div className="flip-card-back">
                    <div className="flip-flex">
                  <ion-icon onClick={()=>handleEdit(coordinator.coordinatorname,coordinator.coordinatormailid,coordinator.coordinatorpassword,coordinator.coordinatordepartment)} className="flip-edit" name="create-outline"></ion-icon>
                  <ion-icon onClick={()=>handleDeleteCoordinator(coordinator.coordinatormailid)} name="trash-bin-outline"></ion-icon>
                    </div>
                      <p className="detail-title1">{coordinator.coordinatorname}</p>
                      <div className="cen">
                            <p className="innerdetails"><span>Mail ID:</span> {coordinator.coordinatormailid}</p>
                            <p className="innerdetails"><span>Password:</span> {coordinator.coordinatorpassword}</p>
                      </div>
                  </div>
            </div>
      </div>
      


        
        
        ))}</div></div></>}
    

    {/* FORM */}
    {addField &&
    (<div className="director-container">
	    <div className="director-card">
        <div onClick={()=>{setAddField(false);}} className="closebutton">X</div>
		<form className="card-form" onSubmit={handleSubmit}>
			<div className="input">
				<input type="text" className="input-field" name="coordinatorname" value={coordinator.coordinatorname} onChange={handleForm} required/>
				<label className="input-label">Full name</label>
			</div>
              
			<div className="input">
				<input type="text" className="input-field ju" name="coordinatormailid" value={coordinator.coordinatormailid} onChange={handleForm} required disabled={isEditing}/>
				<label className="input-label">Email</label>
			</div>
			<div class="input">
				<input type="password" className="input-field" name="coordinatorpassword" value={coordinator.coordinatorpassword} onChange={handleForm} required/>
				<label className="input-label">Password</label>
			</div>

      <div className="degree ju1">
         <div className="input">
         <label className="input-label">Degree</label>
      </div>
                  <select
                    className="input input-field just"
                    name="coordinatordepartment"
                    value={coordinator.coordinatordepartment}
                    onChange={handleForm}
                    required
                  >
                    <option value="">Select Degree</option>
                    <option value="BME">
                      BME
                    </option>
                    <option value="CIVIL">
                      Civil
                    </option>
                    <option value="CSE">
                      CSE
                    </option>
                    <option value="ECE">
                      ECE
                    </option>
                    <option value="EEE">
                      EEE
                    </option>
                    <option value="MECH">
                      Mech
                    </option>
                    <option value="AI&DS">
                      AI & DS
                      
                    </option>
                    <option value="CHEMICAL">
                      Chemical
                    </option>
                  </select>
                </div>


			<div className="action">
				<button type="submit" className="action-button">Done</button>
			</div>
		</form>
	</div>
</div>)}

{/* ADDCOMPANY */}

{addCompany &&
    (<div className="director-container">
	    <div className="director-card company-card">
        <div onClick={()=>{setAddCompany(false);}} className="closebutton">X</div>
		<form className="card-form" onSubmit={handleSubmit1}>
			<div className="input">
				<input type="text" className="input-field" name="company_Name" value={company_Name} onChange={(e)=>{setCompany_Name(e.target.value)}} required/>
				<label className="input-label">Company Name</label>
			</div>
              
			{/* <div className="input">
				<input type="text" className="input-field" name="company_Type" value={company_Type} onChange={(e)=>{setCompany_Type(e.target.value)}} required />
				<label className="input-label">Company Type</label>
			</div> */}

      <div className="input">
      <select 
        className="input input-field just fin"
        name="type"
        value={company_Type}
        onChange={(e)=>{setCompany_Type(e.target.value)}}
        required
      >
        <option value="">Company Type</option>
        <option value="IT SERVICES">IT SERVICES</option>
        <option value="IT PRODUCTS">IT PRODUCTS</option>
        <option value="CORE">CORE</option>
        <option value="MANAGEMENT">MANAGEMENT</option>
     
      </select>
    </div>
			
			<div className="action">
				<button type="submit" className="action-button">Done</button>
			</div>
		</form>
	</div>
</div>)}

      {cur=="Exists" && <div>
       <ToastContainer />
     </div>}



     {/* LOADER */}

     {loader &&<div class="spinner">
      <span></span>
      <span></span>
      <span></span>
    </div>}

            </div>
        </div>
    );
}

export default Director;