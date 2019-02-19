class Randomize {
  constructor(opts = {}, rangeP = false) {
    let { type = "int", start = 0, range = 99 } = opts; // default 1|2|3 ... 100
    let skip = 1;
    if (opts > 0 && rangeP !== false && rangeP > 1) {
      start = opts;
      range = rangeP - start + 1;
      skip = 0;
    }
    this.type = type;
    this.start = start;
    this.range = range;
    this.skip = skip;
  }

  get() {
    return parseInt(Math.random() * this.range) + this.skip + this.start;
  }
}

const r = new Randomize();
const r1_100 = new Randomize(1, 100); // 1|2|3 ... 100
const r1_4 = new Randomize(1, 4); // 1|2|3|4


var pad = function(x) { return (x < 10) ? "0"+x : x; }
const getHumanReadableTime = (seconds) => {
  return pad(parseInt(seconds / (60*60))) + ":" +
         pad(parseInt(seconds / 60 % 60)) + ":" +
         pad(seconds % 60)
}

const unsafeClone = (o) => {
  return JSON.parse(JSON.stringify(o));
}

const clone = unsafeClone;

module.exports = {
  unsafeClone,
  clone,
  getHumanReadableTime: getHumanReadableTime,
  Randomize: Randomize,
  getRandom: r.get,
  getShuffle1_4: (arr = [1, 2, 3, 4]) => {
    const copy = [...arr];
    arr.forEach((val, index) => {
      const i = r1_4.get() - 1;
      const hold = copy[index];
      copy[index] = copy[i];
      copy[i] = hold;
    });

    return copy;
  }
};
