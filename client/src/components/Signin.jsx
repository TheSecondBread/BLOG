import React, { useRef } from "react";
import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom"
export default function Signin() {
    const email = useRef(null)
    const navigate = useNavigate()
    const password = useRef(null)

    const handleUserSignin=async (e,email,password)=>{
      e.preventDefault()
        const resp = await fetch("http://localhost:8000/user/signin",{
            headers: {
                "Content-Type": "application/json",
              },
            method:"POST",
            body:JSON.stringify({
                email:email.current.value,
                password:password.current.value
            })
        })
        const data = await resp.json()
        console.log(data)
        if(data.msg=="invalid username"){
          navigate("/signin")
        }
        else{
          Cookies.set("jwt",data.token)
        navigate("/")
        }
    }
  return (
    <div className="container">
    <div className="card">
      <h3 className="title">Sign In</h3>
      <form>
        <div className="inputGroup">
          <label htmlFor="inputEmail" className="label">Email address</label>
          <input type="email" className="input" id="inputEmail" aria-describedby="emailHelp" ref={email} />
        </div>
        <div className="inputGroup">
          <label htmlFor="inputPassword" className="label">Password</label>
          <input type="password" className="input" id="inputPassword" ref={password} />
        </div>
        <button type="submit" className="button" onClick={(e)=>handleUserSignin(e,email,password)}>Sign In</button>
      </form>
    </div>
  </div>
  );
}
