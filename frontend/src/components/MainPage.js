import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { newPoint } from '../actions/chartActions';
import { signOut } from '../actions/loginActions';

import {connect} from "react-redux";

import history from '../history'
import PointForm from "./PointForm";

class MainPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Y: 0,
      X: 0,
      R: 1,
      points: []
    };
  }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

  handleLogOut = (event) => {
    event.preventDefault();
    this.setState({
      points: []
    });
    window.sessionStorage.setItem('isAuthorised', 'false');
    window.sessionStorage.setItem('login', '');
    this.props.signOut();
    history.push('login');
    document.location.reload();
  };

  addPoint = (event) => {
    event.preventDefault();

    this.props.newPoint(this.state.X, this.state.Y, this.state.R);

      let data = new URLSearchParams();
      data.append('X', this.state.X);
      data.append('Y', this.state.Y);
      data.append('R', this.state.R);

      fetch('http://localhost:8080/lab4/secure/add', {
          method: 'POST',
          body: data,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          credentials: 'include'
      }).then((response) => {
          if (response.ok) {
              console.log(response.json());
              drawPoint(this.refs.canvas, response.json().x, response.json().y, response.json().r);
          }
      }).catch((error) => {
          console.log('There has been a problem with your fetch operation: ', error.message);
      });
    // this.getAllPoints();
    // drawAllPoints(this.canvas, this.state.points, this.state.R);
  };

  // getAllPoints = () => {
  //   axios({
  //     method: 'GET',
  //     url: 'http://localhost:8080/lab4/getAll',
  //     withCredentials: true
  //   }).then((res) => {
  //     this.setState({
  //       points: res.data
  //     });
  //     drawAllPoints(this.canvas, this.state.points, this.state.R);
  //   }
  //   ).catch(function (error) {
  //     console.log(error)
  //   });
  // };

  componentDidMount() {
      console.log(this.canvas);
    // this.getAllPoints();
    drawCanvas(this.refs.canvas, 1);
    drawMarks(this.refs.canvas, this.state.R);
    drawAllPoints(this.refs.canvas, this.state.points, this.props.R);
  }

    _onMouseMove = (e) => {
        this.setState({ X: Math.round((((e.nativeEvent.offsetX - 150) * this.state.R)* 10 / 2 / 65 ))/ 10,
            Y:  Math.round(((-e.nativeEvent.offsetY + 150) * this.state.R)* 10 / 2 / 65) / 10});
    };

    interactiveCanvas = () => {
        let r = this.props.r;
        let x = this.props.x;
        let y = this.props.y;
        // drawPoint(this.canvas,x,y,r);
        document.getElementById('pointButton').click();
    };
  render(){
    if(sessionStorage.getItem("isAuthorised") === 'true'){
      return (
        <div className="main_div">
          <div className='logOutButton'>
            <input type='button'  onClick={this.handleLogOut.bind(this)}/>
          </div>

          <div className="canvasChart">
              <canvas id="canvas" width="300px" height="300px" ref={(node) => this.canvas = node}
                      onClick={this.interactiveCanvas} onMouseMove={this._onMouseMove}/>
          </div>
            <form id = "pointForm" >
                Выберите данные:

                Координата X:
                <select value={this.state.X} onChange={this.handleChange('X')}>
                    <option value="-5">-5</option>
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                Координата Y:
                <input type="text" name="Y" value={this.state.Y} onChange={this.handleChange('Y')}/>

                Радиус R:
                <select value={this.state.R} onChange={this.handleChange('R')}>
                    <option value="-5">-5</option>
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <input type="submit" id="pointButton" placeholder="Проверить" onClick={this.addPoint}/>
            </form>
          </div>
      );
    }else{
      return <Redirect to='/lab4/login'/>;
    }
  }
}

