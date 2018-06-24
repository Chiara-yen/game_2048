import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class Footer extends React.Component {
  render() {
    const { step } = this.props;
    return (
      <View style={styles.container}>
        <Text>Step: {step}</Text>
        <Button
          title='Undo'
          icon={{name: 'refresh', type: 'foundation'}}
          borderRadius={5}
          disabled
          onPress={() => console.log('%c Clicked Undo!', 'color:tomato;font-weight:bold;')}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ step }) => ({ step });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

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
