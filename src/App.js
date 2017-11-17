//@ts-check
import React, { Component } from 'react';
import './App.css';

import { colours } from './colours';
import AI from './ai';
import { valueToString, checkWinner } from './game';

const ai = new AI();

class App extends Component {
  constructor() {
    super();

    const aiMode = true;

    this.state = {
      aiMode,
      value: aiMode ? ai.nextMove('o', 0) : 0,
      nextPlayer: aiMode ? 'x' : 'o',
    };

    this.reset = this.reset.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  reset () {
    const aiMode = this.state.aiMode;
    this.setState({
      value: aiMode ? ai.nextMove('o', 0) : 0,
      nextPlayer: aiMode ? 'x' : 'o',
    });
  }

  handleMove (pos) {
    let {value, nextPlayer, aiMode } = this.state;
    const strValue = valueToString(value);

    if (strValue[8-pos] !== " ") return;

    value = value + (nextPlayer === 'o' ? 2 : 1) * Math.pow(3, pos);
    nextPlayer = nextPlayer === 'o' ? 'x' : 'o';

    if (aiMode) {
      value = ai.nextMove(nextPlayer, value);
      nextPlayer = nextPlayer === 'o' ? 'x' : 'o';
    }

    this.setState({
      value,
      nextPlayer,
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
              <button onClick={this.reset}>Reset</button>
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
