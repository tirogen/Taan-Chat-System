import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import { Container, Row, Col } from 'react-bootstrap';
import Client from './components/Client';
import Room from './components/Room';
import Member from './components/Member';
import Chat from './components/Chat';
import Test from './components/Test';
import {Message} from './types'
import './App.scss';

class App extends Component {

  state = {
    socket: socketIOClient('http://localhost:3001'),
    message: ''
  }

  componentDidMount() {
    this.state.socket.emit('join-room', 'taan0229')

    this.state.socket.on('display', ({room, message, owner}: Message) => {
      this.setState({ message })
    })
  }

  handleChange = (e: any) => {
    const msg: Message = {
      room: 'taan0229',
      message: e.target.value,
      owner: 'uniqueue'
    }
    this.state.socket.emit('greet', msg)
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>Top</Col>
        </Row>
        <Row>
          <Col md={2}><Client /></Col>
          <Col md={3}><Room /></Col>
          <Col md={2}><Member /></Col>
          <Col><Chat /></Col>
          <Col><Test /></Col>
        </Row>
      </Container>
    );
  }
}

export default App;
