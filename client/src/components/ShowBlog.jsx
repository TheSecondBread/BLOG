import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { marked } from "marked";
import Nav from "./Nav";
import Cookies from "js-cookie"
export default function ShowBlog() {
  const [curBlog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const [currComm,setComm] = useState([])
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const blogId = params.get("blogId");
  const comment = useRef(null);
  const handlePostComment = async () => {
    if(!Cookies.get("jwt")){
      alert("Sign in")
      navigate(`/signin`)
    }
    else{
    const resp = await fetch("https://blog-x71e.onrender.com/comment/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("jwt")}`
      },
      body: JSON.stringify({
        body: comment.current.value,
        user: "user1",
        blogID: blogId,
      }),
    });
    // const data = await resp.json();
    fetchComments()}
  };
  const fetchComments = async () => {
    const resp = await fetch(`https://blog-x71e.onrender.com/comment/${blogId}`);
    const data = await resp.json();
    setComm(data)
  };

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [blogId]); // Add blogId as a dependency

  const fetchBlog = async () => {
    try {
      const resp = await fetch(`https://blog-x71e.onrender.com/blogs/${blogId}`);
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const data = await resp.json();
      setBlog(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!curBlog) {
    return <div>Loading...</div>;
  }

  // Convert markdown to HTML using marked
  const renderedMarkdown = marked(curBlog.markdown);

  return (
    <div style={{ justifyContent: "center" }}>
      <Nav></Nav>

      <div
        style={{
          width: "70%",
          border: "3px solid black",
          borderRadius: "30px",
          marginTop: "50px",
          marginLeft: "15%",
        }}
      >
        <center>
          <h1>{curBlog.title}</h1>
        </center>
        <div
          style={{ padding: "40px" }}
          dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
        />
      </div>

      <div
        style={{
          justifyContent: "center",
          marginLeft: "15%",
          marginBottom: "3rem",
        }}
      >
        <h1>Comments</h1>
        <div style={{ display: "flex" }}>
          <input
            ref={comment}
            placeholder="Add Comment"
            style={{
              width: "50%",
              border: "none",
              borderBottom: "2px solid black",
              outline: "none",
              fontSize: "25px",
            }}
          ></input>
          <button onClick={() => handlePostComment(comment)}>Comment</button>
        </div>
        <div className="comments">
            {currComm.map((com)=>(
               <div key={com._id} className="comment" style={{paddingLeft:"25px"}}>
               <strong>{com.user}</strong>
               <p>{com.body}</p>
             </div>

            ))}
         
        </div>
      </div>
    </div>
  );
}