function mapStateToProps ( state) {
  return {
    x: state.point.x,
    y: state.point.y,
    r: state.point.r,
    login: state.user.login,
    isAuthorised: state.user.isAuthorised,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut : () => dispatch(signOut()),
    newPoint : (x,y,r) => dispatch(newPoint(x,y,r))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

function drawCanvas(canvas, r) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(150, 150);
  ctx.lineTo(280, 150);
  ctx.lineTo(150, 280);
  ctx.lineTo(150, 150);
  ctx.closePath();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "lightblue";
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(150, 20, 130, 130);
  ctx.closePath();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "lightblue";
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(150, 150);
  ctx.arc(150, 150, 65, Math.PI, -Math.PI/2, false);
  ctx.closePath();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "lightblue";
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(150, 0); ctx.lineTo(150, 300);
  ctx.moveTo(150, 0); ctx.lineTo(145, 12);
  ctx.moveTo(150, 0); ctx.lineTo(155, 12);
  ctx.closePath();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";
  ctx.stroke();

  ctx.beginPath();
  ctx.fillText("Y", 135, 10);
  ctx.moveTo(0, 150);
  ctx.lineTo(300, 150);
  ctx.moveTo(300, 150);
  ctx.lineTo(288, 145);
  ctx.moveTo(300, 150);
  ctx.lineTo(288, 155);
  ctx.fillText("X", 290, 165);
  ctx.closePath();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(145, 20);
  ctx.lineTo(155, 20);
  ctx.moveTo(145, 85);
  ctx.lineTo(155, 85);
  ctx.moveTo(145, 215);
  ctx.lineTo(155, 215);
  ctx.moveTo(145, 280);
  ctx.lineTo(155, 280);


  ctx.moveTo(20, 145);
  ctx.lineTo(20, 155);
  ctx.moveTo(85, 145);
  ctx.lineTo(85, 155);
  ctx.moveTo(215, 145);
  ctx.lineTo(215, 155);
  ctx.moveTo(280, 145);
  ctx.lineTo(280, 155);
  ctx.closePath();
  ctx.stroke();

}

function drawMarks(canvas, r){
  let ctx = canvas.getContext("2d");

  console.log(r);

  ctx.beginPath();

  if (r===0){
    ctx.fillText("-R", 12, 140);
    ctx.fillText("-R/2", 70, 140);
    ctx.fillText("R/2", 205, 140);
    ctx.fillText("R", 275, 140);
  } else {
    ctx.fillText(-r, 12, 140);
    ctx.fillText(-(r / 2), 70, 140);
    ctx.fillText((r / 2), 205, 140);
    ctx.fillText(r, 275, 140);
  }

  if (r === 0){
    ctx.fillText("R", 160, 25);
    ctx.fillText("R/2", 160, 90);
    ctx.fillText("-R/2", 160, 220);
    ctx.fillText("-R", 160, 285);
  } else {
    ctx.fillText(r, 160, 25);
    ctx.fillText((r / 2), 160, 90);
    ctx.fillText(-(r / 2), 160, 220);
    ctx.fillText(-r, 160, 285);
  }

  ctx.closePath();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";
  ctx.stroke();
}

function drawAllPoints(canvas,points,r) {
  drawCanvas(canvas,r);
  points.forEach(function(item) {
    if (item.r === r ) {
      drawPoint(canvas, item.x, item.y, r);
    }
  })
}

function drawPoint(canvas,x,y,r){
  let color;
  let ctx = canvas.getContext("2d");
  if (isArea(x,y,r)) {
    color = 'green';
  } else {
    color = 'red';
  }
  ctx.beginPath();
  ctx.arc(150+x*130/r,150-y*130/r,2,0,2*Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function isArea(x, y, r) {
  if (
    ((x <= 0) && (y >= 0) && (y <= (r+x)/2)) ||
    ((x >= 0) && (y >= 0) && ((x * x + y * y) <= (r * r ))) ||
    ((x >= 0) && (y <= 0) && (x <= r/2) && (y >= -r))
  ) {
    return true;
  }
  return false;

}
