import logo from './logo.svg';
import './App.css';
import NavBar from './Nav/nav';
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
import Home from './Components/Home/Home';
import Login from './Components/login/Login';
import Register from './Components/login/register';




function App() {
  return (
    <div className="App">
      
      <Router>
      <div className="App">
        <NavBar></NavBar>
        <>
          <Routes>
            <Route path='/login' element={<Login></Login>} />
            <Route path='/register' element={<Register></Register>} />
            <Route path='/home' element={<Home></Home>} />
          </Routes>
        </>
      </div>
    </Router>
      
      
    </div>
  );
}

export default App;
