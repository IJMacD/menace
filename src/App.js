//@ts-check
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { colours } from './colours';

class App extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      nextPlayer: 'o',
    };

    this.handleMove = this.handleMove.bind(this);
  }

  handleMove (pos) {
    const {value, nextPlayer } = this.state;
    const strValue = valueToString(value);

    if (strValue[8-pos] !== " ") return;

    this.setState({
      value: value + (nextPlayer === 'o' ? 2 : 1) * Math.pow(3, pos),
      nextPlayer: nextPlayer === 'o' ? 'x' : 'o',
    });
  }

  render() {
    const winner = checkWinner(this.state.value);

    return (
      <div className="App">
        <div className="App-intro">
          <Board value={this.state.value} style={{ margin: '0 auto' }} />
          { winner === false ?
            <div>
              <p>Next move: {this.state.nextPlayer}</p>
              <ColourBoard onMove={this.handleMove} style={{ margin: '0 auto' }} />
            </div>
            :
            <div>
              { winner === "-" ?
                <p>Draw!</p>
                :
                <p>{winner} Wins!</p>
              }
              <button onClick={() => this.setState({ value: 0 })}>Reset</button>
            </div>
          }
        </div>
      </div>
    );
  }
}

function Board (props) {
  const style = {
    border: 'solid #999',
    width: 50,
    height: 50,
  };

  const strValue = valueToString(props.value);

  return (
    <table style={{...props.style, borderCollapse: 'collapse'}}>
      <tbody>
        <tr>
          <td
            style={{...style, borderWidth: '0 0 1px 0'}}
            onClick={() => props.onMove(0)}
          >{strValue[8]}</td>
          <td
            style={{...style, borderWidth: '0 0 1px 1px'}}
            onClick={() => props.onMove(1)}
          >{strValue[7]}</td>
          <td
            style={{...style, borderWidth: '0 0 1px 1px'}}
            onClick={() => props.onMove(2)}
          >{strValue[6]}</td>
        </tr>
        <tr>
          <td
            style={{...style, borderWidth: '0 0 1px 0'}}
            onClick={() => props.onMove(3)}
          >{strValue[5]}</td>
          <td
            style={{...style, borderWidth: '0 0 1px 1px'}}
            onClick={() => props.onMove(4)}
          >{strValue[4]}</td>
          <td
            style={{...style, borderWidth: '0 0 1px 1px'}}
            onClick={() => props.onMove(5)}
          >{strValue[3]}</td>
        </tr>
        <tr>
          <td
            style={{...style, borderWidth: '0 0 0 0'}}
            onClick={() => props.onMove(6)}
          >{strValue[2]}</td>
          <td
            style={{...style, borderWidth: '0 0 0 1px'}}
            onClick={() => props.onMove(7)}
          >{strValue[1]}</td>
          <td
            style={{...style, borderWidth: '0 0 0 1px'}}
            onClick={() => props.onMove(8)}
          >{strValue[0]}</td>
        </tr>
      </tbody>
    </table>
  )
}

function valueToString (value) {
  return value.toString(3).replace(/0/g, " ").replace(/1/g, "x").replace(/2/g, "o").padStart(9, " ");
}

function checkWinner(value) {
  const sv = valueToString(value);

  if(sv[0] !== " " && sv[0] === sv[1] && sv[0] === sv[2]) return sv[0];
  if(sv[3] !== " " && sv[3] === sv[4] && sv[3] === sv[5]) return sv[3];
  if(sv[6] !== " " && sv[6] === sv[7] && sv[6] === sv[8]) return sv[6];

  if(sv[0] !== " " && sv[0] === sv[3] && sv[0] === sv[6]) return sv[0];
  if(sv[1] !== " " && sv[1] === sv[4] && sv[1] === sv[7]) return sv[1];
  if(sv[2] !== " " && sv[2] === sv[5] && sv[2] === sv[8]) return sv[2];

  if(sv[0] !== " " && sv[0] === sv[4] && sv[0] === sv[8]) return sv[0];
  if(sv[2] !== " " && sv[2] === sv[4] && sv[2] === sv[6]) return sv[2];

  if (!sv.includes(" ")) return "-";

  return false;
}

function ColourBoard (props) {
  const style = {
    width: 50,
    height: 50,
    borderRadius: '50%',
    boxShadow: "2px 2px 2px black",
    cursor: 'pointer',
  };

  return (
    <table style={props.style}>
      <tbody>
        <tr>
          <td><div style={{...style, backgroundColor: colours[0]}} onClick={() => props.onMove(0)} /></td>
          <td><div style={{...style, backgroundColor: colours[1]}} onClick={() => props.onMove(1)} /></td>
          <td><div style={{...style, backgroundColor: colours[2]}} onClick={() => props.onMove(2)} /></td>
        </tr>
        <tr>
          <td><div style={{...style, backgroundColor: colours[3]}} onClick={() => props.onMove(3)} /></td>
          <td><div style={{...style, backgroundColor: colours[4]}} onClick={() => props.onMove(4)} /></td>
          <td><div style={{...style, backgroundColor: colours[5]}} onClick={() => props.onMove(5)} /></td>
        </tr>
        <tr>
          <td><div style={{...style, backgroundColor: colours[6]}} onClick={() => props.onMove(6)} /></td>
          <td><div style={{...style, backgroundColor: colours[7]}} onClick={() => props.onMove(7)} /></td>
          <td><div style={{...style, backgroundColor: colours[8]}} onClick={() => props.onMove(8)} /></td>
        </tr>
      </tbody>
    </table>
  )
}

export default App;
