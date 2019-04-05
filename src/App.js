import React, { Component } from 'react';
import './App.css';

/* Define global constants */
const soundInitialTime = 0;
const mp3s = [
  [
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  ], 
  [
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", 
    "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  ]
];
const soundDrums = [
  {
    name: "Heater-1",
    keyCode: 81,
    keyTrigger: "Q",
    source: mp3s[0][0]
  }, 
  {
    name: "Heater-2",
    keyCode: 87,
    keyTrigger: "W",
    source: mp3s[0][1]
  }, 
  {
    name: "Heater-3",
    keyCode: 69,
    keyTrigger: "E",
    source: mp3s[0][2]
  }, {
    name: "Heater-4",
    keyCode: 65,
    keyTrigger: "A",
    source: mp3s[0][3]
  }, 
  {
    name: "Heater-6",
    keyCode: 83,
    keyTrigger: "S",
    source: mp3s[0][4]
  }, 
  {
    name: "Dsc-Oh",
    keyCode: 68,
    keyTrigger: "D",
    source: mp3s[0][5]
  }, 
  {
    name: "Kick-n-Hat",
    keyCode: 90,
    keyTrigger: "Z",
    source: mp3s[0][6]
  }, 
  {
    name: "RP4-Kick",
    keyCode: 88,
    keyTrigger: "X",
    source: mp3s[0][7]
  }, 
  {
    name: "Cev-H2",
    keyCode: 67,
    keyTrigger: "C",
    source: mp3s[0][8]
  }
];
const soundPiano = [
  {
    name: "Chord-1",
    keyCode: 81,
    keyTrigger: "Q",
    source: mp3s[1][0]
  }, 
  {
    name: "Chord-2",
    keyCode: 87,
    keyTrigger: "W",
    source: mp3s[1][1]
  }, 
  {
    name: "Chord-3",
    keyCode: 69,
    keyTrigger: "E",
    source: mp3s[1][2]
  }, 
  {
    name: "Give-us-a-light",
    keyCode: 65,
    keyTrigger: "A",
    source: mp3s[1][3]
  }, 
  {
    name: "Dry-Ohh",
    keyCode: 83,
    keyTrigger: "S",
    source: mp3s[1][4]
  }, 
  {
    name: "Bld-H1",
    keyCode: 68,
    keyTrigger: "D",
    source: mp3s[1][5]
  }, 
  {
    name: "Punchy-Kick",
    keyCode: 90,
    keyTrigger: "Z",
    source: mp3s[1][6]
  }, 
  {
    name: "Side-stick",
    keyCode: 88,
    keyTrigger: "X",
    source: mp3s[1][7]
  },   
  {
    keyCode: 67,
    keyTrigger: "C",
    name: "Brk-Snr",
    source: mp3s[1][8]
  }
];

/* Build components */
class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {buttonState: "inactivePad"};
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.highlightPad = this.highlightPad.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(event) {
    if (event.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  highlightPad() {
    this.state.buttonState === "activePad" ? this.setState({buttonState: "inactivePad"}) : this.setState({buttonState: "activePad"});
  }
  playSound() {
    let sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = soundInitialTime;
    sound.play();
    this.highlightPad();
    setTimeout(() => this.highlightPad(), 150);
    this.props.updateDisplay(this.props.soundName.replace(/-/g, " "));
  }
  render() {
    return (
      <button id={this.props.soundName} onClick={this.playSound} className={"drum-pad " + this.state.buttonState} >
        <audio className="clip" id={this.props.keyTrigger} src={this.props.sound}></audio>
        {this.props.keyTrigger}
      </button>
    );
  }
};

class DrumMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      currentSoundSet: soundDrums,
      currentSoundName: "Drum Sounds",
      selectorButton: "selector-drums"
    }
    this.displayClipName = this.displayClipName.bind(this);
    this.selectSoundSet = this.selectSoundSet.bind(this);
  }
  selectSoundSet() {
    this.state.currentSoundName === "Drum Sounds" ? this.setState({currentSoundSet: soundPiano, display: "Piano Sounds", currentSoundName: "Piano Sounds", selectorButton: "selector-piano"}) : this.setState({currentSoundSet: soundDrums, display: "Drum Sounds", currentSoundName: "Drum Sounds", selectorButton: "selector-drums"});
  }
  displayClipName(clipName) {
    this.setState({display: clipName});
  }
  render() {
    let buttons = this.state.currentSoundSet.map((initVal, i, buttonsArray) => {
      return (
        <Buttons soundName={buttonsArray[i].name} sound={buttonsArray[i].source} keyTrigger={buttonsArray[i].keyTrigger} keyCode={buttonsArray[i].keyCode} updateDisplay={this.displayClipName} />
        )
      });
    return (
      <div id="container">
        <div id="pads">{buttons}</div>
        <div id="selectors">
          
          <div id="sound-selector">
            <p className="sound-selector-p">Sound Set</p>
            <div id="selector-button" onClick={this.selectSoundSet}>
              <div id={this.state.selectorButton}>
                <i className={this.state.selectorButton === "selector-drums" ? "fas fa-drum" : "fas fa-memory"}></i>
              </div>
            </div>
          </div>
          <div id="display">
            {this.state.display}
          </div>
        </div>
      </div>
    )
  }
};

export default DrumMachine;
