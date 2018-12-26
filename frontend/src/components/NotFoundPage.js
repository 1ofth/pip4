import React, { Component } from 'react';
import {Link} from "react-router-dom";

class NotFoundPage extends Component{
   render(){
     return(
         <div>
            <h1>NotFoundPage</h1>
            <Link to="/lab4/">click me</Link>
         </div>
     )
   }
}

export default NotFoundPage;
