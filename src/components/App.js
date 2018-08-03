import React, { Component } from 'react';
import ChatRoom from "./ChatRoom";
import WelcomeScreen from "./WelcomeScreen";

class App extends Component {
  state = {
    user: {
      name: `AnakBawang${Math.ceil(Math.random() * 100)}`,
      color: localStorage.getItem("color") ||  "#fc5c65"
    },
    ready: false
  }

  setUser = user => {
    user && localStorage.setItem("color", user.color)
    this.setState({ user })
  }

  setReadyStatus = ready => this.setState({ ready })

  render() {
    const { user, ready } = this.state

    return (
      <div className="container" style={{ backgroundColor: user.color }}>
        {
          ready ? (
            <ChatRoom user={user} setReadyStatus={this.setReadyStatus} />
          ) : (
            <WelcomeScreen user={user} setUser={this.setUser} setReadyStatus={this.setReadyStatus} />
          )
        }
      </div>
    );
  }
}

export default App;
