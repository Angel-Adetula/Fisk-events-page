import React from "react";
import Sign_in from "./pages/Sign_in";
import Header from "./components/Header";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import User_Events from './pages/User_Events';
import AddEvent from './pages/AddEvent';
import Organizations from './pages/Organizations';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route index element={<Events />}  />
        <Route path="/sign-in" element={<Sign_in />} />
        <Route path = "/my-events" element={<User_Events />} />
        <Route path = "/add-event" element={<AddEvent/>} />
        <Route path= "/my-orgs" element = {<Organizations/>} />
        <Route path="/event/:eventId" element={<EventDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
