import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import NewBlog from "./components/NewBlog.jsx";
import ShowBlog from "./components/ShowBlog.jsx";
import Myblogs from "./components/Myblogs.jsx";
import Blogger from "./components/Blogger.jsx";
import EditBlog from "./components/EditBlog.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App></App>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/show" element={<ShowBlog/>}/>
      <Route path="/myblogs" element={<Myblogs/>}/>
      <Route path="/:user" element={<Blogger/>}></Route>
      <Route path="/edit" element={<EditBlog/>}></Route>
    </Routes>
  </BrowserRouter>
);
