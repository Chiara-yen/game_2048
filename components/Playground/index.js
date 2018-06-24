import React from 'react';
import { StyleSheet, PanResponder, View } from 'react-native';
import chunk from 'lodash.chunk';
import zip from 'lodash.zip';
import unzip from 'lodash.unzip';
import Square from './Square';

const getRandomNumber = boundary => Math.floor(Math.random() * boundary);
const getNextStepArray = (array, createCount = 1) => {
  const rtn = Array.from(array);
  const temp = array.map((value, index) => (value === 0 ? index : -1)).filter(value => value !== -1);
  for (let i = 0; i < createCount; i++) {
    const index = temp.splice(getRandomNumber(temp.length), 1)[0];
    rtn[index] = 1;
  }
  return rtn;
};
const getInitArray = () => {
  const array = Array(16).fill(0);
  return getNextStepArray(array, 2);
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

export default class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: getInitArray(),
    };

    /* Doc: https://facebook.github.io/react-native/docs/panresponder.html */
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { moveX, moveY, x0, y0, dx, dy } = gestureState;
        if (dx === 0 && dy === 0) return;
        let direction = '';
        const h = x0 - moveX;
        const v = y0 - moveY;

        if (Math.abs(h) >= Math.abs(v)) {
          direction = h >= 0 ? 'Left' : 'Right';
        } else {
          direction = v >= 0 ? 'Top' : 'Down';
        }

        console.log(`%c ${direction} `, 'color:white;background:orange;');

        if (direction === 'Left') this.setHorizontal(false);
        if (direction === 'Right') this.setHorizontal(true);
        if (direction === 'Top') this.setVertical(false);
        if (direction === 'Down') this.setVertical(true);
      },
    });
  }

  setHorizontal(isRight) {
    const rows = chunk(this.state.array, 4);
    const newArray = [];
    rows.forEach((row, i) => {
      if (row.every(it => it === 0)) {
        newArray[i] = row;
      } else {
        let newRow = mergeSquare(row);
        if (isRight) {
          newRow = [...Array(4).fill(0), ...newRow].slice(-4);
        } else {
          newRow = [...newRow, ...Array(4).fill(0)].slice(0, 4);
        }
        console.log(`setHorizontal ${isRight ? 'Right' : 'Left'} => `, newRow);
        newArray[i] = newRow;
      }
    });
    // console.log('newArray =>', newArray);
    const array = newArray.reduce((pre, curr) => pre.concat(curr), []);

    this.setState({ array: getNextStepArray(array) });
  }

  setVertical(isDown) {
    const rows = chunk(this.state.array, 4);
    const columns = zip(...rows);
    const newArray = [];
    columns.forEach((column, i) => {
      if (column.every(it => it === 0)) {
        newArray[i] = column;
      } else {
        let newColumn = mergeSquare(column);
        if (isDown) {
          newColumn = [...Array(4).fill(0), ...newColumn].slice(-4);
        } else {
          newColumn = [...newColumn, ...Array(4).fill(0)].slice(0, 4);
        }
        console.log(`setVertical ${isDown ? 'Right' : 'Left'} => `, newColumn);
        newArray[i] = newColumn;
      }
    });
    // console.log('unzip(newArray) =>', unzip(newArray));
    const array = unzip(newArray).reduce((pre, curr) => pre.concat(curr), []);

    this.setState({ array: getNextStepArray(array) });
  }

  render() {
    const rows = chunk(this.state.array, 4);
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        {rows.map((row, index) =>
          <View key={`row-${index}`} style={styles.row}>
            {row.map((value, i) => Square(`${index}-${i}`, value))}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: 'lemonchiffon',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
