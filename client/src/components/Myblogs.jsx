import React, { useEffect, useState } from 'react'
import MyBlog from "./MyBlog";
import Cookies from "js-cookie"
import Nav from "./Nav"
export default function Myblogs() {
    const [blogs,setBlogs] = useState([])
    useEffect(()=>{
        fetchBlogs()
    },[])
    const fetchBlogs =async ()=>{
        const resp = await fetch("https://blog-x71e.onrender.com/blogs/myblogs",{
            method:"POST",
            headers:{"CONTENT-TYPE":"application/json",
                "Authorization":`Bearer ${Cookies.get("jwt")}`
            }
        })
        const blogs = await resp.json()
        setBlogs(blogs)
    }
  return (
    <>
    <Nav></Nav>
    <center style={{marginBottom:"40px"}}>
    <MyBlog blogs = {blogs}></MyBlog>
    </center>
    </>
  )
}
