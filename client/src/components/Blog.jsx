import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { TfiPinterestAlt } from "react-icons/tfi";
import { FaGooglePlus } from "react-icons/fa";
export default function Blog({ blogs }) {
  const navigate = useNavigate();

  const handleView = (blog) => {
    navigate(`/show?blogId=${blog._id}`);
  };

  if (!blogs || blogs.length === 0) {
    return <h1>No blogs</h1>;
  }

  return (
    <div>
      {blogs.map((blog, index) => (
        <div key={blog._id}>
          <div
            style={{
              width: "60%",
              backgroundColor: "white",
              marginTop: "50px",
              border: "3px solid black",
              textAlign: "left",
              paddingLeft: "55px",
              paddingBottom: "20px",
              borderRadius: "5px",
            }}
          >
            <h1 style={{ fontSize: "50px", marginBottom: "0px" }}>
              {blog.title}
            </h1>
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
      <a style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => handleView(blog)}>
        Read More
      </a>
      <p style={{ display: 'flex', alignItems: 'center', gap: "10px", margin: 0 }}>
        Share:
        <a   href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blog.url)}`} style={{ marginLeft: "10px",color:"black" }} target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(blog.url)}`} style={{ marginLeft: "10px",color:"black" }} target="_blank" rel="noopener noreferrer">
          <TfiPinterestAlt />
        </a>
        <a href={`https://plus.google.com/share?url=${encodeURIComponent(blog.url)}`} style={{ marginLeft: "10px",color:"black" }} target="_blank" rel="noopener noreferrer">
          <FaGooglePlus />
        </a>
      </p>
    </div>
          </div>
        </div>
      ))}
    </div>
  );
}
