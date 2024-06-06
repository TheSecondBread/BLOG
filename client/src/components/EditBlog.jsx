import React, { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import { useLocation, useNavigate } from "react-router-dom";
export default function EditBlog() {
  const example = `# hello`;
  const [title, setTitle] = useState("Title");
  const des = useRef("");
  let _id = ""
  const [markdown, setMarkdown] = useState(example);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const blogId = params.get("blogId");
  const navigate = useNavigate()
  const handleOnchangeTitle = (e) => {
    setTitle(e.target.value);
  };
  useEffect(() => {
    fetchBlog()
  },[]);
  
  const fetchBlog = async () => {
    
      const resp = await fetch(`https://blog-x71e.onrender.com/blogs/${blogId}`);

      const data = await resp.json();
      setTitle(data.title)
      setMarkdown(data.markdown)
      des.current.value=data.des
      _id = data._id

  };
  const handleOnchangeMarkdown = (e) => {
    setMarkdown(e.target.value);
  };

  const getMarkdownText = () => {
    const rawMarkup = marked(markdown);
    return { __html: rawMarkup };
  };
  const handleEditBlog=async(e,title,des,markdown)=>{
    console.log(blogId)
   const resp = await  fetch(`https://blog-x71e.onrender.com/blogs/${blogId}`,{
        method:"PATCH",
        headers:{"CONTENT-TYPE":"application/json"},
        body:JSON.stringify({
            title:title,
            des:des.current.value,
            markdown:markdown
        })
    })
    const data = await resp.json()
    navigate("/myblogs")
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
            <a href="/myblogs">
              <button className="button-del">
                <span className="lable-del">cancel</span>
              </button>
            </a>
            <button
              className="submitBtn"
              onClick={(e) => handleEditBlog(e, title, des, markdown)}
            >
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
            height: "610px",
            marginTop: "2rem",
            width: "calc(50% - 3rem)",
            padding: "10px",
            overflow: "scroll",
            overflowX: "hidden",
            borderRadius: "5px",
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
