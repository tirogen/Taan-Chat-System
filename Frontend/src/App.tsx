import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import { Alert } from 'react-bootstrap';
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
    const {message} = this.state;
    return (
        <div style={{ textAlign: "center" }}>
          {message} <br/>
          <input onChange={this.handleChange} /><Alert variant="success">
  <Alert.Heading>Hey, nice to see you</Alert.Heading>
  <p>
    Aww yeah, you successfully read this important alert message. This example
    text is going to run a bit longer so that you can see how spacing within an
    alert works with this kind of content.
  </p>
  <hr />
  <p className="mb-0">
    Whenever you need to, be sure to use margin utilities to keep things nice
    and tidy.
  </p>
</Alert>
        </div>
    );
  }
}

export default App;

interface Message {
   room: string;
   message: string;
   owner: string;
}
