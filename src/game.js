
export function valueToString (value) {
  return value.toString(3).replace(/0/g, " ").replace(/1/g, "x").replace(/2/g, "o").padStart(9, " ");
}

export function checkWinner(value) {
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
