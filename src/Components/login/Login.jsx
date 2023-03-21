import { useState, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [userCreds, setusercred] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setusercred({ ...userCreds, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        sessionStorage.setItem("token", uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    e.preventDefault();
    const authentication = getAuth();

    signInWithEmailAndPassword(
      authentication,
      userCreds.email,
      userCreds.password
    )
      .then((response) => {
        navigate("/courses");
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          toast.error("Please check the Password");
        }
        if (error.code === "auth/user-not-found") {
          toast.error("Please check the Email");
        }
      });
  };
  return (
    <div className="container-fluid  d-flex align-items-center justify-content-center" >
      

      <ToastContainer />
      <form>
      <h3 className="text-center">SignIn</h3>
        <div>
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
        <div >
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
        <div >
          <button
            style={{ marginTop: "20px" }}
            onClick={(e) => handleSubmit(e)}
            className="btn btn-primary "
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
