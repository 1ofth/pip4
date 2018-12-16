import React, { Component } from 'react';
// import CanvasP from "./CanvasP";
// import {addPoint, signOut} from "../actions/actions";
// import {connect} from "react-redux";
import history from "../history"

class PointForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            X: 1,
            Y: 2,
            R: 3
        };
    }

    handleLogOut = (event) => {
        event.preventDefault();
        window.sessionStorage.setItem('logged', 'false');
        this.props.signOut();
        history.push('/');
        document.location.reload();
    };


    savePoint = (event) => {
        event.preventDefault();
        // this.props.addPoint(this.state.spinnerX, this.state.sliderY, this.state.spinnerR);
        let data = new URLSearchParams();
        data.append('X', this.state.X);
        data.append('Y', this.state.Y);
        data.append('R', this.state.R);

        fetch('http://localhost:8080/pip4/secure/add', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include'
        }).then((response) => {
            if (response.ok) {
                console.log(response.json())
            }
        }).catch((error) => {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <div className="main_div">
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

                    <input type="submit" id="pointButton" placeholder="Проверить" onClick={this.savePoint}/>
                </form>
                {/*<Button label="Выйти" onClick={this.handleLogOut.bind(this)}/>*/}
                {/*<CanvasP/>*/}

                <div id="resultPoint">

                </div>
            </div>
        );
    }

}

// function mapStateToProps (state) {
//     return {
//         x: state.point.x,
//         y: state.point.y,
//         r: state.point.r,
//         nick: state.user.nick,
//         isAuthorised: state.user.isAuthorised,
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         signOut : () => dispatch(signOut()),
//         addPoint : (x,y,r) => dispatch(addPoint(x,y,r))
//     }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(PointForm);
export default PointForm;