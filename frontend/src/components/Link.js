import React from 'react';
import {bindActionCreators} from "redux";
import {makeWarning} from "../store/Actions";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import history from '../History';

class SpecialLink extends React.Component {
  constructor(props) {
    super(props);

    this.clearWarning = this.clearWarning.bind(this);
  }

  clearWarning(event) {
    event.preventDefault();

    this.props.makeWarning('');
    history.push(this.props.path);
  }

  render(){
    return (
      <Link onClick={this.clearWarning} to={this.props.path}>{this.props.label}</Link>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeWarning: bindActionCreators(makeWarning, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialLink);
