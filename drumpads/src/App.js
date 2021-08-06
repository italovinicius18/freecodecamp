import React from "react";
import "./App.css";

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actualPad: ''
    }
    this.handleSound = this.handleSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleSound = (id,e) => {
    const sound = e.target.firstChild
    sound.currentTime = 0
    sound.play()
    this.setState({
      actualPad: id.id
    })
  }


  handleKeyPress = (event) => {
    const key = event.key.toUpperCase()

    const sound = document.getElementById(key)
    if(sound){
      const parentDiv = sound.parentElement
      const parentId = parentDiv.id
      parentDiv.focus()
      parentDiv.click()
      sound.currentTime = 0
      sound.play()
      this.setState({
        actualPad: parentId
      })
    }
  }

  render(){
    return (
      <div id="drum-machine" onKeyPress={this.handleKeyPress}>
        <div className="pads">
          {bankOne.map((item) => (
            <div
              key={item.keyCode}
              id={item.id}
              className="drum-pad noselect"
              onClick={(e) => this.handleSound(item,e)}
            >
              <audio src={item.url} className="clip" id={item.keyTrigger}></audio>
              {item.keyTrigger}
            </div>
          ))}
        </div>
        <div id="display">
          <h1 className="noselect">{this.state.actualPad}</h1>
        </div>
      </div>
    );
  }
}

export default App;
