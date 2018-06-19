import React from 'react';
import { StyleSheet, PanResponder, View } from 'react-native';
import chunk from 'lodash.chunk';
import Square from './Square';

const getRandomNumber = boundary => Math.round(Math.random() * boundary);
const getInitArray = () => {
  const array = Array(16).fill(0);
  const temp = Array(16).fill(1).map((it, index) => index);
  const firstIndex = temp.splice(getRandomNumber(15), 1)[0];
  const secondIndex = temp.splice(getRandomNumber(14), 1)[0];
  array[firstIndex] = 1;
  array[secondIndex] = 1;
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
      },
    });
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
