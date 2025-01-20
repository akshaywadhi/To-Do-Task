import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {useNavigate} from 'react-router-dom'
import Navbar from "./Navbar";

export default function SignupPage() {
  //Users Object
  const [users, setUsers] = useState({
    username: "",
    email: "",
    password: "",
    role : "user"
  });

  const navigate = useNavigate()


  //Handling Changes In Input Box

  const handleInput = (e) => {
    setUsers((users) => ({
      ...users,
      [e.target.name] : e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

   

      try{
        const login = await axiosInstance.post('/signup', users)
        console.log(login.data)
        if(login.data && login.data.accessToken){
          alert(login.data.message)
          localStorage.setItem('token', login.data.accessToken)
          navigate('/login')

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
            <h4 className="card-title text-center">Signup Here</h4>

            <form className="form row gy-1 w-50 " onSubmit={handleSubmit}>
            <label className="col-form-label">
                      Enter Your Username
                    </label>
              <input
                type="text"
                name = 'username'
                value = {users.username}
                className="form-control"
                onChange= {handleInput}
                required
              />
                <label className="col-form-label">
                      Enter Your Email
                    </label>
              <input
                type="text"
                name= 'email'
                value= {users.email}
                className="form-control"
          
                onChange= {handleInput}
                required
              />
               <label className="col-form-label">
                      Enter Your Password
                    </label>
              <input
                type="text"
                name='password'
                value={users.password}
                className="form-control"
            
                onChange={handleInput}
                required
              />
                 <label className="col-form-label">
                      Enter Your Role
                    </label>
               <select
                      name="role"
                      value={users.role}
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleInput}
                    >
                    
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>


              <button className="btn btn-danger w-50 mx-auto mt-2">Signup</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
