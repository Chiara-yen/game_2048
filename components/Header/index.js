import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Step:</Text>
        <Text>Score:</Text>
        <Text>Crown:</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'yellowgreen',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
});
