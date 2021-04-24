import React from 'react';
import {SafeAreaView, View, Button, Alert, StyleSheet} from 'react-native';
import {globalStyles} from '../style/global';

import Section from '../components/Section';

const HomeScreen = ({navigation}) => {
  const goToSettingsPage = () => {
    navigation.navigate('BT ScreenSerial');
  };

  const goToBTPage = () => {
    navigation.navigate('BT Screen');
  };

  return (
    // SafeAreaView render content within the safe area boundaries of a device. Only available to iOS devices
    <SafeAreaView>
      <Section title="IoT Boilerplate App">
        Connect to your SBC via Bluetooth and Tap the button to either turn on
        the LED or off.
      </Section>
      <Button
        style={globalStyles.button}
        title="Go To Settings Page"
        onPress={goToSettingsPage}
      />
      <Button
        style={globalStyles.button}
        title="Go To BT Page"
        onPress={goToBTPage}
      />
      <Button
        style={globalStyles.button}
        title="Light LED"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'red',
//   },
// });

export default HomeScreen;
