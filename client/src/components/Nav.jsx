import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom"
export default function Nav() {
  const navigate = useNavigate()
  const [currState,setState] = useState("not logged")
  useEffect(()=>{
    checkLoggedInState()
  },[])
  const checkLoggedInState = () => {
  
    if (Cookies.get("jwt")) {
      setState("logged");
    }
    else{
      setState("not logged")
    }

  };
  const handleLogOut = (e)=>{
    e.preventDefault();
    Cookies.remove("jwt")
    checkLoggedInState()
    navigate("/")
  }
  return (
      <div style={{ backgroundColor: "#2e2e2e",color:"white",padding:"15px" }}>
        <nav style={{gap:"5%",display:"flex",fontSize:"25px",marginRight:"auto",color:"white"}}>
            <a href="/">Home</a>
            {currState==="not logged"?<a href="/signin">Sign in</a>:<a href="/new">New Blog</a>}
            {currState==="not logged"?<></>:<a href="/myblogs" >My Blogs</a>}
            {currState==="not logged"?<a href="/signup">Sign up</a>:<a onClick={(e)=>handleLogOut(e)} style={{cursor:"pointer"}}>Log out</a>}
        </nav>
      </div>
)}
