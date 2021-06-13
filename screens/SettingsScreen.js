import React, {useState, useEffect, useContext} from 'react';
import {Platform, Switch, Text, View} from 'react-native';
import Toast from '@remobile/react-native-toast';
import BluetoothSerial from 'react-native-bluetooth-serial';

import {GlobalContext} from '../context/GlobalState';

import {globalStyles} from '../style/global';

import DeviceList from '../components/DeviceList';

const SettingsScreen = () => {
  // Fetching context (state) from out Global State
  const {connectToSBCDeviceAction, disconnectToSBCDeviceAction} = useContext(
    GlobalContext,
  );

  const [isEnabled, setIsEnabled] = useState([]);
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    BluetoothSerial.withDelimiter('\n').then(() => {
      Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
        values => {
          const [isEnabled, devices] = values;
          setIsEnabled(isEnabled);
          setDevices(devices);
        },
      );
    });

    BluetoothSerial.on('error', err => console.log(`Error: ${err.message}`));
    BluetoothSerial.on('connectionLost', () => {
      if (device) {
        Toast.showShortBottom(
          `Connection to device ${device.name} has been lost`,
        );
      }
      setIsConnected(false);
    });
  }, [device]);

  /**
   * [android]
   * enable bluetooth on device
   */
  const enable = () => {
    BluetoothSerial.enable()
      .then(res => setIsEnabled(true))
      .catch(err => Toast.showShortBottom(err.message));
  };

  /**
   * [android]
   * disable bluetooth on device
   */
  const disable = () => {
    BluetoothSerial.disable()
      .then(res => setIsEnabled(false))
      .catch(err => Toast.showShortBottom(err.message));
  };

  /**
   * [android]
   * toggle bluetooth
   */
  const toggleBluetooth = value => {
    if (value === true) {
      enable();
    } else {
      disable();
    }
  };

  /**
   * Connect to bluetooth device by id
   * @param  {Object} device
   */
  const connect = device => {
    BluetoothSerial.connect(device.id)
      .then(res => {
        Toast.showShortBottom(`Connected to device ${device.name}`);
        setDevice(device);
        setIsConnected(true);
      })
      .catch(err => Toast.showShortBottom(err.message));

    // Run connectToSBCDeviceAction function and change isDeviceConnected Global State from false to true
    connectToSBCDeviceAction();
  };

  /**
   * Disconnect from bluetooth device
   */
  const disconnect = device => {
    BluetoothSerial.disconnect()
      .then(() => {
        Toast.showShortBottom(`Disconnected from device ${device.name}`);
        setIsConnected(false);
      })
      .catch(err => Toast.showShortBottom(err.message));

    // Run disconnectToSBCDeviceAction function and change isDeviceConnected Global State from true to false
    disconnectToSBCDeviceAction();
  };

  /**
   * Toggle connection when we have active device
   * @param  {Boolean} value
   */
  const toggleConnect = device => {
    if (!isConnected) {
      connect(device);
    } else {
      disconnect(device);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={globalStyles.topBar}>
        <Text style={globalStyles.heading}>Bluetooth Settings</Text>
        {Platform.OS === 'android' ? (
          <View style={globalStyles.enableInfoWrapper}>
            <Text style={{fontSize: 12, color: '#FFFFFF'}}>
              {isEnabled ? 'disable' : 'enable'}
            </Text>
            <Switch onValueChange={toggleBluetooth} value={isEnabled} />
          </View>
        ) : null}
      </View>

      <DeviceList
        showConnectedIcon={isConnected}
        connectedId={device && device.id}
        devices={devices}
        onDevicePress={device => toggleConnect(device)}
      />
    </View>
  );
};

export default SettingsScreen;
