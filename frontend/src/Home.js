import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import {Container } from 'reactstrap';
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";

class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Container fluid>
                    <Link to="/pip4/groups">Manage JUG Tour</Link>
                </Container>
                <LoginForm/>
            </div>
        );
    }
}

export default Home;