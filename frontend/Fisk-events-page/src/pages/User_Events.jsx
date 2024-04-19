import React from 'react';
import User_Events_Card from '../components/User_Events_Card';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import "./style/user_events.css";



const User_Events = () => {
  const [showActive, setShowActive] = useState(true);
  const navigate = useNavigate();
  const [eventInfo, setEventInfo] =useState([])
  const userId = localStorage.getItem("userId")

  const toForm=()=> {
    navigate('/add-event', {state:{event_info:eventInfo}})
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/events/${userId}`, 
        {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },        
        }).then(res=> res.json())
        .then(stats=> {
          setEventInfo(stats.userEvents)
          console.log("userEvents",stats.userEvents )
        })
    }, []);



  return (

    <div className= "user-events-pg">
    
    <div className='show-events'>
    <div className='container d-flex flex-direction-row show-events-bar'>
      <a className={`selection ${showActive && "selected"}`} onClick={() => setShowActive(true)}>Active Events</a>
      <a className={`selection ${!showActive && "selected"}`} onClick={() => setShowActive(false)}>Past Events</a>
    </div>
    </div>
    {eventInfo.map(option=> {
          // const image = URL.createObjectURL(option.picture);
          return (
            <User_Events_Card header = {option.event_title}
            desc = {option.event_details}
            date = {option.date}
            img = {option.picture}
            eventCode={option.sign_in}
            featured={option.featured}/>
          )
    })}

      
      <button onClick={() =>{toForm()}} className="add-events">Add Events </button>

    </div>
    
  )
}

export default User_Events;
