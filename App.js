import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StyleSheet, View } from 'react-native';
import { Header, Playground, Footer } from './components';
import reducer from './ducks';

const store = createStore(reducer);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Header />
          <Playground />
          <Footer />
        </View>
      </Provider>
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
