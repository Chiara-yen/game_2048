import React from 'react';
import { Text } from 'react-native';
import { Badge } from 'react-native-elements';


const getColor = (value) => {
  switch (value) {
    case 1:
      return 'yellowgreen';
    default:
      return 'lightcyan';
  }
};

const Square = (key, value) => (
  <Badge
    key={key}
    containerStyle={{
      backgroundColor: getColor(value),
      width: 70,
      height: 70,
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 5,
      marginRight: 5,
    }}
  >
    {!value || value === 0 ? null : <Text>{Math.pow(2, value)}</Text>}
  </Badge>
);

export default Square;