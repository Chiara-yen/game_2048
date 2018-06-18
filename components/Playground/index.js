import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Playground extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Playground</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: '#ff0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
