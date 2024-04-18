import React, { useState } from 'react'
import "./style/sign_in.css";
import { useNavigate } from "react-router-dom";


const Sign_in = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState(false);

    const buttonText = newUser? "Are you already registered? Sign in":"Are you a new user? Sign up"
    const fetch_addr = newUser? "http://127.0.0.1:8080/signup" : "http://127.0.0.1:8080/signin"

    const handleChange = (event) => {
      const name = event.target.name;
      const val = event.target.value;

      setInputs(values => ({...values, [name]: val}))
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      fetch(fetch_addr,
      {
        method: "POST",
        headers: {
          "Accept" : 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
      }).then(res => res.json())
      .then(stats => {
        if (stats.error == "1062-23000") {
          alert("This email is already registered, please sign up")
        } else if(stats.error){
          return alert(stats.error_message)
        } else {
          localStorage.setItem("username", stats.username)
          localStorage.setItem("userId", inputs.email)
          return navigate("/")
        }
      }
      )
    }

    const handleNewUser =() => {
      setNewUser(!newUser);
    }
    return (

      <div className="sign-in-bg flex">
        
        <div className='sign-in-box'>
          <h3 >{newUser? 'Sign Up' : 'Sign In'}</h3>
          <form onSubmit={handleSubmit}>
            {newUser &&
              <div className="form-group">
              <label>
              First Name
              </label>
              <input className='form-control' type = "text"
              name="display_name" 
              value = {inputs.display_name || ""}
              onChange={handleChange}
              required
              />
              </div>
            }
            <div className="form-group">
            <label>
              Email
            </label>
            <input className='form-control' type = "email"
            name="email" 
            value = {inputs.email || ""}
            onChange={handleChange}
            required
            />
            </div>
            <div className="form-group">
            <label>
              Password
            </label>
            <input className='form-control' type = "password"
            name="password" 
            value = {inputs.password || ""}
            onChange={handleChange}
            required
            minLength={8}
            maxLength={20}
            />
            <small id="password-help" className= "form-text text-muted">
              {newUser? "Must be 8-20 characters long":""}
            </small>
            </div>
            <button type="submit" class= "btn btn-primary">
              Submit
            </button>
          </form>
          <div className='d-flex justify-content-end'>
              <button className = "new-user-text" onClick = {() => setNewUser(!newUser)}>
                {buttonText}
              </button>
          </div>
          </div>
        </div>    
  )
}

export default Sign_in