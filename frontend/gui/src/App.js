import React, { Component } from 'react';
import './base.css';
import CustomLayout from './containers/Layout';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import * as actions from './store/actions/auth';

class App extends Component {
  
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  
  render() {
    return (
      <div id="root-child">
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated:  state.token!== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
