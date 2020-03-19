import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

class App extends Component {

  state = {
    socket: socketIOClient('http://localhost:3001'),
    message: ''
  }

  componentDidMount() {
    this.state.socket.on('greet', this.doData)
  }

  doData = ( msg: string ) => {
    console.log('come')
    this.setState({
      message: msg
    })
  }

  handleChange = (e: any) => {
    this.state.socket.emit('greet', e.target.value)
  }

  render() {
    const {message} = this.state;
    return (
        <div style={{ textAlign: "center" }}>
          {message} <br/>
          <input onChange={this.handleChange} />
        </div>
    );
  }
}

export default App;
