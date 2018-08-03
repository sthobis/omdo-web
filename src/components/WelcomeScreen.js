import React, { Component } from "react";

// https://flatuicolors.com/palette/de
const colorPalette = [
  "#fc5c65",
  "#fd9644",
  "#fed330",
  "#26de81",
  "#2bcbba",
  "#eb3b5a",
  "#fa8231",
  "#f7b731",
  "#20bf6b",
  "#0fb9b1",
  "#45aaf2",
  "#4b7bec",
  "#a55eea",
  "#d1d8e0",
  "#778ca3",
  "#2d98da",
  "#3867d6",
  "#8854d0",
  "#a5b1c2",
  "#4b6584"
];

class WelcomeScreen extends Component {
  setUserProps = (prop, value) => {
    const { user, setUser } = this.props;
    setUser({
      ...user,
      [prop]: value
    });
  };

  render() {
    const { user, setReadyStatus } = this.props;
    return (
      <div className="user-form">
        <div className="field">
          <input
            autoFocus
            type="text"
            id="username"
            name="username"
            value={user.name}
            onChange={e => this.setUserProps("name", e.target.value)}
            placeholder="e.g. Anak Bawang"
            maxLength={30}
          />
        </div>
        <div className="field">
          <div className="color-palette">
            {colorPalette.map(color => (
              <span
                key={color}
                style={{ background: color }}
                onClick={e => this.setUserProps("color", color)}
              />
            ))}
          </div>
        </div>
        <div className="field">
          <button onClick={e => setReadyStatus(true)} />
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;
