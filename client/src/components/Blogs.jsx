import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import Cookies from "js-cookie"
export default function Blogs() {
  const [blogs,setBlogs] = useState([])

  useEffect(()=>{
    fetchBlogs()
  },[])
  const fetchBlogs =async ()=>{
    const resp = await fetch("http://localhost:8000/blogs")
    const blogs = await resp.json()
    setBlogs(blogs)
  }
  return (
    <div style={{marginBottom:"40px"}}>
      <a href="/new">
        {Cookies.get("jwt")?<button style={{marginRight:"53%",marginTop:"50px",borderRadius:"10px"}}>Add New Blog</button>:<div style={{marginTop:"50px"}}></div>}
      
      </a>
      <Blog blogs={blogs}></Blog>

    </div>
  );
}
