import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {globalStyles} from '../style/global';

const Button = ({title, onPress, style, textStyle}) => (
  <TouchableOpacity style={[globalStyles.button, style]} onPress={onPress}>
    <Text style={[globalStyles.buttonText, textStyle]}>
      {title.toUpperCase()}
    </Text>
  </TouchableOpacity>
);

export default Button;
