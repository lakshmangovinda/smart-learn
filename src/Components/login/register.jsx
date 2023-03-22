import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegisterWrapper = styled.div`
    width: 50%;
    border: black solid 1px;
    border-radius: 4px;
    padding: 2rem;
    background-color: aliceblue;
    margin-top: 2rem;
    .form-group{
      padding-bottom: 1rem;
    }
`;

const Register = () => {
  const navigate = useNavigate();
  const [userCreds, setusercred] = useState({
    email: '',
    password: '',
    fname: '',
    lname: '',
    mobile: '',
  });

  const [validation, setValidation] = useState({
    email: '',
    password: '',
    fname: '',
    lname: '',
    mobile: '',
  });

  const checkValidation = () => {
    let errors = {...validation};
    let isValid = false;
    if (!userCreds.fname.trim()) {
      errors.fname = 'First name is required';
    } else if (!userCreds.lname.trim()) {
      errors.fname = '';
      errors.lname = 'Last name is required';
    } else if (!userCreds.email.trim()) {
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


  const handleChange = (event) => {
    setusercred({
      ...userCreds,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidForm = checkValidation();
    if(isValidForm){
      const authentication = getAuth();
      createUserWithEmailAndPassword(
        authentication,
        userCreds.email,
        userCreds.password
      )
        .then(() => {
          toast.success("registered successfully...!, Please login.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            toast.error("Email Already in Use");
          }
        });
    }
    
  };

  return (
    <RegisterWrapper className="container-fluid">
      <form>
        <h3 className="text-center">Sign Up</h3>
        <ToastContainer />
        <div className="form-group">
          <label htmlFor="fname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fname"
            name="fname"
            onChange={handleChange}
          />
          {validation.fname && <p style={{ color: 'red' }}>{validation.fname}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="lname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lname"
            name="lname"
            onChange={handleChange}
          />
          {validation.lname && <p style={{ color: 'red' }}>{validation.lname}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="mobile" className="form-label">
            Mobile (Optional)
          </label>
          <input
            type="mobile"
            className="form-control"
            id="mobile"
            name="mobile"
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
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
        <button
          onClick={(e) => handleSubmit(e)}
          className="btn btn-primary mt-3"
        >
          Register
        </button>
      </form>
    </RegisterWrapper>
  );
};


export default Register;
