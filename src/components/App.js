import React, { Component } from 'react';
import ChatRoom from "./ChatRoom";

class App extends Component {
  state = {
    user: {
      name: new Date().getTime(),
      color: "#bada55"
    }
  }

  render() {
    const { user } = this.state
    return (
      <ChatRoom user={user} />
    );
  }
}

export default App;
