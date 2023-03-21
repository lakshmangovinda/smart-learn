import { useState } from "react";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userCreds, setusercred] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    
    

    setusercred({
      ...userCreds,
      [event.target.name]: event.target.value,
    })
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const authentication = getAuth();
    createUserWithEmailAndPassword(
        authentication,
        userCreds.email,
        userCreds.password
      ).then(res=>{
        toast.success("registered");
        setTimeout(() => {
            navigate('/login')
        }, 2000);
      }).catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email Already in Use");
        }
        
      });
  };
  return (
    <div className="container-fluid  d-flex align-items-center justify-content-center">
      <form >
        <h3 className="text-center">SignUp</h3>
        <ToastContainer />
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="fname"
           
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Second Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="sname"
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Mobile
          </label>
          <input
            type="mobile"
            className="form-control"
            id="exampleInputPassword1"
            name="mobile"
            
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={handleChange}
          />
        </div>
        
        <button
          onClick={(e) => handleSubmit(e)}
          className="btn btn-primary mt-3"
        >
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
