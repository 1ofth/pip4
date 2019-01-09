import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {addDot, loadDots, makeWarning, updateChartFinished} from "../store/Actions";
import connect from "react-redux/es/connect/connect";

class Chart extends Component{
  handleClick = event => {
    const x = event.nativeEvent.offsetX - 150;
    const y = -event.nativeEvent.offsetY + 150;
    const c = this.getNormalizedCoordinates(x, y);

    this.props.addDot(c.x, c.y, this.props.chartR);
  };

  constructor(props) {
    super(props);

    this.state = {
      width: 300,
      height: 300,
      r: 1
    };

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
      x: this.props.chartR * (x) / 150 / 0.87,
      y: this.props.chartR * (y) / 150 / 0.87
    }
  }

  // ret x=-110 y=75
  getChartCoordinates(x, y){
    return{
      x: 150 + Math.round(x / this.props.chartR * 150 * 0.87),
      y: 150 - Math.round(y / this.props.chartR * 150 * 0.87)
    }
  }

  updateCanvas(){
    this.props.updateChartFinished();

    this.draw(this.props.chartR);

    if (this.props.dots.length === 0) {
      this.props.loadDots();
    }

    for (let i = 0; i < this.props.dots.length; i++) {
      const dot = this.props.dots[i];

      if (dot.r === this.props.chartR) {
        this.drawDot(dot.x, dot.y);
      }
    }
  }

  drawDot(x, y) {
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext("2d");

    let isArea = false;
    const r = this.props.chartR;

    if (y >= 0 && y <= r && x >= 0 && x <= r ||      // rect
      y >= 0 && x <= 0 && y * y <= (r * r / 4 - x * x) ||  // segment
      y <= 0 && x >= 0 && y >= x - r) {             // triangle
      isArea = true;
    }

    const c = this.getChartCoordinates(x, y);

    if(isArea === true){
      ctx.strokeStyle = 'red';
      ctx.fillStyle = 'red';
    } else {
      ctx.strokeStyle = 'blue';
      ctx.fillStyle = 'blue';
    }

    ctx.beginPath();
    ctx.arc(c.x, c.y, 3, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
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
        {this.props.updateChart === true ? this.updateCanvas() : ''}
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
    dots: state.dots
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeWarning : bindActionCreators(makeWarning, dispatch),
    addDot: bindActionCreators(addDot, dispatch),
    updateChartFinished: bindActionCreators(updateChartFinished, dispatch),
    loadDots: bindActionCreators(loadDots, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);