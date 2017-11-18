//@ts-check
import { valueToString, checkWinner } from './game';

export default class AI {
  constructor () {
    this.map = {};
    this.reset();
  }

  reset () {
    this.moves = [];
  }

  nextMove (player, value) {
    if (!this.map[value]) {
      this.map[value] = generateBox(value);
    }

    if (this.checkFinished(player, value)) return value;

    let beadTotal = countBeads(this.map[value]);

    if (beadTotal < 1) {
      // Revive
      this.map[value] = generateBox(value);
      beadTotal = countBeads(this.map[value]);
    }

    const randomBead = Math.floor(Math.random() * beadTotal);

    const pos = findPos(this.map[value], randomBead);

    this.moves.push([value, pos]);

    const newValue = value + (player === 'o' ? 2 : 1) * Math.pow(3, pos);

    this.checkFinished(player, newValue);

    return newValue;
  }

  handleWin () {
    this.moves.forEach(([value,pos]) => {
      this.map[value][pos] += 3;
    });
  }

  handleLoss () {
    this.moves.forEach(([value,pos]) => {
      this.map[value][pos] = Math.max(this.map[value][pos] - 1, 0);
    });
  }

  checkFinished (player, value) {
    const winner = checkWinner(value);
    if (winner !== false) {

      if (winner === player) {
        this.handleWin();
      }
      else if (winner !== '-') {
        this.handleLoss();
      }

      return true;
    }

    return false;
  }

  peekBox (box) {
    return this.map[box];
  }

  getLastMove () {
    if (this.moves.length) return this.moves[this.moves.length-1];
    return [];
  }
}

function generateBox (value) {
  const strValue = valueToString(value);

  return [
    strValue[0] === " " ? 1 : 0,
    strValue[1] === " " ? 1 : 0,
    strValue[2] === " " ? 1 : 0,
    strValue[3] === " " ? 1 : 0,
    strValue[4] === " " ? 1 : 0,
    strValue[5] === " " ? 1 : 0,
    strValue[6] === " " ? 1 : 0,
    strValue[7] === " " ? 1 : 0,
    strValue[8] === " " ? 1 : 0,
  ];
}

function countBeads (box) {
  return box.reduce((x, t) => x + t, 0);
}

function findPos (box, bead) {
  let count = 0;
  for(let i in box) {
    count += box[i];
    if(bead < count) return i;
  }
}
