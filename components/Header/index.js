import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import IconX from './IconX';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <Text style={styles.itemText}>Score</Text>
          <IconX />
          <Text style={styles.itemText}>0</Text>
        </View>
        <View style={styles.headerItem}>
          <Icon name='crown' type='foundation' size={36}/>
          <IconX />
          <Text style={styles.itemText}>0</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'whitesmoke',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 15,
  },
  itemText: {
    fontSize: 34,
  }
});
