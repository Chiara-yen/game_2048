import React from 'react';
import { StyleSheet, View } from 'react-native';
import chunk from 'lodash.chunk';
import Square from './Square';

const getRandomNumber = boundary => Math.round(Math.random() * boundary);

export default class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.array = Array(16).fill(0);

    const a = Array(16).fill(1).map((it, index) => index);
    const firstIndex = a.splice(getRandomNumber(15), 1)[0];
    const secondIndex = a.splice(getRandomNumber(14), 1)[0];
    this.array[firstIndex] = 1;
    this.array[secondIndex] = 1;
  }

  render() {
    const rows = chunk(this.array, 4);
    return (
      <View style={styles.container}>
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
