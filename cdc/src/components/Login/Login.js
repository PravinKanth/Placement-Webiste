import React, { useEffect, useState } from "react";
import "./Login.css";
import loginimage from "../../assets/Illustration.svg";
import kprimage from "../../assets/kpr.jpg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ip from "../../assets/up.svg"
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";


{/* <script type="module" src="encrypt.js"></script> */ }


const Login = () => {
  const [user, setuser] = useState("admin");
  const [cmail, setcmail] = useState("");
  const [cpass, setcpass] = useState("");
  const [dmail, setdmail] = useState("");
  const [dpass, setdpass] = useState("");
  const [smail, setsmail] = useState("");
  const [spass, setspass] = useState("");
  const [srname, setsrname] = useState("");
  const [srmail, setsrmail] = useState("");
  const [srpass, setsrpass] = useState("");
  const [srconfirmpass, setsrconfirmpass] = useState("");
  const [studentState, setStudentState] = useState("login");
  const [adminState, setAdminState] = useState("coordinator");
  const [errorMessage, setErrorMessage] = useState("");

  const [coordinatorErrorMessage, setCoordinatorErrorMessage] = useState("");
  const [directorErrorMessage, setDirectorErrorMessage] = useState("");
  const [studentLoginErrorMessage, setStudentLoginErrorMessage] = useState("");
  const [studentRegisterErrorMessage, setStudentRegisterErrorMessage] = useState("");
  axios.defaults.withCredentials = true;



  const navigate = useNavigate();

  const changeuser = (val) => {
    setuser(val);
  };


  useEffect(() => {
    setErrorMessage("");
    setCoordinatorErrorMessage("");
    setcmail("");
    setcpass("");
    setdmail("");
    setdpass("");
    setsmail("");
    setspass("");
    setsrname("");
    setsrmail("");
    setsrpass("");
    setsrconfirmpass("");
  }, [user, studentState, adminState]);

  useEffect(() => {
    setErrorMessage("");
    setCoordinatorErrorMessage("");
  }, [cmail, cpass, dmail, dpass, smail, spass, srname, srmail, srpass, srconfirmpass]);

  const handleCoordinatorSubmit = (event) => {
    event.preventDefault();
    const coordinatorFormData = {
      coordinatormail: cmail,
      coordinatorpassword: cpass
    }

    axios.post("http://127.0.0.1:8000/coordinatorlogin/", coordinatorFormData, {
      headers: { "Content-Type": "multipart/form-data" },withCredentials:true,
    }).then(response => {
      console.log(response.data);
      if (response.data.message === "Authentication Successful") {
        setCoordinatorErrorMessage("");
        console.log(response.data.name)

        navigate("/coordinator");
      }

      else if (response.data === "E-Mail ID not found!") {
        setCoordinatorErrorMessage("E-Mail ID not found! Kindly reach out to your Director!");
      }

      else {
        setCoordinatorErrorMessage("Invalid Password");
      }
    })
      .catch(error => {
        console.error(error);
        // setErrorMessage("An error occurred");
      });

  };


  const handleDirectorSubmit = (event) => {
    event.preventDefault();
    const directorFormData = {
      directormail: dmail,
      directorpassword: dpass
    }

    axios.post("http://127.0.0.1:8000/directorlogin/", directorFormData, {
      headers: { "Content-Type": "multipart/form-data" },withCredentials: true,
    }).then(response => {
      console.log(response.data);
      if (response.data === "Authentication Successful") {
        setErrorMessage("");

        navigate("/director");
      }

      else if (response.data === "E-Mail ID not found!") {
        setErrorMessage("E-Mail ID not found!");
      }

      else {
        setErrorMessage("Invalid Password");
      }
    })
      .catch(error => {
        console.error(error);
      });

  };


  const handleStudentLoginSubmit = (event) => {
    event.preventDefault();
    const studentLoginFormData = {
      studentloginmail: smail,
      studentloginpassword: spass
    }



    axios.post("http://127.0.0.1:8000/studentlogin/", studentLoginFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,

      }).then(response => {
        console.log(response);
        if (response.data.message === "Authentication Successful") {
          // Cookies.set("sessionid", response.data.sessionid, { expires: 1 });
          console.log(response.data.sessionid);
          console.log(response.data);

          navigate("/student");
        }

        else if (response.data === "E-Mail ID not found!") {
          setErrorMessage("E-Mail ID not found!");
          // Swal.fire("E-Mail ID not found!");
        }

        else {
          setErrorMessage("Invalid Password!");
          // Swal.fire("Invalid Password");
        }
      })
      .catch(error => {
        console.error(error);
        setErrorMessage("An error occurred");
      });



  };

  const handleStudentRegisterSubmit = (event) => {
    event.preventDefault();
    if (srpass != srconfirmpass) {
      Swal.fire("Password doesn't match!");
      return;
    }

    // if (srname=="") {
    //   Swal.fire("Password doesn't match!");
    //   return;
    // }
    const StudentRegisterFormData = {
      studentregistername: srname,
      studentregistermail: srmail,
      studentregisterpassword: srpass
    }

    axios.post("http://127.0.0.1:8000/studentregister/", StudentRegisterFormData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(response => {
      if(response.data==="Exists"){
        Swal.fire("Your Mailid already Exists!");
      }
    })
      .catch(error => {
        console.error(error);
      });


    navigate("/");
    setStudentState("login")

  };




  return (
    <div className="section-login">
      <div className="login">

        <img src={kprimage} className="img-kpr" alt="kpr" />

        <div className="login-container">
          {/* <img src={loginimage} className="img-login" alt="login" /> */}
          <img src={ip} className="img-login" alt="login" />
          <div className="login-right">
            <div className="out">
              <h3 className="login-h3">WELCOME!</h3>

              <input
                id="toggle-on"
                className="toggle toggle-left"
                name="toggle"
                onClick={() => changeuser("admin")}
                type="radio"
                checked={user === "admin"}
              />
              <label htmlFor="toggle-on" className="btn ex">
                Admin
              </label>
              <input
                id="toggle-off"
                className="toggle toggle-right"
                name="toggle"
                onClick={() => changeuser("student")}
                type="radio"
                checked={user === "student"}
              />
              <label htmlFor="toggle-off" className="btn">
                Student
              </label>

              {/* COORDINATOR */}

              {user === "admin" && adminState === "coordinator" && <form onSubmit={handleCoordinatorSubmit} className="login-form">
                <p className="semantic">Login</p>
                <input
                  className="input-style pl"
                  type="email"
                  value={cmail}
                  onChange={(event) => { setcmail(event.target.value); }}
                  placeholder="Email"
                  required
                />
                <input
                  className="input-style pl"
                  type="password"
                  placeholder="Password"
                  value={cpass}
                  onChange={(event) => { setcpass(event.target.value); }}
                  required
                />
                <p className="error">{coordinatorErrorMessage}</p>
                <button className="input-style login-button" type="submit">Login</button>
                {user === "admin" && (<div>
                  <p className="register">Are you a Placement Director? <span onClick={() => { setAdminState("director"); }} className="reg">Login here</span> </p>
                </div>)}
              </form>}


              {/* DIRECTOR */}

              {user === "admin" && adminState === "director" && <form onSubmit={handleDirectorSubmit} className="login-form">
                <p className="semantic">Login</p>
                <input
                  className="input-style pl"
                  type="email"
                  value={dmail}
                  onChange={(event) => { setdmail(event.target.value); }}
                  placeholder="Email"
                  required
                />
                <input
                  className="input-style pl"
                  type="password"
                  placeholder="Password"
                  value={dpass}
                  onChange={(event) => { setdpass(event.target.value); }}
                  required
                />
                <p className="error">{errorMessage}</p>
                <button className="input-style login-button" type="submit">Login</button>
                {user === "admin" && (<div>
                  <p className="register">Are you a Placement Coordinator? <span onClick={() => { setAdminState("coordinator"); }} className="reg">Login here</span> </p>
                </div>)}
              </form>}

              {/* STUDENT LOGIN */}


              {user === "student" && studentState === "login" && <form onSubmit={handleStudentLoginSubmit} className="login-form">
                <p className="semantic">Login</p>
                <input
                  className="input-style pl"
                  type="email"
                  value={smail}
                  onChange={(event) => { setsmail(event.target.value); }}
                  placeholder="Email"
                  required
                />
                <input
                  className="input-style pl"
                  type="password"
                  placeholder="Password"
                  value={spass}
                  onChange={(event) => { setspass(event.target.value); }}
                  required
                />
                <p className="error">{errorMessage}</p>


                <button  className="input-style login-button" type="submit">Login</button>
                {user === "student" && (<div>
                  <p className="register">Don’t have an account? <span onClick={() => { setStudentState("register"); }} className="reg">Sign Up</span> </p>
                </div>)}
              </form>}

              {/* STUDENT REGISTER */}



              {user === "student" && studentState === "register" && <form onSubmit={handleStudentRegisterSubmit} className="login-form log">
                <p className="semantic">Register</p>
                <input
                  className="input-style pl"
                  type="text"
                  value={srname}
                  onChange={(event) => { setsrname(event.target.value); }}
                  placeholder="Name"
                  required
                />
                <input
                  className="input-style pl"
                  type="email"
                  value={srmail}
                  onChange={(event) => { setsrmail(event.target.value); }}
                  placeholder="Email"
                  required
                />
                <input
                  className="input-style pl"
                  type="password"
                  placeholder="Password"
                  value={srpass}
                  onChange={(event) => { setsrpass(event.target.value); }}
                  required
                />

                <input
                  className="input-style pl"
                  type="password"
                  placeholder="Confirm Password"
                  value={srconfirmpass}
                  onChange={(event) => { setsrconfirmpass(event.target.value); }}
                  required
                />


                <button  className="input-style login-button" type="submit">Register</button>
                {user === "student" && (<div>
                  <p className="register">Already have an account? <span onClick={() => { setStudentState("login") }} className="reg">Login</span> </p>
                </div>)}
              </form>}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
