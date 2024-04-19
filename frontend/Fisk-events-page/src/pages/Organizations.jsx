import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Org_Card from '../components/Org_Card';
import "./style/org.css"

function Organizations() {
    const [userOrgs, setUserOrgs] = useState([]);
    const [userOrgId, setUserOrgId] = useState([]);
    const [showJoin, setShowJoin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [orgs, setOrgs] = useState([]);
    const [userJoins, setUserJoins] = useState({});
    const [newOrg, setNewOrg] = useState("");
    const roles = ["Executive", "Member"]
    const userId = localStorage.getItem("userId")


    const handleCloseJoin = () => setShowJoin(false);
    const handleShowJoin = () => setShowJoin(true);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const onOptionChangeHandler = (event,name) => {
        setUserJoins(values => ({...values, [name]: event.target.value}));
    };

    const findMatch = (idx) => {
      const foundObject = orgs.filter(item => item.org_id === idx);
      return foundObject
    };

    

    const registerOrg = (event) => {
        console.log("clicked submit")
        event.preventDefault();
        fetch("http://127.0.0.1:8080/orgs",
        {
          method: "POST",
          headers: {
            "Accept" : 'application/json',
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"org_name":newOrg, "usr": localStorage.getItem("userId")})
        }).then(res => res.json())
        .then(stats => {
          if (stats.error) {
            return alert(stats.error)
          } else {
            setOrgs(values => ([...values, {"org_id":stats.orgID, "org_name":stats.orgName}]))
            setShowRegister(false);
          }
        }
        )
      }
      const joinOrg = (event) => {
        console.log("clicked submit-join")
        console.log("r", userJoins.org)
        const obj = orgs.filter(item => item.org_name === userJoins.org);
        console.log("H",obj)
        const org_id = obj[0].org_id;
        console.log("y", obj[0].org_id)
        if (userJoins.role === "Executive"){
          var userInfo = [org_id, userId, userJoins.role, 0]
        } else {
          var userInfo = [org_id, userId, userJoins.role]
        }
        var send = {"user_info": userInfo}
        console.log("s",send)
        event.preventDefault();
        fetch("http://127.0.0.1:8080/join-orgs",
        {
          method: "POST",
          headers: {
            "Accept" : 'application/json',
            "Content-Type": "application/json"
          },
          body: JSON.stringify(send)
        }).then(res => res.json())
        .then(stats => {
          if (stats.error) {
            return alert(stats.error)
          }
          setShowJoin(false);
        }
        )
      }

      useEffect(() => {
        const fetchUserOrgs = async () => {
          try {
            const response = await fetch(`http://127.0.0.1:8080/e-orgs/${userId}`, {
              method: 'GET',
              headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json" // Potentially unnecessary for GET requests (check API docs)
              }
            });
    
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data.error) {
              console.error("Error from server:", data.error);
              // Handle server-side errors appropriately (e.g., display user-friendly message)
            } else {
              var idList = []
              data.result.map(data => {
                idList.push(data[0])
              })
              var orgList = []
              data.result.map(data => {
                orgList.push(data[1])
              })
              // setUserOrgId(data.result)
              console.log("mn", idList)
              setUserOrgId(idList)
              setUserOrgs(data.result)
              console.log("l", userOrgs)

            }
          } catch (error) {
            console.error("Error fetching data:", error);
            // Handle general errors gracefully (e.t., display an error message)
          }
        };
            fetchUserOrgs();
      }, []); 
    //     fetch(`http://127.0.0.1:8080/orgs/${userId}`, 
    //     {
    //         method: 'GET',
    //         headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //         },        
    //     }).then(res=> res.json())
    //     .then(stats=> {
    //         if(stats.error){
    //         return alert(stats.error)
    //         } else{
    //             setUserOrgs(stats.result)
    //         }
    //     })
    // }, []);

    // useEffect(() => {
    //   const getUserList = async () => {
    //     try {
    //       const response = await fetch(`http://127.0.0.1:8080/my-orgs${userOrgId}`, {
    //         method: 'GET',
    //         mode:"no-cors",
    //         headers: {
    //           "Accept": 'application/json',
    //           "Content-Type": "application/json" // Potentially unnecessary for GET requests (check API docs)
    //         }
    //       });
  
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
  
    //       const data = await response.json();
    //       console.log(data)
  
    //       if (data.error) {
    //         console.error("Error from server:", data.error);
    //         // Handle server-side errors appropriately (e.g., display user-friendly message)
    //       } else {
    //         setUserOrgs(data.result)
    //       }
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //       // Handle general errors gracefully (e.t., display an error message)
    //     }
    //   };
    //       getUserList();
    // }, [userOrgId])

  return (
    <div className='bg'>
        <div className='header'>
        <Button variant="primary" className="pl-20" onClick={handleShowJoin}>
        Join an Org
        </Button>
      <Button variant="primary" className="pr-20" onClick={handleShowRegister}>
        Register an Org
      </Button>
        </div>
        <div>
        {userOrgs.map(userOrg =>{
          return(
            <Org_Card org_name={userOrg?.[3]} user_role={userOrg?.[1]} org_id={userOrg?.[0]}/>
          )
        })}
        </div>

        {/* Joining an org */}
        <Modal show={showJoin} onHide={handleCloseJoin} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Join an Org</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={joinOrg}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
                <Form.Label>Choose org</Form.Label>
                <Form.Select className='ml-20' aria-label="Default select example"  onChange={(e)=>onOptionChangeHandler(e, "org")}>
                    {orgs.map((option, index) => {
                        return (
                          <>
                            <option key={option.org_id} value ={option.org_name}>
                                {option.org_name}
                            </option>
                            </>
                        );
                    })}
                </Form.Select>
                </Form.Group>
                <small>Organization Selected : {userJoins.org} </small>
                {userJoins.org &&
                <>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Choose role</Form.Label>
                    <Form.Select  className='ml-20' aria-label="Default select example" onChange={(e)=>onOptionChangeHandler(e, "role")}>
                        {roles.map((option, index) => {
                            return (

                                <option key={index}>
                                    {option}
                                </option>
                            );
                        })}
                    </Form.Select>
                    </Form.Group>
                    {userJoins.role === "Executive" &&
                    <small> Note that an existing executive would have to approve this request</small>}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </>
                }
            </Form>
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseJoin}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        {/* Registering an org */}
        <Modal show={showRegister} onHide={handleCloseRegister} animation={false}>
        <Modal.Header closeButton>
        <Modal.Title>Register an Org</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={registerOrg}>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Organization Name</Form.Label>
                <Form.Control type="text" placeholder="Enter org name" value = {newOrg || ""} onChange={(e)=>setNewOrg(e.target.value)} />
                <Form.Text className="text-muted">
                    Note that an organization's name must be unique
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                        Submit
            </Button>
            </Form>
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegister}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Organizations