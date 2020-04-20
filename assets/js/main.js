import '../css/main.css';
import './menu';
import './botpress';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {DropdownButton, Dropdown, Button}  from 'react-bootstrap'


const logStatusDiv = document.getElementById('logStatusDiv');

axios.get('/oauth/expired')
    .then((response) => {

        ReactDOM.render(
            <DropdownButton id="dropdownMenuButton" title="...." variant="outline-secondary">
                <Dropdown.Item href={`/oauth/logout?redirect=http://${window.location.hostname}:${window.location.port}`}>Logout</Dropdown.Item>
            </DropdownButton>,
            logStatusDiv
        )

        axios.get('/oauth/token')
            .then(response => {
                document.getElementById('dropdownMenuButton').innerText = response.data.preferred_username
            })
            .catch(error => {
                
                document.getElementById('dropdownMenuButton').innerText = 'Unknown user'
            })
    })
    .catch((error) => {

        ReactDOM.render(
            <Button variant="outline-secondary" className="navbar-text">Unauthenticated user</Button>,
            logStatusDiv
        )
    })
