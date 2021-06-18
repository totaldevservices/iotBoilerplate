import React, {useState, useContext} from 'react';
import {SafeAreaView, View, Text, Switch} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import Toast from '@remobile/react-native-toast';

import {GlobalContext} from '../context/GlobalState';

import {globalStyles} from '../style/global';

import Section from '../components/Section';

const HomeScreen = () => {
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [msgFromSBC, setMsgFromSBC] = useState('');

  // Fetching context (state) from out Global State
  const {isDeviceConnected} = useContext(GlobalContext);

  /** Function that contains LED Switch Toggling functionality */
  const toggleSwitch = () => {
    /** If device isn't connected, prompt user to connect to SBC via Bluetooth first */
    if (isDeviceConnected === false) {
      // Display toast message
      Toast.showShortBottom('Please connect to a SBC first.');
    } else {
      /** Else if device is connect, do the following: */

      // When switch is turned ON, send "on" message to RPI to light LED
      if (!isSwitchEnabled) {
        // if isEnabled is equal to FALSE
        // Send "on" message to Light LED
        BluetoothSerial.write('on')
          .then(res => {
            Toast.showShortBottom('LED is ON');
          })
          .catch(err => Toast.showShortBottom(err.message));

        // Update state from FALSE to TRUE (from OFF to ON)
        setIsSwitchEnabled(previousState => !previousState);
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
        setIsSwitchEnabled(previousState => !previousState);
      }
    }
  };

  /** Function that reads data sent from SBC */
  if (isDeviceConnected) {
    // setInterval() is will allows a function to run only  within an interval of time
    // in our case, it's 1000 milliseconds (1 second), hence the 1000 below
    setInterval(() => {
      BluetoothSerial.readFromDevice().then(data => {
        if (data.length !== 0) {
          console.log(`Data sent from SBC: ${data}`);
          setMsgFromSBC(data);
        }
      });
    }, 1000);
  }

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
          style={{
            paddingTop: 20,
            transform: [{scaleX: 1.5}, {scaleY: 1.5}],
          }}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isSwitchEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isSwitchEnabled}
        />
      </View>

      <View style={globalStyles.separator}></View>

      <View style={globalStyles.subContainer}>
        <Text style={globalStyles.sectionTitle}>
          Received Message From SBC: {msgFromSBC}
        </Text>
      </View>

      <View style={globalStyles.separator}></View>

      <View style={globalStyles.subContainer}>
        {isDeviceConnected ? (
          <Text style={globalStyles.sectionTitle}>SBC is Connected. </Text>
        ) : (
          <Text style={globalStyles.sectionTitle}>SBC is not Connected </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
