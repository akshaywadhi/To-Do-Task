import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((user) => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const login = await axiosInstance.post('/login', user)
      alert(login.data.message)
      if(login.data && login.data.accessToken){
        localStorage.setItem('token', login.data.accessToken)
        navigate('/dashboard')
      }
    }
    catch(err){
     alert(err.response.data.message)
    }
  }

  return (
    <>
    <Navbar/>

<div className="container-fluid">

      <div className="container">
        <div className="card mt-4">
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <h4 className="card-title text-center">Login Here</h4>

            <form className="form row gy-2 w-50" onSubmit={handleSubmit}>
            <label className="col-form-label">
                      Enter Your Email
                    </label>
              <input
                type="text"
                name= 'email'
                value= {user.email}
                className="form-control"
     
                onChange= {handleChange}
                required
              />
                 <label className="col-form-label">
                      Enter Your Password
                    </label>
              <input
                type="text"
                name='password'
                value={user.password}
                className="form-control"
               
                onChange={handleChange}
                required
              />
             
            
              <button className="btn btn-danger w-50 mx-auto mt-2">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    </>
      );
}
