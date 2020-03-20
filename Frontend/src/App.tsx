import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
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
      <div className="container py-5 px-4">

        <div className="row rounded-lg overflow-hidden shadow">

          <div className="col-5 px-0">
            <div className="bg-white">

              <div className="bg-gray px-4 py-2 bg-light">
                <p className="h5 mb-0 py-1">Recent</p>
              </div>

              <div className="messages-box">
                <div className="list-group rounded-0">

                  <a className="list-group-item list-group-item-action active text-white rounded-0">
                    <div className="media"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" className="rounded-circle" />
                      <div className="media-body ml-4">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <h6 className="mb-0">Jason Doe</h6><small className="small font-weight-bold">25 Dec</small>
                        </div>
                        <p className="font-italic mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                      </div>
                    </div>
                  </a>

                </div>
              </div>
            </div>
          </div>

          <div className="col-7 px-0">
            <div className="px-4 py-5 chat-box bg-white">

              <div className="media w-50 mb-3"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" className="rounded-circle" />
                <div className="media-body ml-3">
                  <div className="bg-light rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-muted">Test which is a new approach all solutions</p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>

              <div className="media w-50 ml-auto mb-3">
                <div className="media-body">
                  <div className="bg-primary rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-white">Test which is a new approach to have all solutions</p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>

            </div>

            <form action="#" className="bg-light">
              <div className="input-group">
                <input type="text" placeholder="Type a message" aria-describedby="button-addon2" className="form-control rounded-0 border-0 py-4 bg-light" />
                <div className="input-group-append">
                  <button id="button-addon2" type="submit" className="btn btn-link"> <i className="fa fa-paper-plane"></i></button>
                </div>
              </div>
            </form>

          </div>
        </div>
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
