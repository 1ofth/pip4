import React, { Component } from 'react';
import {Link} from "react-router-dom";

class NotFoundPage extends Component{
   render(){
     return(
         <div>
            <h1>NotFoundPage</h1>
            <Link to="/lab4/">exexe</Link>
             <Link to="/lab4/main">exexe</Link>
             <Link to="/lab4/log">exexe</Link>
             <Link to="/lab4/login">exexe</Link>
             <Link to="/lab4/">exexe</Link>
         </div>
     )
   }
}

export default NotFoundPage;
