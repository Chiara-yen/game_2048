import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, PanResponder, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import chunk from 'lodash.chunk';
import zip from 'lodash.zip';
import unzip from 'lodash.unzip';
import Square from './Square';
import { getInitArray, getNextStepArray, getScore, calcChunckedArray } from './helper';
import { gameStart, gameOver, setScore, addCrown, addStep } from '../../ducks';

class Playground extends React.Component {
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

        // console.log(`%c ${direction} `, 'color:white;background:orange;');

        if (direction === 'Left') this.setHorizontal(false);
        if (direction === 'Right') this.setHorizontal(true);
        if (direction === 'Top') this.setVertical(false);
        if (direction === 'Down') this.setVertical(true);
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isGameOver && !this.props.isGameOver) {
      this.setState({ array: getInitArray() });
    }
  }

  nextStep = () => {
    const { setScore, addStep } = this.props;
    const score = getScore(this.state.array);
    setScore(score);
    addStep();
  }

  setHorizontal = (isRight) => {
    const rows = chunk(this.state.array, 4);
    const newRows = calcChunckedArray(rows, isRight);
    const array = newRows.reduce((pre, curr) => pre.concat(curr), []);
    this.checkIsGameOverOrNextStep(array);
  }

  setVertical = (isDown) => {
    const rows = chunk(this.state.array, 4);
    const columns = zip(...rows);
    const newColumns = calcChunckedArray(columns, isDown);
    const array = unzip(newColumns).reduce((pre, curr) => pre.concat(curr), []);
    this.checkIsGameOverOrNextStep(array);
  }

  checkIsGameOverOrNextStep = (array) => {
    const isSame = array.join('') === this.state.array.join('');
    const isNoMoreZoom = array.every(it => it);
    if (isNoMoreZoom && isSame) {
      this.props.gameOver();
    } else {
      this.setState({ array: getNextStepArray(array) }, this.nextStep);
    }
  }

  render() {
    const { isGameOver, gameStart } = this.props;
    const rows = chunk(this.state.array, 4);

    if (isGameOver) {
      return (
        <View style={styles.container}>
          <Icon name='skull' type='foundation' size={150}/>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Button
            title='Start Again'
            borderRadius={5}
            buttonStyle={styles.startAgainButton}
            onPress={gameStart}
          />
        </View>
      );
    }

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

const mapStateToProps = ({ isGameOver }) => ({ isGameOver });
const mapDispatchToProps = { gameStart, gameOver, setScore, addCrown, addStep };

export default connect(mapStateToProps, mapDispatchToProps)(Playground);

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
  },
  gameOverText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  startAgainButton: {
    backgroundColor: 'tomato',
    width: '100%',
  }
});
