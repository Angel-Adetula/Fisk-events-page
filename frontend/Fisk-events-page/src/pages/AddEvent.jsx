import React from 'react';
import { useState, useEffect} from 'react';
import {DatePicker} from "antd";
import "./style/add_event.css";


function AddEvent() {
  const [newEvent, setNewEvent] = useState({method: "Live", 
    host: "Organization", isFeatured: false, food:false, need_volunteer:false, date:""})
  const userId = localStorage.getItem("userId")
  
  const event_types= [
    "Career Fairs", "Guest Lectures", 
    "Workshops and Seminars", "Conferences",
    "Health and Wellness Activities",
    "Hackathon", "Arts and Culture", "Networking Events", "Athletics/Recreation", "Other"];
  const [orgs, setOrgs] = useState([])

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/user-orgs/${userId}`, 
    {
        method: 'GET',
        headers: {
          "Accept" : 'application/json',
          "Content-Type": "application/json"
        },
    
    }).then(res=> res.json())
    .then(stats=> {
        if (stats.error) {
            return alert(stats.error)
        } else {
        setOrgs(stats.result)
        console.log(orgs)
        }
      })}, []);


  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewEvent(values => ({...values, ["picture"]: URL.createObjectURL(event.target.files[0])}));
    }
   }

  const handleChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    setNewEvent(values => ({...values, [name]: val}))
  }

  const dateChange = (date, dateString) => {
    setNewEvent(values => ({...values, ["date"]: dateString}))
  } 

  const onEventTypeChange = e => {
    setNewEvent(values => ({...values, ["method"]: e.target.value}))

  }

  const onOrganizationChange = e => {
    setNewEvent(values => ({...values, ["host"]: e.target.value}))

  }
  const onOptionChangeHandler = (event,name) => {
    setNewEvent(values => ({...values, [name]: event.target.value}));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/events",
    {
      method: "POST",
      headers: {
        "Accept" : 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"event":newEvent})
    }).then(res => res.json())
    .then(stats => {
      if (stats.event_Added == false) {
        alert("This event could not be added")
      } else {
        return navigate("/my-events")
      }
    }
    )
  }



  return (
    <div className = "add-form-bg">
      <div className='add-form'>
      <form onSubmit={handleSubmit}>

        <div className="sect-1">
          <div class = "img-group">
            <div className='img-pick'>
              <img src={newEvent.picture}/>
            </div>
            <div className='form-group'>
            <input type = "file" onChange={onImageChange} className="form-control-file" required/>
            </div>
          </div>
          <div className = "es">
          <div className="form-group">
            <label for="eventTitle" id="etl">Event title</label>
            <input class="form-control form-control-lg" id="eventTitle"
            type="text" name= "event_title" onChange={handleChange}
             value = {newEvent.event_title || ""}  required/>
          </div>
          <div className="form-group">
            <label for="eventDets">Event details &nbsp; <small>(1000 char max)</small> </label>
            <textarea class="form-control form-control-lg" id="eventDets"
             name= "event_details" onChange={handleChange}
             value = {newEvent.event_details || ""} rows="7" maxLength={1000} required></textarea>
          </div>
          <div className="form-check">
            <input class="form-check-input" type="checkbox" name="featured" id="featured1" clicked={newEvent.isFeatured} onClick={()=>setNewEvent(values => ({...values, ["isFeatured"]: !newEvent.isFeatured}))}/>
            <label class="form-check-label" for="featured1">
              Featured
            </label>
          </div>
          {newEvent.isFeatured && 
          <small>Note that featured requests are reviewed by the OCPD office and take up to 3 days to approve.</small>}
          <div className="form-group">
            <label for="sign-link" id="etl">Sign up link</label>
            <input class="form-control" id="sign-link"
            type="url" name= "sign_link" onChange={handleChange}
             value = {newEvent.sign_link || ""}/>
          </div>
          <p className="hp">Method</p>
          <div className ="d-flex flex-direction-row">
            <div className="form-check">
              <input class="form-check-input" type="radio" name="event_type" id="live" value="Live" checked={newEvent.method==="Live"} onChange={onEventTypeChange}/>
              <label class="form-check-label" for="live">
                Live
              </label>
            </div>
            <div className="form-check sp">
              <input class="form-check-input" type="radio" name="event_type" id="virtual" checked={newEvent.method==="Virtual"} value="Virtual" onChange={onEventTypeChange}/>
              <label class="form-check-label" for="virtual">
                Virtual
              </label>
            </div>
            <div className="form-check sp">
              <input class="form-check-input" type="radio" name="event_type" id="both" checked={newEvent.method==="Both"} value="Both" onChange={onEventTypeChange}/>
              <label class="form-check-label" for="both">
                Both
              </label>
            </div>
          </div>
          {(newEvent.method === "Virtual" || newEvent.method === "Both") ?
            <div className="form-group">
              <label for="virLink" >Event Link</label>
              <input class="form-control" id="virLink"
              type="url" name= "virLink" onChange={handleChange}
               value = {newEvent.virLink || ""}/>
            </div>
            :
            <div className="form-group">
              <label for="loc" >Location</label>
              <input class="form-control" id="loc"
              type="text" name= "location" onChange={handleChange}
              value = {newEvent.location || ""}/>
          </div>
          }
          <p className="hp">Host</p>
          <div className ="d-flex flex-direction-row">
            <div className="form-check">
              <input class="form-check-input" type="radio" name="org" id="p1" value="Organization" checked={newEvent.host==="Organization"} onChange={onOrganizationChange}/>
              <label class="form-check-label" for="p1">
                Organization
              </label>
            </div>
            <div className="form-check sp">
              <input class="form-check-input" type="radio" name="org" id="p2" value="Personal" checked={newEvent.host==="Personal"} onChange={onOrganizationChange}/>
              <label class="form-check-label" for="p2">
                Personal
              </label>
            </div>
          </div>
          {newEvent.host === "Organization" &&
          <div class="form-group mt">
          <label class="mr-sm-2" for="inlineFormCustomSelect">Choose Org</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onClick={(e)=>onOptionChangeHandler(e, "Host_org")}> 
              {orgs.map((option, index) => {
                  var display = option[1]
                  return (
                      <option key={index}>
                          {option}
                      </option>
                  );
              })}
          </select>
        </div>
          }
          <div class="form-group mt">
            <label class="mr-sm-2" for="inlineFormCustomSelect">Event Type</label>
            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onClick={(e)=>onOptionChangeHandler(e, "eventType")}> 
                {event_types.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
          </div>
          <div className="form-group">
            <label for="eventTags" >Event Tags</label>
            <input class="form-control form-control-lg" id="eventTags"
            type="text" name= "event_tags" onChange={handleChange} maxLength={150}
             value = {newEvent.event_tags|| ""}/>
          </div>
          <small>Note that tags are separated by space. For example 'ai tech'</small>
          <p className="hp mt-20">Perks & Recreation</p>
            <div className="form-group">
              <label for="food">
                  Food
              </label>
              <input class="sp" type="checkbox" name="food" id="food" clicked={newEvent.food} onClick={()=>setNewEvent(values => ({...values, ["food"]: !newEvent.food}))}/>
            </div>
            <div className="form-group d-flex flex-direction-row">
              <label for="hours" className="mr-sm-2">Hours</label>
              <input class="form-control si" id="hours"
              type="number" name= "hours_given" onChange={handleChange} 
              value = {newEvent.hours_given|| ""}/>
            </div>
            <div className="form-group">
              <label for="volunteer">
                  Need volunteers
              </label>
              <input class="sp" type="checkbox" name="volunteer" id="volunteer" clicked={newEvent.need_volunteer} onClick={()=>setNewEvent(values => ({...values, ["need_volunteer"]: !newEvent.need_volunteer}))}/>
            </div>
            {
              newEvent.need_volunteer &&
              <>
              <div className="form-group">
                <label for="volLink" >Volunteer sign up link</label>
                <input class="form-control" id="volLink"
                type="url" name= "volunteer_link" onChange={handleChange}
                value = {newEvent.volunteer_link || ""}/>
              </div>
              <div className="form-group">
                <label for="volHours" className="mr-sm-2">Volunteer hours</label>
                <input class="form-control si" id="volHours"
                type="number" name= "vol_hours" onChange={handleChange} 
                value = {newEvent.vol_hours|| ""}/>
            </div>
            </>
            }
            <DatePicker name="date" onChange={dateChange}/>
            <div className="form-group">
              <label for="time" >Time</label>
              <input class="form-control" id="time"
              type="time" name= "time" onChange={handleChange}
            />
          </div>
            
            <button type="submit" class= "btn btn-primary mt-20">
              Submit
            </button>
          
          </div>
        </div>
      </form>
    </div>
    </div>
  )
}

export default AddEvent