import React from "react";
import "./Director.css";
import { useState,useEffect } from "react";
import kprimage from "../../assets/kpr.jpg";
import add1 from "../../assets/add.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Director = () =>{

    const [menuOpen, setMenuOpen] = useState(false);
    const [addField,setAddField]=useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [coordinatorList, setCoordinatorList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [current,setCurrent]=useState("manage");
    const [bold,setBold]=useState("bold");
    const [bold1,setBold1]=useState("");
    const [state,setState]=useState("records");
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
  
    const handleHover = () => {
      setIsHovered(!isHovered);
    };

    const navigate = new useNavigate();


  

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
        setBold("bold");setBold1("");setState("records");
      }
      if(num==1){
        setBold1("bold");setBold("");setState("manage");;
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

    const fetchCoordinators = () => {
      axios.get("http://127.0.0.1:8000/coordinators/").then((response) => {
        setCoordinatorList(response.data);
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


    const logout = () =>{
      navigate("/");
    }

  
    return (
        <div className="director-section">
            <div className="director">
            <div className="head">
            <div className="sidebar">
                <div class="nav">
                    <input type="checkbox" checked={menuOpen} onChange={handleMenuClick} />
                    <span></span>
                    <span></span>
                    <div class="menu">
                        <li><a className={bold} onClick={()=>handleMenuClick(0)}>RECORDS</a></li>
                        <li><a className={bold1} onClick={()=>handleMenuClick(1)}>MANAGE</a></li>
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

           {current==="manage" && (<div className="director-content">
              <img className="addimage" onClick={ordinaryEdit} src={add1}></img>
              

      {/* Display cards for each coordinator */}

     {state=="manage" && <>{coordinatorList.map((coordinator) => (
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
        
        
        ))}</>}
    

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
</div>)}</div>)}
            </div>
        </div>
    );
}

export default Director;