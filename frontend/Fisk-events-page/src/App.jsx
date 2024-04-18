import React from "react";
import Sign_in from "./pages/Sign_in";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Events />} />
        <Route path="/sign-in" element={<Sign_in />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
