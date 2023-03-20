import { useState } from "react"
import { app } from '../../Utils/firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login=()=>{
    const navigate = useNavigate();
    const[userCreds,setusercred]=useState({
        email:'',
        password:''
    })

    const handleChange=(event)=>{
        
        setusercred({...userCreds,[event.target.name]:event.target.value})

    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const authentication = getAuth();
        
        signInWithEmailAndPassword(authentication, userCreds.email, userCreds.password)
        .then((response) => {navigate('/home');localStorage.setItem('token',response._tokenResponse.refreshToken) }).catch((error) => {
            if(error.code === 'auth/wrong-password'){
              toast.error('Please check the Password');
              
            }
            if(error.code === 'auth/user-not-found'){
              toast.error('Please check the Email');

            }
          })
                  
        
    }
    return(
        <div  className="container-fluid">
            <h3>SignIn</h3>

<ToastContainer />
            <form>
                <div className=" col-4">

    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email'  onChange={handleChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="col-4">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange}/>
  </div>
  <div className="col-4">
  <button style={{marginTop:"20px"}} onClick={(e)=>handleSubmit(e)} className="btn btn-primary col-2">Login</button>
  </div>
  
                
 
</form>
        </div>
    )
}
export default Login;