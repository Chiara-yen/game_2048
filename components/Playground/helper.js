const getRandomNumber = boundary => Math.floor(Math.random() * boundary);

export const getNextStepArray = (array, createCount = 1) => {
  const rtn = Array.from(array);
  const temp = array.map((value, index) => (value === 0 ? index : -1)).filter(value => value !== -1);
  for (let i = 0; i < createCount; i++) {
    const index = temp.splice(getRandomNumber(temp.length), 1)[0];
    rtn[index] = 1;
  }
  return rtn;
};

export const getInitArray = () => {
  const array = Array(16).fill(0);
  return getNextStepArray(array, 2);
};

export const getScore = array => {
  return array.reduce((pre, curr) => {
    return pre + Math.pow(2, curr);
  });
};

const mergeSquare = (group) => {
  let array = [];
  let iter = (group.filter(v => v))[Symbol.iterator]();
  let done = false;
  let previous;

  while (!done) {
    const next = iter.next();
    const previousValue = previous;
    const value = next.value;
    done = next.done;

    if (!done) previous = next.value;
    // console.log('next =>', next);

    if (previousValue && previousValue === value) {
      // console.log('%c push =>', 'color:tomato', previousValue + 1);
      array.push(previousValue + 1);
      previous = 0;
    } else if (previousValue) {
      // console.log('%c push =>', 'color:teal', previousValue);
      array.push(previousValue);
    }
  }
  return array;
};

export const calcChunckedArray = (array, isBefore) => {
  const newArray = [];
  array.forEach((chunked, i) => {
    if (chunked.every(it => it === 0)) {
      newArray[i] = chunked;
    } else {
      let newChunk = mergeSquare(chunked);
      if (isBefore) {
        newChunk = [...Array(4).fill(0), ...newChunk].slice(-4);
      } else {
        newChunk = [...newChunk, ...Array(4).fill(0)].slice(0, 4);
      }
      newArray[i] = newChunk;
    }
  });
  return newArray;
}