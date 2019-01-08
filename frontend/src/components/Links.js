import React from 'react';
import {Link} from 'react-router-dom';
import {path} from '../Views';

export default class Links extends React.Component{
  render(){
    return (
      <div>
        <br/>
        <br/>
        <Link to={path+'main'}>Main</Link>
        <br/>
        <Link to={path+'log'}>Login</Link>
        <br/>
        <Link to={path+'notfound'}>null</Link>
        <br/>
        <Link to={path+'reg'}>Register</Link>
      </div>
    );
  }
}