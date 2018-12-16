import React, { Component } from "react";
import '../styles/Header.css';

class Header extends Component {
    render() {
        return (
            <div id="header" className="header">
                <div className="head">Группа P3212</div>
                <div className="head">Ибраимов Эдем, Морозов Иван</div>
                <div className="head">Вариант 31517</div>
            </div>
        );
    }
}

export default Header;