import React, { useEffect, useState } from "react";
import "./Student.css";
import formimage from "../../assets/form-image.png";
import Swal from "sweetalert2";
import kprimage from "../../assets/kpr.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import norecords from "../../assets/norecords.png";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Student = () => {
  const navigate=new useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const[testimonial, setTestimonial] = useState(null);
  const [cls,setCls]=useState("na");
  const [cls1,setCls1]=useState("nalive1");
  const [start,setStart]=useState("form");
  const [student,setStudent]=useState([]);
  const [color,setColor]=useState("red");
  const [render1,setRender1]=useState(0);
  const [cur,setCur]=useState(false);
  const [isEmpty,setIsEmpty]=useState(false);
  const [companies,setCompanies]=useState([]);
  const [loader,setLoader]=useState(false);


  const [block, setBlock] = useState(0);
  const [formData, setFormData] = useState({
    // roll:sessionStorage.getItem("studentroll"),
    // firstName: sessionStorage.getItem("studentname"),
    roll:"",
    firstName: "",
    degree: "",
    cgpa: "",
    passout: "",
    linkedin:"",
    company:"",
    salary:"",
    profile:File,
    testimonial:File
  });





  const handlevalues = (event) => {
    const { name, value, type, files } = event.target;

    if(type=='file'){
      console.log(name)
      if(name==='profile') {
        setProfilePic(files[0])
      }
      else{ 
        setTestimonial(files[0])}
    }

    else{
      if(name ==="passout" && (value.length>4)){return;}
      if(name ==="cgpa" && (value<0 || value>10)){return;}
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    console.log(event.target);
  };


  const logout = async () =>{
      const response= await axios.get("http://127.0.0.1:8000/logout/",{
        withCredentials:true,
      });
    navigate("/");

  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoader(false);
  //   }, 1000); 
  
  //   return () => clearTimeout(timer);
  // }, [start]);


  const handleSubmit = (event) => {   

setLoader(true);
    event.preventDefault();

    console.log(profilePic)
    console.log(testimonial)
    formData.profile = profilePic
    formData.testimonial = testimonial

    axios.post('http://127.0.0.1:8000/student/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((response) => {
        console.log(response.data);
        setCur(response.data);
        
        if(response.data=="Exists"){
          toast("Your Data has been already Approved!");

        }
        else{
          setProfilePic(null);
          setTestimonial(null);
    
          setFormData({
            ...formData,
            degree: "",
            cgpa: "",
            passout: "",
            linkedin:"",
            company:"",
            salary:"",
          })
          setCur("Done");
          toast("Successfully Submitted!");
          getStudent();

          // setStart("status");
          
        }
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  // useEffect(()=>{
    
  // },[]);

  useEffect(() => {
      getstudentsession();
      getStudent();
      getcompany();
      
  }, []);

    const getstudentsession = async () => {
      setLoader(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/studentsession/",{
          withCredentials: true,
        });
        console.log(response.data[0]);
        setFormData({
          ...formData,
          roll:response.data[0].roll.toUpperCase(),
          firstName:response.data[0].firstName
        });
      console.log(formData)

      } catch (error) {
        console.log(error);
      }
      // setLoader(false);
    };
  
const getStudent = async() => {
  // setLoader(true);
  try{
    const response = await axios.get("http://127.0.0.1:8000/getstudent/",{
      withCredentials:true,
    })

    if(response.data==="Empty"){
      setIsEmpty(true);
    }
    else{
      setStudent(response.data);
      setIsEmpty(false);
    }

    if (response.data[0].status === "REJECTED") {
      setColor("red");
    } else if (response.data[0].status == "APPROVED") {
      setColor("green");
    } else if (response.data[0].status == "PROCESSING") {
      setColor("blue");
    }
    console.log(response);

  }catch (error) {
    console.log(error);
  }

  // setLoader(false);
}


const getcompany = async() => {
  // setLoader(true);
  try{
    const response = await axios.get("http://127.0.0.1:8000/companydetails/",{
      // withCredentials:true,
    })

    setCompanies(response.data);


    console.log(response);

  }catch (error) {
    console.log(error);
  }

  setLoader(false);
}


const edit = () =>{
  setCur(true);
  setStart("form");
  setFormData({
    roll:student[0].roll_no,
    firstName: student[0].firstName,
    degree: student[0].degree,
    cgpa: student[0].cgpa,
    passout: student[0].passout,
    linkedin:student[0].linkedin,
    company:student[0].company,
    salary:student[0].salary,
  });



}


  return (
    <div className="student-section">
      <div className="student">
        <div className="flex-cont">
        <div className="nav">
            <button onClick={()=>{setCls("nalive");setCls1("na1");setStart("status");}} className={cls}>
              <p>Status</p>
            </button>
            </div>
            <div className="nav1">
            <button onClick={()=>{setCls1("nalive1");setCls("na");setStart("form");setCur(false);setFormData({
                  ...formData,
                  degree: "",
                  cgpa: "",
                  passout: "",
                  linkedin:"",
                  company:"",
                  salary:"",
                  testimonial:null,
                  profile:null
            })}} className={cls1}>
              <p>Form</p>
            </button>
            </div>
        <img src={kprimage} className="img-kpr" alt="kpr" />
        <button class="Btn" onClick={logout}>
            <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div class="text">Logout</div>

        </button>
      </div>
      <h1 className="welcome">WELCOME &nbsp;{formData.firstName} !</h1>
      {start=="form" && (<div key="form" class="subscribe">
        <div className="outer">
      {cur && <div onClick={()=>{
        setStart("status");
      }} class="close-container">
  <div class="leftright"></div>
  <div class="rightleft"></div>
  <label class="close">close</label>
</div>}
</div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">     
                  <div className="roll">
                  <div>
                    <input
                      type="text"
                      className="input1 tr"
                      name="roll"
                      id="roll"
                      // value={formData.roll}
                      // minLength="7"
                      // maxLength="7"
                      placeholder="Roll No"
                      value={formData.roll}
                      // onChange={handlevalues}
                      // required
                      disabled
                    />
                  </div>
                </div>


      <div className="name">
      <div>
        <input
          type="text"
          className="input1 tr"
          name="firstName"
          id="first-name"

          value={formData.firstName}
          placeholder="Name"
          disabled
          // onChange={handlevalues}
          // disabled
          // required
        />
      </div>
    </div>

    <select
        className="input1 sel tr"
        name="degree"
        value={formData.degree}
        onChange={handlevalues}
        required
      >
        <option value="">Select Degree</option>
        <option value="BME">
          B.E - Biomedical Engineering
        </option>
        <option value="Civil">
          B.E - Civil Engineering
        </option>
        <option value="CSE">
          B.E - Computer Science and Engineering
        </option>
        <option value="ECE">
          B.E - Electronics and Communication Engineering
        </option>
        <option value="EEE">
          B.E - Electricals and Electronics Engineering
        </option>
        <option value="Mech">
          B.E - Mechanical Engineering
        </option>
        <option value="AI&DS">
          B.E - Artificial Intelligence and Data Science
          Engineering
        </option>
        <option value="Chemical">
          B.E - Chemical Engineering
        </option>
      </select>

      <div className="percentage">
      <div>
        <input
          type="number"
          className="input1 tr"
          name="cgpa"
          id="cgpa"
          value={formData.cgpa}
          onChange={handlevalues}
          placeholder="CGPA"
          step="0.1"
          required
        />
      </div>
    </div>

    <div className="yop">

      <div>
        <input
          type="number"
          name="passout"
          placeholder="Passout Year"
          id="passout"
          className="input1 tr"
          min="2007"
          max={new Date().getFullYear()+2}
          value={formData.passout}
          onChange={handlevalues}
          
          required
        />
      </div>
    </div>

    <div className="link">
      <div>
        <input
          type="text"
          className="input1 tr"
          name="linkedin"
          id="linkedin"
          value={formData.linkedin}
          placeholder="Linkedin Link"
          onChange={handlevalues}
          required
        />
      </div>
    </div>


    <select
        className="input1 sel tr"
        name="company"
        value={formData.company}
        onChange={handlevalues}
        required
      >
        <option value="">Select Company</option>
        {companies.map((company)=>(
          <option value={company.companyname}>{company.companyname}</option>
        ))}


      </select>



    <div className="salary">
      <div>
        <input
          type="number"
          className="input1 tr"
          name="salary"
          id="salary"
          value={formData.salary}
          placeholder="Salary (in lakhs)"
          step="0.10"
          onChange={handlevalues}
          required
        />
      </div>
    </div>

    <div className="testimonial">
      <div>
      <span className="l414">&nbsp;Offer Letter </span>
        <input
          type="file"
          className="input1 lin1"
          name="testimonial"
          id="testimonial"
          placeholder="Upload your testimonial"  
          onChange={handlevalues}
          // value={testimonial}
          required
        />

      </div>
    </div>

    <div className="profiles">
      <div>
        <span className="l414">&nbsp;&nbsp;Profile </span><input
          type="file"
          className="input1 lin"
          name="profile"
          id="profile"
          placeholder="No file chosen" 
          onChange={handlevalues}
          // value={profilePic}
          required
        />

      </div>
    </div>
                  
      <button className="submit-btn1" type="submit">SUBMIT</button>
            
          </form>
          </div>)}


          {start=="status" && (<>
            {isEmpty ? (<div class="empty-state">
  <div className="empty-state__content">
    <div className="empty-state__icon">
      <img src={norecords} alt=""/>
    </div>
    <div className="empty-state__message">No record has been added yet.</div>
    <div className="empty-state__help">
      Add a new record by simply clicking the form button on top right side.
    </div>
  </div>
</div>):(<div key="status" className="content">
            <div className="card">
              <div className="firstinfo">
                <img src={"http://127.0.0.1:8000/"+student[0].profile} />
                <div className="profileinfo">
                  <h1>{student[0].firstName}</h1>
                  <h3>{student[0].roll_no}</h3>
                  <p className="bio"><span>Degree: </span>{student[0].degree}</p>
                  <p className="bio"><span>CGPA: </span>{student[0].cgpa}</p>
                  <p className="bio"><span>Passout: </span>{student[0].passout}</p>
                  <p className="bio"><span>Linkedin Link: </span>{student[0].linkedin}</p>
                  <p className="bio"><span>Company: </span>{student[0].company}</p>
                  <p className="bio"><span>Company Type: </span>{student[0].type}</p>
                  <p className="bio"><span>Salary: </span>{student[0].salary}LPA</p>
                  <p className="bio"><span>Status: </span><span style={{color}}className="span1">{student[0].status}</span></p>
                  {student[0].status!="APPROVED" && (
                  
                    <button onClick={edit} className="edit-button">
               <svg className="edit-svgIcon" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
</button>)}
                  
                </div>
                <img className="offer" src={"http://127.0.0.1:8000/"+student[0].testimonial}/>
              </div>
            </div>
            <div className="badgescard"> 
            </div>
          </div>)}
          </>
          
          )}

{cur=="Exists" && <div>
       <ToastContainer />
     </div>}

     {cur=="Done" && <div>
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
};

export default Student;
