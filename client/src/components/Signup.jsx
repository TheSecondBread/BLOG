import React, { useRef } from "react";
import {useNavigate} from "react-router-dom"
export default function Signup() {
    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const navigate = useNavigate()
    const handleUserSignup=async (e,name,email,password)=>{
        e.preventDefault()
        const resp = await fetch("http://localhost:8000/user/signup",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name:name.current.value,
                email:email.current.value,
                password:password.current.value
            })

        })
        const data = await resp.json()
        console.log(data)
        navigate("/signin")
    }
  return (
    <div className="container">
      <div className="card">
        <h3 className="title">Sign Up</h3>
        <form>
          <div className="inputGroup">
            <label  className="label">
              Username
            </label>
            <input type="text" className="input" ref={name} />
          </div>
          <div className="inputGroup">
            <label htmlFor="inputEmail" className="label">
              Email address
            </label>
            <input
            ref={email}
              type="email"
              className="input"
              id="inputEmail"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="inputPassword" className="label">
              Password
            </label>
            <input type="password" className="input" id="inputPassword" ref={password}/>
          </div>
          <button type="submit" className="button" onClick={(e)=>handleUserSignup(e,name,email,password)}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
