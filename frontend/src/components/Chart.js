import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {addDot, makeWarning, updateChartFinished} from "../store/Actions";
import connect from "react-redux/es/connect/connect";



class Chart extends Component{
  constructor(props){
    super(props);

    this.state = {
      width: 300,
      height: 300,
      r: 1,
      dots: [],
      currentCoordinates: {xChart: 0, yChart: 0, x: 0, y: 0}
    };

    this.updateCanvas = this.updateCanvas.bind(this);
  }

  componentDidMount() {
    this.updateCanvas();
  }
  componentDidUpdate() {
    this.updateCanvas();
  }

  getNormalizedCoordinates(x, y){
    return {
      x: this.props.chartR*(x - 150)/150/0.87,
      y: this.props.chartR*(y + 150)/150/0.87
    }
  }

  getChartCoordinates(x, y){
    return{
      x: Math.round(x/this.props.chartR*150*0.87+150),
      y: Math.round(y/this.props.chartR*150*0.87-150)
    }
  }

  // TODO check if it works
  handleClick = event => {
    const {x, y} = this.getNormalizedCoordinates(event.pageX - this.refs.canvas.offsetLeft,
      event.pageY - this.refs.canvas.offsetTop);

    let data = new URLSearchParams();
    data.append('x', x);
    data.append('y', y);
    data.append('r', this.props.chartR);

    fetch('http://localhost:8080/lab4/add', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        this.props.newDot();
      } else {
        this.props.makeWarning('ODZ!');
      }
    }).catch(error => {
      this.props.makeWarning('There has been a problem with your fetch operation: ' + error.message);
    });
  };

  updateCanvas(){
    this.draw(this.props.chartR);
  }

  // TODO
  updateDots(){
    fetch({
      method: 'GET',
      url: 'http://localhost:8080/lab4/getAll',
      withCredentials: true
    }).then((res) => {
        this.setState({
          dots: res.data
        });
      this.drawDots();
      }
    ).catch(function (error) {
      if (error === undefined || error.response === undefined) {
        this.props.history.push('/ss');
      }
    });
  }

  // TODO
  drawDots(){

  }

  // TODO
  drawDot(x, y, isArea){
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");

    if(isArea === true){
      ctx.strokeStyle = 'red';
      ctx.fillStyle = 'red';
    } else {
      ctx.strokeStyle = 'blue';
      ctx.fillStyle = 'blue';
    }


  }

  draw(r){
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");

    const color = '#3399ff';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'black';
    ctx.fillStyle = color;

    // section
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 65, Math.PI, -Math.PI/2, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // triangle
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(150, 85);
    ctx.lineTo(280,150);
    ctx.lineTo(150, 280);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // rect
    ctx.beginPath();
    ctx.rect(150, 150, 130, -130);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "black";

    //axis
    ctx.beginPath();
    ctx.moveTo(150, 0); ctx.lineTo(150, 300);
    ctx.moveTo(150, 0); ctx.lineTo(145, 12);
    ctx.moveTo(150, 0); ctx.lineTo(155, 12);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillText("Y", 160, 10);
    ctx.moveTo(0, 150);
    ctx.lineTo(300, 150);
    ctx.moveTo(300, 150);
    ctx.lineTo(288, 145);
    ctx.moveTo(300, 150);
    ctx.lineTo(288, 155);
    ctx.fillText("X", 290, 135);
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.stroke();

    // X
    ctx.beginPath();
    ctx.moveTo(145, 20);
    ctx.lineTo(155, 20);
    ctx.moveTo(145, 85);
    ctx.lineTo(155, 85);
    ctx.moveTo(145, 215);
    ctx.lineTo(155, 215);
    ctx.moveTo(145, 280);
    ctx.lineTo(155, 280);
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

    // Y
    ctx.moveTo(20, 145);
    ctx.lineTo(20, 155);
    ctx.moveTo(85, 145);
    ctx.lineTo(85, 155);
    ctx.moveTo(215, 145);
    ctx.lineTo(215, 155);
    ctx.moveTo(280, 145);
    ctx.lineTo(280, 155);
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

    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.stroke();
  }

  render(){
    return(
      <div>
        {this.props.chartR}
        {this.props.updateChart !== undefined && this.props.updateChart === true ? this.updateCanvas() : ''}
        <canvas id={'chart'} ref="canvas" width={this.state.width} onClick={this.handleClick} height={this.state.height}/>

        <div className={'warning'}> {this.props.warning}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chartR: state.chartR,
    warning: state.message,
    updateChart: state.updateChart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeWarning : bindActionCreators(makeWarning, dispatch),
    newDot: bindActionCreators(addDot, dispatch),
    updateChartFinished: bindActionCreators(updateChartFinished, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);