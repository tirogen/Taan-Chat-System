import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import { Container, Row, Col } from 'react-bootstrap';
import Client from './components/Client';
import Room from './components/Room';
import Member from './components/Member';
import Chat from './components/Chat';
import Test from './components/Test';
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

  handleChange = (e: any) => {
    // const msg: Message = {
    //   room: 'taan0229',
    //   message: e.target.value,
    //   owner: 'uniqueue'
    // }
    // this.state.socket.emit('greet', msg)
  }

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
          /*<Col>
            <Test />
            <p>From App.tsx {this.props.counter.n}</p>
            <p>From App.tsx {this.props.counter.message}</p>
            <button onClick={() => this.props.increment()}>Add in App.tsx</button>
          </Col>*/
        </Row>
      </>
    );
  }
}

// export default App;
export default connect(mapStateToProps, {increment})(App);
