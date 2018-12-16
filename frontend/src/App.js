import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { Router, Route, Switch } from 'react-router-dom';
import GroupList from './GroupList';
import Default from "./Default";
import history from "./history"
class App extends Component {

    render() {
        return (
            <Router history={history}>
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