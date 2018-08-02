import React, { Component } from "react";
import io from "socket.io-client";

const EVENT = {
  CONNECT: "connect",
  CONNECT_ERROR: "connect_error",
  DISCONNECT: "disconnect",
  DISCONNECTING: "disconnecting",
  ERROR: "error",
  CLIENT_JOIN_ROOM: "client_join_room",
  CLIENT_LEAVE_ROOM: "client_leave_room",
  CLIENT_SEND_MESSAGE: "client_send_message",
  SERVER_JOIN_ERROR: "server_join_error",
  SERVER_UPDATE_USER_LIST: "server_update_user_list",
  SERVER_UPDATE_HISTORY: "server_update_history",
}

class ChatRoom extends Component {
  state = {
    history: [],
    users: [],
    draft: localStorage.getItem("draft") || ""
  }

  componentDidMount() {
    const source = process.env.NODE_ENV === "production" ? "https://128.199.222.169/omdo" : "http://localhost:3003"
    this.socket = io(source)
    this.socket.on(EVENT.CONNECT, this.joinRoom)
    this.socket.on(EVENT.CONNECT_ERROR, console.log)
    this.socket.on(EVENT.SERVER_UPDATE_USER_LIST, this.updateUsers)
    this.socket.on(EVENT.SERVER_UPDATE_HISTORY, this.addNewMessage)
  }

  joinRoom = () => {
    const { user } = this.props
    this.socket.emit(EVENT.CLIENT_JOIN_ROOM, { user }, this.updateUsers)
  }

  updateUsers = users => {
    this.setState({ users })
  }

  addNewMessage = message => {
    const { history } = this.state
    let newHistory = this.state.history.slice()
    newHistory.push(message)
    this.setState({ history: newHistory })
  }

  setDraft = e => {
    this.setState({ draft: e.target.value })
    localStorage.setItem("draft", e.target.value)
  }

  sendMessage = e => {
    if (e.keyCode === 13) {
      // user pressed "Enter"
      const { user } = this.props
      const { history, draft } = this.state
      this.socket.emit(EVENT.CLIENT_SEND_MESSAGE, { user, message: draft })
      // do an optimist update of history
      const newHistory = history.slice()
      newHistory.push({
        user,
        message: draft
      })
      this.setState({
        history: newHistory,
        draft: ""
      })
      localStorage.removeItem("draft")
    }
  }

  leaveRoom = e => {
    const { user } = this.props
    this.socket.emit(EVENT.CLIENT_LEAVE_ROOM, { user })
  }

  render() {
    const { history, draft } = this.state
    
    return (
      <div>
        <input
          type="text"
          name="message"
          value={draft}
          onChange={this.setDraft}
          onKeyUp={this.sendMessage}
        />
        <button
          type="button"
          onClick={this.leaveRoom}
        >
          Leave Room
        </button>
        <div>
          {
            history.map((obj, index) => (
              <p key={index}>
                <span style={{ color: obj.user.color }}>
                  {`${obj.user.name}: `}
                </span>
                {obj.message}
              </p>
            ))
          }
        </div>
      </div>
    )
  }
}

export default ChatRoom
