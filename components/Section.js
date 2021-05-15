import React from 'react';
import {Text, View} from 'react-native';
import {globalStyles} from '../style/global';

const Section = ({children, title}) => {
  return (
    <View style={globalStyles.sectionContainer}>
      <Text style={globalStyles.sectionTitle}>{title}</Text>
      <Text style={globalStyles.sectionDescription}>{children}</Text>
    </View>
  );
};

export default Section;
