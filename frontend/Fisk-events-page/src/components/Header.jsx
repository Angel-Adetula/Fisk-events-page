import React from 'react';
import "./style/header.css";
import logo from "../assets/fisk_logo.png";

const Header = () => {
  const isLoggedIn = localStorage.getItem('username') != null;

  return (
   
      <div className="nav_con">
           <ul className= "nav nav-fill">
            <li className='nav-items'>
              <a className="nav-link" href = "/">
                <img src={logo} alt= "Fisk Logo" />
              </a>
            </li>
            {!isLoggedIn &&
            <li className='nav-items'>

            <a className="nav-link" href = "/sign-in" style={{color:"white"}}>
              Sign in
            </a>
            </li>
}
      </ul>
      </div>
  )
}

export default Header