import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Playground, Footer } from './components';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Playground />
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
