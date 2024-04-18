import React from 'react';
import "./style/header.css";
import logo from "../assets/fisk_logo.png";
import {useNavigate } from "react-router-dom";

const Header = () => {
  const isLoggedIn = localStorage.getItem('username');
  const navigate  = useNavigate();

  const logout =() => {
    localStorage.clear();
    navigate("/sign-in");
  }

  return (
   
      <div className="nav_con">
           <ul className= "nav nav-fill">
            <li className='nav-items'>
              <a className="nav-link" href = "/">
                <img src={logo} alt= "Fisk Logo" />
              </a>
            </li>
            {isLoggedIn ?
            <div className='d-flex flex-direction-row justify-items-end'>
              <li className='nav-items'>
              <a className="nav-link" href = "/" style={{color:"white"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
              &nbsp;&nbsp;
              {isLoggedIn}
              </a>
              </li>
              <li className='nav-items'>
              <a className="nav-link" href = "/my-orgs" style={{color:"white"}}>
              My Organizations
              </a>
              </li>
              <li className='nav-items'>
              <a className="nav-link" href = "/my-events" style={{color:"white"}}>
              My Events
              </a>
              </li>
              <li className='nav-items'>
              <a className="nav-link" onClick={logout} style={{color:"white"}}>
                Logout
              </a>
              </li>
              </div>
          : <>
            <li className='nav-items'>
            <a className="nav-link" href = "/sign-in" style={{color:"white"}}>
              Sign in
            </a>
            </li>
            </>
            }
        </ul>
      </div>
  )
}

export default Header