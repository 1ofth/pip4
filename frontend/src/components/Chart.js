import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {addDot, makeWarning, updateChartFinished} from "../store/Actions";
import connect from "react-redux/es/connect/connect";

export function checkInArea(x, y, r) {
  return (x <= r && y >= 0 && y <= r && x >= 0) || //square
    (x <= r && y <= 0 && y >= x - r && x >= 0) || //triangle
    (x <= 0 && y >= 0 && y <= Math.sqrt(r / 4 - x * x));
}

class Chart extends Component{
  constructor(props){
    super(props);

    this.state = {
      width: 300,
      height: 300,
      r: 1,
      dots: '',
      currentCoordinates: {xChart: 0, yChart: 0, x: 0, y: 0}
    };

    this.updateDots();

    console.log("!!");
    this.updateCanvas = this.updateCanvas.bind(this);

  }

  componentDidMount() {
    this.updateCanvas();

  }
  componentDidUpdate() {
    this.updateCanvas();
  }

  // ret x=1.1 y=0
  getNormalizedCoordinates(x, y){
    return {
      x: this.props.chartR*(x)/150/0.87,
      y: this.props.chartR*(y)/150/0.87
    }
  }

  // ret x=-110 y=75
  getChartCoordinates(x, y){
    return{
      x: Math.round(x/this.props.chartR*150*0.87),
      y: Math.round(y/this.props.chartR*150*0.87)
    }
  }

  handleClick = event => {
    const x = event.nativeEvent.offsetX - 150;
    const y =-event.nativeEvent.offsetY + 150;
    const r = this.props.chartR;

    const a = this.getNormalizedCoordinates(x,y);

    if( a.x === undefined || a.y === undefined || r === undefined || a.x < -5 || a.x > 3 || a.y < -3 || a.y > 5 ||
      r < 0 || r > 5){
      this.props.makeWarning('Incorrect data');
      return;
    }

    if(checkInArea(a.x, a.y, this.props.chartR)){
      this.drawDot(event.nativeEvent.offsetX - 150, -event.nativeEvent.offsetY + 150, true);
    } else {
      this.drawDot(event.nativeEvent.offsetX - 150, -event.nativeEvent.offsetY + 150, false);
    }

    let data = new URLSearchParams();
    data.append('X', a.x);
    data.append('Y', a.y);
    data.append('R', this.props.chartR);

    fetch('http://localhost:8080/lab4/add', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    }).then( () => {
      this.props.newDot(a.x, a.y, r, checkInArea(a.x, a.y, r));
    }).catch(error => {
      this.props.makeWarning('There has been a problem with your fetch operation: ' + error.message);
    });
  };

  updateCanvas(){
    //this.updateDots();
    this.draw(this.props.chartR);
    this.updateChart();
  }

  updateChart(){
    if(this.state.dots !== undefined && this.state.dots.length > 0) {
      //console.log('chart is updating');
      // console.log("pre:\n" + this.state.dots + '\n post:');
      let text = this.state.dots
        .substr(1, this.state.dots.length - 2)
        .replace('\\', '')
        .replace('\\n', '')
        .split(", ");

      //console.log("text was changed");

      for (let i = 0; i < text.length; i++) {
        //console.log(text[i]);
        const obj = JSON.parse(text[i]);
        const coord = this.getChartCoordinates(obj.x, obj.y);

        //console.log("check if it should be drawn " + obj.r + "  " + this.props.chartR);
        if((Number)(obj.r) === (Number)(this.props.chartR)) {
          //console.log('drawning: ' + obj.x + ":" + obj.y + " " + obj.r);
          this.drawDot(coord.x, coord.y, obj.inArea);
        }
      }
    }
  }

  updateDots(){
    fetch('http://localhost:8080/lab4/getAll', {
      method: 'GET',
      withCredentials: true
    }).then( (response) => {
      return response.text()
    }).then( (res) => {
        this.setState({
          dots : res
        });
        }
      ).catch(function (error) {
      if (error === undefined || error.response === undefined) {
        this.props.makeWarning("oi...");
      }
    });
  }

  addDot(){
    const coord = this.getChartCoordinates(this.props.newDot.x, this.props.newDot.y);
    this.drawDot(coord.x, coord.y, this.props.inArea);
  }

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

    ctx.beginPath();
    ctx.arc(150+x,150-y, 2, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
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

  handleUpdate(){
    this.updateDots();
    this.updateChart();
    this.props.updateChartFinished();
  }

  render(){
    return(
      <div>
        {this.props.updateChart === true && this.props.newDot !== undefined
          ? this.handleUpdate()
          : ''}
        <canvas ref="canvas" width={this.state.width} onClick={this.handleClick} height={this.state.height}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chartR: state.chartR,
    warning: state.message,
    updateChart: state.updateChart,
    updateTable: state.updateTable,
    newDot: state.newDot
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