import React, { Component, Fragment } from 'react';
import ChatRoom from "./ChatRoom";
import WelcomeScreen from "./WelcomeScreen";

class App extends Component {
  state = {
    user: {
      name: localStorage.getItem("name") || `AnakBawang${Math.ceil(Math.random() * 100)}`,
      color: localStorage.getItem("color") ||  "#fc5c65"
    },
    ready: false
  }

  setUser = user => {
    user && localStorage.setItem("name", user.name)
    user && localStorage.setItem("color", user.color)
    this.setState({ user })
  }

  setReadyStatus = ready => this.setState({ ready })

  render() {
    const { user, ready } = this.state
    return (
      <Fragment>
        {
          ready ? (
            <ChatRoom user={user} setReadyStatus={this.setReadyStatus} />
          ) : (
            <WelcomeScreen user={user} setUser={this.setUser} setReadyStatus={this.setReadyStatus} />
          )
        }
      </Fragment>
    );
  }
}

export default App;
