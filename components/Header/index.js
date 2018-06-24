import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import IconX from './IconX';
import { gameOver } from '../../ducks';

class Header extends React.Component {
  render() {
    const { score, crown, gameOver } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <Text style={styles.itemText}>Score</Text>
          <IconX />
          <Text style={styles.itemText}>{score}</Text>
        </View>
        <View style={styles.headerItem}>
          <Icon name='crown' type='foundation' size={36}/>
          <IconX />
          <Text style={styles.itemText}>{crown}</Text>
        </View>
        <View style={styles.suicideButton}>
          <Icon
            reverse
            name='skull'
            type='foundation'
            size={20}
            onPress={gameOver}
            reverseColor='tomato'
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ score, crown }) => ({ score, crown });
const mapDispatchToProps = { gameOver };

export default connect(mapStateToProps, mapDispatchToProps)(Header);

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
  },
  suicideButton: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  }
});
