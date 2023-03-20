import { useState } from "react"
import { app } from '../../Utils/firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [userCreds, setusercred] = useState({
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        const authentication = getAuth();
        createUserWithEmailAndPassword(authentication, userCreds.email, userCreds.password)

        setusercred({ ...userCreds, [event.target.name]: event.target.value })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('Email Already in Use');
                }
            })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(userCreds)
    }
    return (
        <div className="container-fluid">
            
            <form className="col-6" >
            <h3>SignUp</h3>
            <ToastContainer />
                <div className="form-group text-left">
                    
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange} />
                </div>
                    <button onClick={(e) => handleSubmit(e)} className="btn btn-primary mt-3">Register</button>
            </form>
        </div>
    )
}
export default Register;