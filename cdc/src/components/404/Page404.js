import React from "react";
import "./Page404.css";
import { useNavigate } from "react-router-dom";

const Page404 = ()=>{
    const navigate= new useNavigate();
    return(
        <section class="page_4041">
            
  <div class="container12">
  <h1 class="text-center1">404 NOT FOUND!</h1>
    <div class="row"> 
    <div class="col-sm-12 ">
    <div class="col-sm-10 col-sm-offset-1  text-center">
    <div class="four_zero_four_bg">
      
    
    
    </div>
    
    <div class="contant_box_404">
    <h3 class="h2">
    Look like you're lost
    </h3>
    
    <p>The page you're looking for is not available!</p>
    
    <a onClick={()=>{navigate("/")}} class="link_404">Go to Home</a>
  </div>
    </div>
    </div>
    </div>
  </div>
</section>
    );
};

export default Page404;