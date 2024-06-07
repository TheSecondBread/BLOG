import "./App.css";
import Blogs from "./components/Blogs";
import Nav from "./components/Nav";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
    <Analytics></Analytics>
      <Nav />
      <center>
        <Blogs></Blogs>
      </center>
    </>
  );
}

export default App;
