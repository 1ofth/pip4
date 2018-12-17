import React, {Component} from 'react'

class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            width: 420,
            height: 420,
            r: 1,
            dots: [],
            currentX: 0,
            currentY: 0
        };

        this.updateCanvas = this.updateCanvas.bind(this);
    }

    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }

    // get coordinates from inputs; returns coordinates in chart
    convertCoodinates(xP, yP){
        let margin = 35;

        return {x: xP*35 + margin, y: yP*35 + margin}
    }

    handleClick = event => {
        this.setState({
            currentX: (event.pageX - this.refs.canvas.offsetLeft),
            currentY: (event.pageY - this.refs.canvas.offsetTop)
        });
    };

    updateCanvas(){
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0, 300, 300);
        ctx.drawImage(this.refs.image, 1, 1);
        console.log("1")
        //ctx.fillRect(0, 0, this.state.width, this.state.height);
    }

    render(){
        return(
            <div>
                <canvas ref="canvas" width={this.state.width} onClick={this.handleClick} height={this.state.height}/>
                <img ref='image' src='../chart.png' className="hidden" alt='qqq'/>
            </div>
        )
    }
}

export default Chart;