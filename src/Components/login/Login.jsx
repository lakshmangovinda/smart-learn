import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";

const LoginWrapper = styled.div`
  width: 50%;
  border: black solid 1px;
  border-radius: 4px;
  padding: 2rem;
  background-color: aliceblue;
  margin-top: 2rem;
  .form-group {
    padding-bottom: 1rem;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [userCreds, setusercred] = useState({
    email: "",
    password: "",
  });
  const [validation, setValidation] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setusercred({ ...userCreds, [event.target.name]: event.target.value });
  };

  const checkValidation = () => {
    let errors = {...validation};
    let isValid = false;
    if (!userCreds.email.trim()) {
      errors.lname = '';
      errors.fname = '';
      errors.email = 'Email is required';
    } else if (!userCreds.password) {
      errors.lname = '';
      errors.fname = '';
      errors.email = '';
      errors.password = 'password is required';
    } else {
      errors.fname = '';
      errors.lname = '';
      errors.email = '';
      errors.password = '';
      errors.mobile = '';
      isValid = true;
    }
    if(isValid){
      setValidation(errors);
      return isValid;
    } else {
      setValidation(errors);
      return isValid;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidForm = checkValidation();
    if(isValidForm) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          sessionStorage.setItem("token", uid);
        }
      });
      
      const authentication = getAuth();
  
      signInWithEmailAndPassword(
        authentication,
        userCreds.email,
        userCreds.password
      )
        .then(() => {
          navigate("/home");
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            toast.error("Please check the Password");
          }
          if (error.code === "auth/user-not-found") {
            toast.error("Please check the Email");
          }
        });
    }
  };

  return (
    <LoginWrapper className="container-fluid">
      <ToastContainer />
      <form>
        <h3 className="text-center">Sign In</h3>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleChange}
          />
          {validation.email && <p style={{ color: 'red' }}>{validation.email}</p>}
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
          />
          {validation.password && <p style={{ color: 'red' }}>{validation.password}</p>}
        </div>
        <div>
          <button
            style={{ marginTop: "20px" }}
            onClick={(e) => handleSubmit(e)}
            className="btn btn-primary "
          >
            Login
          </button>
        </div>
      </form>
    </LoginWrapper>
  );
};
export default Login;
