import React, {useState} from 'react';
import {SafeAreaView, View, Text, Switch} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import Toast from '@remobile/react-native-toast';

import {globalStyles} from '../style/global';

import Section from '../components/Section';

const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = message => {
    // When switch is turned ON, send "on" message to RPI to light LED
    if (!isEnabled) {
      // if isEnabled is equal to FALSE
      // Send "on" message to Light LED
      BluetoothSerial.write('on')
        .then(res => {
          Toast.showShortBottom('LED is ON');
        })
        .catch(err => Toast.showShortBottom(err.message));

      // Update state from FALSE to TRUE (from OFF to ON)
      setIsEnabled(previousState => !previousState);
    }
    // When switch is turned OFF, send "off" message to RPI to turn LED off
    else {
      // else if isEnabled is equal to TRUE
      // Send "off" message to Turn off LED
      BluetoothSerial.write('off')
        .then(res => {
          Toast.showShortBottom('LED is OFF');
        })
        .catch(err => Toast.showShortBottom(err.message));

      // Update state from TRUE to FALSE (from ON to OFF)
      setIsEnabled(previousState => !previousState);
    }
  };

  return (
    // SafeAreaView render content within the safe area boundaries of a device. Only available to iOS devices
    <SafeAreaView style={globalStyles.container}>
      <Section title="IoT Boilerplate App">
        Connect to your SBC via Bluetooth and Tap the button to either turn on
        the LED or off.
      </Section>

      <View style={globalStyles.separator}></View>

      <View style={globalStyles.subContainer}>
        <Text style={globalStyles.sectionTitle}>Light LED</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
