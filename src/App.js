import logo from "./logo.svg";
import "./App.css";
import NavBar from "./Nav/nav";
import {
  createBrowserRouter,
  Routes,
  Route,
  Link,
  Redirect,
  Navigate,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";

import Login from "./Components/login/Login";
import Register from "./Components/login/register";
import Courses from "./Components/courses/Courses";
import Protected from "./protected";
import About from "./Components/about/About";

function App() {
  return (

    <div className="App">
    
      <Router>
        <div className="App">
          <NavBar></NavBar>
          
          <>
            <Routes>
              <Route path="/login" element={<Login></Login>} />
              <Route path="/register" element={<Register></Register>} />
              <Route
                path="/courses"
                element={<Protected Component={Courses}></Protected>}
              />
              <Route
                path="/about"
                element={<Protected Component={About}></Protected>}
              />
            </Routes>
            
         
          </>
        </div>
      </Router>
    </div>
  );
}

export default App;
