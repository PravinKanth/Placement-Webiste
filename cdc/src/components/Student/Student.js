import React, { useState } from "react";
import "./Student.css";
import formimage from "../../assets/form-image.png";
import Swal from "sweetalert2";
import kprimage from "../../assets/kpr.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Student = ({setstudentbool}) => {
  const navigate=new useNavigate();
  const [profilePic, setProfilePic] = useState(null)
  const[testimonial, setTestimonial] = useState(null)
  const [cls,setCls]=useState("na")
  const [cls1,setCls1]=useState("nalive1")
  const [start,setStart]=useState("form");

  const [block, setBlock] = useState(0);
  const [formData, setFormData] = useState({
    roll:"",
    firstName: "",
    // gender: "",
    degree: "",
    cgpa: "",
    passout: "",
    linkedin:"",
    company:"",
    salary:"",
    type:"",
    profile:File,
    testimonial:File
  });

  // console.log(formData.profile)

  // const handleclick = (event, increment) => {
  //   // event.preventDefault();
    
  //   if (block === 0) {
  //     const { roll,firstName, gender, degree, cgpa, passout,linkedin,type } = formData;
      
  //     // Check if any of the required fields are empty
  //     if (firstName.trim() === ""){return;} 
  //     if (degree === ""){return;} 
  //     if (cgpa === ""){return;} 
  //     //   if (percentage === percentage<0 || >10){Swal.fire("Please enter the valid CGPA");return;} 
  //     if (passout === ""){return;} 
  //     if (linkedin === ""){return;} 
      
  //   //   if (passout < 2007 || passout > new Date().getFullYear() ){Swal.fire("Please enter the valid passout year");return;} 
  //   }
    
  //   setBlock((prevBlock) => prevBlock + increment);
  // };

  const handlevalues = (event) => {
    const { name, value, type, files } = event.target;

    if(type=='file'){
      // setFormData((prevData)=>({
      //   ...prevData,
      //   [name]:files[0],
      // }));
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
    // console.log(name);
    // console.log(value);
    if(name ==="passout" && (value.length>4)){return;}
    if(name ==="cgpa" && (value<0 || value>10)){return;}
    setFormData((prevData) => ({
      ...prevData,
      
      [name]: value,
    }));
    console.log(formData.profile)
  };


  const logout = () =>{
    setstudentbool(false);
    navigate("/");

  };


  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log(profilePic)
    const formDataToSend =new FormData();

    // for(const key in formData){
    //   formDataToSend.append(key,formData[key]);
    // }
    // formDataToSend.append('profile', files[0])

    console.log(profilePic)
    console.log(testimonial)
    formData.profile = profilePic
    formData.testimonial = testimonial
    axios.post('http://127.0.0.1:8000/student/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      // setstudentbool(false);
      // navigate("/");
      const formDataValues = {};
      for (const [key, value] of formDataToSend.entries()) {
        formDataValues[key] = value;
      }
    
      console.log("dooooo");
      console.log(formDataValues);
  };



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
            <button onClick={()=>{setCls1("nalive1");setCls("na");setStart("form");}} className={cls1}>
              <p>Form</p>
            </button>
            </div>
        <img src={kprimage} className="img-kpr" alt="kpr" />
        <button class="Btn" onClick={logout}>
            <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div class="text">Logout</div>

        </button>
      </div>
      <h1>WELCOME &nbsp;{sessionStorage.getItem("studentname")} !</h1>
      {start=="form" && (<div class="subscribe">
          <form onSubmit={handleSubmit} encType="multipart/form-data">     
                  <div className="roll">
                  <div>
                    <input
                      type="text"
                      className="input1 tr"
                      name="roll"
                      id="roll"
                      // value={formData.roll}
                      value={sessionStorage.getItem("studentroll")}
                      // minLength="7"
                      // maxLength="7"
                      // placeholder="Roll No"
                      // onChange={handlevalues}
                      disabled
                      required
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
          value={sessionStorage.getItem("studentname")}
          // placeholder="Name"
          // onChange={handlevalues}
          disabled
          required
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
        <option value="BIO-MEDICAL">
          B.E - Biomedical Engineering
        </option>
        <option value="CIVIL">
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
        <option value="MECH">
          B.E - Mechanical Engineering
        </option>
        <option value="AI & DS">
          B.E - Artificial Intelligence and Data Science
          Engineering
        </option>
        <option value="CHEMICAL">
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

    <div className="company">
      <div>
        <input
          type="text"
          className="input1 tr"
          name="company"
          id="company"
          value={formData.company}
          placeholder="Company Name"
          onChange={handlevalues}
          required
        />
      </div>
    </div>

    <div className="company-type">
      <select
        className="sel1 tr"
        name="type"
        value={formData.type}
        onChange={handlevalues}
        required
      >
        <option value="">Company Type</option>
        <option value="IT">IT</option>
        <option value="NON - IT">Non - IT</option>
        {/* <option value="TRANSGENDER">Transgender</option> */}
      </select>
    </div>

    <div className="salary">
      <div>
        <input
          type="number"
          className="input1 tr"
          name="salary"
          id="salary"
          value={formData.salary}
          placeholder="Salary"
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
          required
        />

      </div>
    </div>

    <div className="profiles">
    {/* <div className="label1">
        <label>Profile</label>
      </div> */}
      <div>
        <span className="l414">&nbsp;&nbsp;Profile </span><input
          type="file"
          className="input1 lin"
          name="profile"
          id="profile"
          placeholder="No file chosen" 
          onChange={handlevalues}
          required
        />

      </div>
    </div>
                  
      <button class="submit-btn1" type="submit">SUBMIT</button>
            
          </form>
          </div>)}
      </div>
    </div>
  );
};

export default Student;
