import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupList from './GroupList';
import Default from "./Default";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/pip4/' exact={true} component={Home}/>
                    <Route path='/pip4/groups' exact={true} component={GroupList}/>
                    <Route exact={true} component={Default}/>
                </Switch>
            </Router>
        )
    }
}

export default App;