import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ userInfo }) {
  const navigate = useNavigate();

  function signup() {
    navigate("/signup");
  }

  function login() {
    navigate("/login");
  }

  function logout(){
    localStorage.clear();
    navigate('/')
  }

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <h1 className="fw-bold">To-Do</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!userInfo && (
                <>
               
                  <li className="nav-item me-2 mb-2">
                    <button className="btn btn-primary" onClick={signup}>
                      Signup
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-primary" onClick={login}>
                      Login
                    </button>
                  </li>
                </>
              )}

              {
                userInfo && 
                <>
                 <li className="nav-item me-2 d-flex align-items-center">
                <h4 className="fw-bold text-light bg-secondary rounded p-1">
                  {userInfo?.username}
                </h4>
              </li>
              <li className="nav-item me-2 mb-2">
                    <button className="btn btn-danger" onClick={logout}>
                      Logout
                    </button>
                  </li>
              
                </>
              }
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
