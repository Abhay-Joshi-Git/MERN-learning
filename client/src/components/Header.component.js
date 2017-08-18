import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import app_config from '../config/app-config';
import Payments from './Payments';
import { logOut } from '../actions/auth';

const ToolBarLi = (props) => {
  return (
    <li style={{ marginRight: '10px' }}>
      {props.children}
    </li>
  );
}

class HeaderComponent extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">Emaily</Link>
          {this.getRightSideToolBar()}
        </div>
      </nav>
    );
  }

  getRightSideToolBar() {
    let toolBarClassName = "right";
    return this.props.auth ? 
    <ul className={toolBarClassName}>
      <ToolBarLi><Payments /></ToolBarLi>
      <ToolBarLi>Credits Available: {this.props.auth.credits}</ToolBarLi>
      <ToolBarLi><a onClick={() => {
        this.props.logOut();
      }}>Logout</a></ToolBarLi>
    </ul> :
    <ul className={toolBarClassName}>
      <li><a href={app_config.google_auth} referrerPolicy="origin" >sign in with google</a></li>
    </ul>
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { logOut })(HeaderComponent);