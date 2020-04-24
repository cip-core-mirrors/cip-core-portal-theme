import '../css/main.css';
import './menu';
import './botpress';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {DropdownButton, Dropdown, Button}  from 'react-bootstrap'


window.addEventListener('load', () => {

    const logStatusDiv = document.getElementById('logStatusDiv');
    
    axios.get('/oauth/token')
        .then(response => {
    
            window.postMessage({subject: response.data.sub})
    
            ReactDOM.render(
                <DropdownButton id="dropdownMenuButton" title={response.data.name} variant="outline-secondary">
                    <Dropdown.Item href={`/oauth/logout?redirect=http://${window.location.hostname}:${window.location.port}`}>Logout</Dropdown.Item>
                </DropdownButton>,
                logStatusDiv
            )
        })
        .catch(error => {
            
            ReactDOM.render(
                <Button variant="outline-secondary" className="navbar-text">Unauthenticated user</Button>,
                logStatusDiv
            )
        })
})
