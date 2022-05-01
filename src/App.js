import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'

import Home from './Components/Home'
import NewPoll from './Components/NewPoll'
import PollingStation from './Components/PollingStation'
import About from './Components/About'


import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development")



export default function App() {
    
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>
    const changeCandidatesFunction = async (prompt) => {
        console.log(prompt);
        let namePair = await window.contract.getCandidatePair({ prompt: prompt });
        localStorage.setItem("Candidate1", namePair[0]);
        localStorage.setItem("Candidate2", namePair[1]);
        localStorage.setItem("prompt", prompt);
        window.location.replace(window.location.href + "PollingStation");
      };

    
    return (
        //Desgining Navgation Bar
        //Creating required pages
        <Router>
        <Navbar collapseOnSelect expand = "lg" bg = "dark" variant = "dark" >
        <Container>
            <Navbar.Brand href ='/'>
            DeBallot
            </Navbar.Brand>

        <Navbar.Toggle aria-controls = 'responsive-navbar-nav' />
        <Navbar.Collapse id = 'responsive-navbar-nav'>
        <Nav className = 'mx-auto'></Nav>
        <Nav>   <Nav.Link href='/'>Home</Nav.Link></Nav>
        
        <Nav>
        <Nav.Link href='/NewPoll'>New Poll</Nav.Link>
        <Nav>
        <Nav.Link href='/About'>About</Nav.Link>
        </Nav>
        <Nav.Link onClick={window.accountId === "" ? login : logout}>
            {window.accountId === "" ? "Login" : window.accountId}
            </Nav.Link>
        </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        
        
            <Routes>
            <Route exact path ="/" element={<Home changeCandidates={changeCandidatesFunction} />} />

            <Route exact path ="/PollingStation" element={<PollingStation />} />;
            
            <Route exact path="/NewPoll" element={<NewPoll />} />;

            <Route exact path="/About" element={<About />} />;
            </Routes>
            </Router>
    );
    }