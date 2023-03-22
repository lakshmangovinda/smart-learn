import "./App.css";
import NavigationBar from "./Components/navigation/NavigationBar";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Components/login/Login";
import Register from "./Components/login/Register";
import Courses from "./Components/courses/Courses";
import Protected from "./protected";
import About from "./Components/about/About";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
          <NavigationBar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/courses"
              element={<Protected Component={Courses}></Protected>}
            />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
