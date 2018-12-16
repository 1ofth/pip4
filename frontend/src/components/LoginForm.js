import React, {Component} from 'react';
import history from "../history"
// import "../styles/Forms.css";
// import {connect} from "react-redux";
// import {signIn, signOut} from "../actions/actions";
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            password: '',
            isAuth: true
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    logIn = (evt) => {
        evt.preventDefault();

        let data = new URLSearchParams();
        data.append('login', this.state.nick);
        data.append('password', this.state.password);

        fetch('http://localhost:8080/pip4/login', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include'
        }).then((response) => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        }).then(() => {
            window.sessionStorage.setItem('logged', 'true');
            history.push('groups');
        }).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
    };
    render() {
        return (
            <div className="main_div">
                <form id="formLogIn" >
                    <h1>Вход:</h1>

                    <h3>Имя пользователя:</h3>
                    <input type="text" id="login" name="login" value={this.state.nick} onChange={this.handleChange('nick')}/>


                    <h3>Пароль:</h3>
                    <input id="password" name="password"  value={this.state.password} onChange={this.handleChange('password')} />
                    <br/><br/>

                    <input type="submit" onClick={this.logIn}/>

                </form>
            </div>
        );
    }
}

export default LoginForm;
// export default connect(null, {signIn, signOut})(LogInForm);