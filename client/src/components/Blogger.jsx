import React, { useEffect,useState } from 'react'
import Blog from './Blog'
import Nav from './Nav'
import { useLocation,useParams } from 'react-router-dom';

export default function Blogger() {
    const [blogs,setBlogs] = useState([])
    const location = useLocation();
    let { user }= useParams()
    console.log(user)
    // console.log(params)

    useEffect(()=>{
      fetchBlogs()
    },[])
    const fetchBlogs =async ()=>{
      const resp = await fetch(`http://localhost:8000/blogs/show/${user}`)
      const blogs = await resp.json()
      setBlogs(blogs)
      console.log(blogs)
    }
  return (
    <>
    <Nav></Nav>
    <center>
        <h1 style={{fontSize:"60px"}}>{user}</h1>
        <Blog blogs={blogs}></Blog>
    </center>
    </>
  )
}
