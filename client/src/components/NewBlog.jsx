import React, { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie"

export default function NewBlog() {
    const navigate = useNavigate()
  const example = `
# My Blog Post

## Introduction
    
Welcome to my blog post. Here is some *italic text* and here is some **bold text**.
    
## List of Topics
    
- Topic 1
- Topic 2
  - Subtopic 2.1
  - Subtopic 2.2
- Topic 3

[GitHub](https://github.com/theSecondBread/)
    
    `;
  const [title, setTitle] = useState("Title");
  const des = useRef("");
  const [markdown, setMarkdown] = useState(example);

  const handleOnchangeTitle = (e) => {
    setTitle(e.target.value);
  };
  useEffect(()=>{
    const token = Cookies.get("jwt")
    if(!token){
      alert("Please Login")
      navigate("/")
    }
  
  })
  const handleOnchangeMarkdown = (e) => {
    
    setMarkdown(e.target.value);
  };

  const getMarkdownText = () => {
    const rawMarkup = marked(markdown);
    return { __html: rawMarkup };
  };
  const handleBlogSubmit= async (e,title,des,markdown)=>{
    e.preventDefault()
    const resp = await fetch("http://localhost:8000/blogs/post",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("jwt")}`
        },
        body:JSON.stringify({
            title:title,
            des:des.current.value,
            markdown:markdown
        })
    })
    const body = await resp.json()
    if(body.msg){
        navigate("/signin")
    }
    else{
        navigate("/")
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          padding: "10px",
        }}
      >
        <div
          style={{
            height: "610px",
            minWidth: "370px",
            border: "5px solid black",
            marginTop: "2rem",
            width: "calc(50% - 3rem)",
            textAlign: "center",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <div className="inputGroup">
            <label style={{ fontSize: "25px" }} className="l">
              Title
            </label>
            <input
              value={title}
              onChange={handleOnchangeTitle}
              style={{
                backgroundColor: "white",
                border: "1px solid black",
                width: "96%",
                color: "black",
              }}
              type="text"
              className="input"
              id="inputTitle"
            />
          </div>
          <div className="inputGroup">
            <label style={{ fontSize: "25px" }} className="l">
              Description
            </label>
            <input
              ref={des}
              style={{
                backgroundColor: "white",
                border: "1px solid black",
                width: "96%",
                color: "black",
              }}
              type="text"
              className="input"
              id="inputDescription"
            />
          </div>
          <h1>Markdown</h1>
          <textarea
            value={markdown}
            onChange={handleOnchangeMarkdown}
            style={{
              width: "99%",
              height: "330px",
              fontSize: "20px",
              textAlign: "start",
            }}
          ></textarea>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "3rem" }}
          >
            <a href="/">
              <button className="button-del">
                <span className="lable-del">cancel</span>
              </button>
            </a>
            <button className="submitBtn" onClick={(e)=>handleBlogSubmit(e,title,des,markdown)}>
              Submit
              <svg
                fill="white"
                viewBox="0 0 448 512"
                height="1em"
                className="arrow"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          style={{
            minWidth: "45%",
            border: "5px solid black",
            height:"610px",
            marginTop: "2rem",
            width: "calc(50% - 3rem)",
            padding: "10px",
            overflow:"scroll",
            overflowX:"hidden",
            borderRadius:"5px"

          }}
        >
          <center>
            <h1>{title}</h1>
          </center>
          <div
            dangerouslySetInnerHTML={getMarkdownText()}
            style={{ padding: "20px" }}
          ></div>
        </div>
      </div>
    </>
  );
}
