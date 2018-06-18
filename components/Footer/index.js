import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class Footer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Step: 0</Text>
        <Button
          title='Redo'
          icon={{name: 'refresh', type: 'foundation'}}
          borderRadius={5}
          disabled
          onPress={() => console.log('%c Clicked Redo!', 'color:tomato;font-weight:bold;')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 10,
  },
});
