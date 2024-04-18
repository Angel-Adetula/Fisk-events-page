import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


import "./style/org_card.css";


function Org_Card({org_name, org_id, user_role, notifs}) {
    const [showEdit, setShowEdit] = useState(false);
    const [showNotifs, setShowNotif] = useState(false);
    const [userRole, setUserRole] = useState(user_role)
    const [orgNotifs, setOrgNotifs] = useState(notifs);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseNotifs = () => setShowNotifs(false);
    const handleShowNotifs = () => setShowNotifs(true);
    const handleSubmit = () =>  setShow(true);
    const handleLeaveOrg = (event) => {
      event.preventDefault();
      fetch("http://127.0.0.1:8080/orgs",
      {
        method: "DELETE",
        headers: {
          "Accept" : 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"org_id":org_id, "usr": localStorage.getItem("userId")})
      }).then(res => res.json())
      .then(stats => {
        if (stats.error) {
          return alert(stats.error)
        }
      }
      )
    };

  return (
    <div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{org_name}</h5>
                <div className="d-flex flex-direction-row ">
                    <div className="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16" style={{"fontSize":"30px", "verticalAlign": "middle"}}>
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                        </svg> &nbsp;&nbsp;&nbsp;
                        <span class="card-text">{user_role}</span>
                    </div>
                    <div className='ml-au'>
                        <Button variant="primary" onClick={handleShowEdit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                            </svg>
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        {notifs &&
                        <Button variant="primary" onClick={handleShowNotifs}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
                        </svg>
                        </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
        <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>{org_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label><b>Role:</b></Form.Label> &nbsp;&nbsp;
                <Form.Check
                    inline
                    label="Member"
                    name="role"
                    type="radio"
                    value="Member" 
                    checked={userRole ==="Member"} 
                    onChange={()=>setUserRole("Member")}
                />
                <Form.Check
                    inline
                    label="Executive"
                    name="role"
                    type="radio"
                    value="Executive" 
                    checked={userRole ==="Executive"} 
                    onChange={()=>setUserRole("Executive")}
                />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="danger" onClick={handleLeaveOrg}>
            Leave Organization
          </Button>
        </Modal.Footer>
      </Modal>

        {/* Second Modal for org notif */}
      <Modal show={showNotifs} onHide={handleCloseNotifs}>
        <Modal.Header closeButton>
          <Modal.Title>{org_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label><b>Role:</b></Form.Label> &nbsp;&nbsp;
                <Form.Check
                    inline
                    label="Member"
                    name="role"
                    type="radio"
                    value="Member" 
                    checked={userRole ==="Member"} 
                    onChange={()=>setUserRole("Member")}
                />
                <Form.Check
                    inline
                    label="Executive"
                    name="role"
                    type="radio"
                    value="Executive" 
                    checked={userRole ==="Executive"} 
                    onChange={()=>setUserRole("Executive")}
                />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNotifs}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Org_Card