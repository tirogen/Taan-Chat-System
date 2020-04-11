import React, { Component } from 'react';
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
      <div className="layout">
        <Client />
          <div className="content">
              <Room />
              <Member />
              <Chat />
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, {increment})(App);
