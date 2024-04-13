import React from 'react'
import Header from './components/Header'
import Sign_in from './pages/Sign_in';
import Events from './pages/Events';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

const App = () => {

  return (
    <Router>
      <Header />
      <Routes>
        <Route index element ={<Events />}/>
        <Route path = "/sign-in" element={<Sign_in />} />
      </Routes>
    </Router>
  )
}

export default App