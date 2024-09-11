import React, { Component } from 'react';
import './App.css';

import { colours } from './colours';
import AI from './ai';
import { valueToString, checkWinner } from './game';

const ai = new AI();

class App extends Component {
  constructor(props) {
    super(props);

    const aiMode = true;

    this.state = {
      aiMode,
      value: aiMode ? ai.nextMove('o', 0) : 0,
      nextPlayer: aiMode ? 'x' : 'o',
    };

    this.reset = this.reset.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  reset() {
    ai.reset();
    const aiMode = this.state.aiMode;
    this.setState({
      value: aiMode ? ai.nextMove('o', 0) : 0,
      nextPlayer: aiMode ? 'x' : 'o',
    });
  }

  handleMove(pos) {
    let { value, nextPlayer, aiMode } = this.state;
    const strValue = valueToString(value);

    if (strValue[pos] !== " ") return;

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

    const values = valueToString(this.state.value).split("");

    const dotStyle = {
      width: 50,
      height: 50,
      borderRadius: '50%',
      boxShadow: "2px 2px 2px black",
      cursor: 'pointer',
    };

    return (
      <div className="App">
        <div className="App-intro">
          <Board style={{ margin: '0 auto' }}>{values}</Board>
          {winner === false ?
            <div>
              <p>Next move: {this.state.nextPlayer}</p>
              <Board style={{ margin: '0 auto' }}>
                {
                  colours.map((colour, i) => {
                    return <div key={colour} style={{ ...dotStyle, backgroundColor: colour }} onClick={() => this.handleMove(i)} />;
                  })
                }
              </Board>
            </div>
            :
            <div>
              {winner === "-" ?
                <p>Draw!</p>
                :
                <p>{winner} Wins!</p>
              }
              <button onClick={this.reset}>Reset</button>
            </div>
          }
          <Board style={{ margin: '0 auto' }}>
            {ai.peekBox(ai.getLastMove()[0])}
          </Board>
        </div>
      </div>
    );
  }
}

function Board(props) {
  const style = {
    border: 'solid #999',
    width: 50,
    height: 50,
  };

  const values = React.Children.toArray(props.children);

  return (
    <table style={{ ...props.style, borderCollapse: 'collapse' }}>
      <tbody>
        <tr>
          <td
            style={{ ...style, borderWidth: '0 0 1px 0' }}
          >{values[0]}</td>
          <td
            style={{ ...style, borderWidth: '0 0 1px 1px' }}
          >{values[1]}</td>
          <td
            style={{ ...style, borderWidth: '0 0 1px 1px' }}
          >{values[2]}</td>
        </tr>
        <tr>
          <td
            style={{ ...style, borderWidth: '0 0 1px 0' }}
          >{values[3]}</td>
          <td
            style={{ ...style, borderWidth: '0 0 1px 1px' }}
          >{values[4]}</td>
          <td
            style={{ ...style, borderWidth: '0 0 1px 1px' }}
          >{values[5]}</td>
        </tr>
        <tr>
          <td
            style={{ ...style, borderWidth: '0 0 0 0' }}
          >{values[6]}</td>
          <td
            style={{ ...style, borderWidth: '0 0 0 1px' }}
          >{values[7]}</td>
          <td
            style={{ ...style, borderWidth: '0 0 0 1px' }}
          >{values[8]}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default App;
