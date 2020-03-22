import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Client from './components/Client';
import Room from './components/Room';
import Member from './components/Member';
import Chat from './components/Chat';
import './App.scss';
import { AppState } from './store';
import { increment } from './store/actions';
import { CounterState } from './store/type';
import { connect } from 'react-redux';

const mapStateToProps = (state : AppState) => ({
  counter: state.counter
});

interface AppProps {
  increment: typeof increment;
  counter: CounterState;
}

class App extends Component<AppProps> {

  render() {
    return (
      <>
        <Row>
          <Col>Top</Col>
        </Row>
        <Row>
          <Col md={2}><Client /></Col>
          <Col md={3}><Room /></Col>
          <Col md={2}><Member /></Col>
          <Col><Chat /></Col>
        </Row>
      </>
    );
  }
}

export default connect(mapStateToProps, {increment})(App);
