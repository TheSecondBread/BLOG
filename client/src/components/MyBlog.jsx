import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyBlog({ blogs }) {
  const navigate = useNavigate();

  const handleView = (blog) => {
    navigate(`/show?blogId=${blog._id}`);
  };
  const handleEdit=async(blog)=>{
    navigate(`/edit?blogId=${blog._id}`)

  }
  const handleDelete= async (blog)=>{
    const resp = await fetch(`https://blog-x71e.onrender.com/blogs/${blog._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogID: blog._id,
      }),
    });
    if(resp){
      navigate("/myblogs")
    }
  }
  if (!blogs || blogs.length === 0) {
    return <h1>No blogs</h1>;
  }

  return (
    <div>
      {blogs.map((blog, index) => (
        <div key={blog._id}>
          <div
            style={{
              width: "50%",
              backgroundColor: "white",
              marginTop: "50px",
              border: "3px solid black",
              textAlign: "left",
              paddingLeft: "25px",
              paddingBottom: "20px",
              borderRadius: "5px",
            }}
          >
            <h1 style={{ fontSize: "50px" }}>{blog.title}</h1>
            <p
              style={{
                fontSize: "15px",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Written by {blog.user}
            </p>
            <h2>{blog.des}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "2rem",marginBottom:"1rem" }}>
              <a
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => handleView(blog)}
              >
                Read More
              </a>
              <a
                style={{ textDecoration: "underline", cursor: "pointer",color:"green" }}
                onClick={() => handleEdit(blog)}
              >
                Edit
              </a>
              <a
                style={{ textDecoration: "underline", cursor: "pointer",color:"red" }}
                onClick={() => handleDelete(blog)}
              >
                Delete
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
