import React, {useState, useEffect} from 'react';
import {
  Platform,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Toast from '@remobile/react-native-toast';
import BluetoothSerial from 'react-native-bluetooth-serial';

import {globalStyles} from '../style/global';

import Button from '../components/Button';
import DeviceList from '../components/DeviceList';

const SettingsScreenHook = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState('');
  const [unpairedDevices, setUnpairedDevices] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [section, setSection] = useState(0);

  useEffect(() => {
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      values => {
        const [isEnabled, devices] = values;
        setIsEnabled(isEnabled);
        setDevices(devices);
      },
    );

    BluetoothSerial.on('bluetoothEnabled', () =>
      Toast.showShortBottom('Bluetooth enabled'),
    );
    BluetoothSerial.on('bluetoothDisabled', () =>
      Toast.showShortBottom('Bluetooth disabled'),
    );
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
   * request enable of bluetooth from user
   */
  const requestEnable = () => {
    BluetoothSerial.requestEnable()
      .then(res => setIsEnabled(true))
      .catch(err => Toast.showShortBottom(err.message));
  };

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
   * [android]
   * Discover unpaired devices, works only in android
   */
  const discoverUnpaired = () => {
    if (isDiscovering) {
      return false;
    } else {
      setIsDiscovering(true);
      BluetoothSerial.discoverUnpairedDevices()
        .then(unpairedDevices => {
          setUnpairedDevices(unpairedDevices);
          setIsDiscovering(false);
        })
        .catch(err => Toast.showShortBottom(err.message));
    }
  };

  /**
   * [android]
   * Discover unpaired devices, works only in android
   */
  const cancelDiscovery = () => {
    if (isDiscovering) {
      BluetoothSerial.cancelDiscovery()
        .then(() => {
          setIsDiscovering(false);
        })
        .catch(err => Toast.showShortBottom(err.message));
    }
  };

  /**
   * [android]
   * Pair device
   */
  const pairDevice = device => {
    BluetoothSerial.pairDevice(device.id)
      .then(paired => {
        if (paired) {
          Toast.showShortBottom(`Device ${device.name} paired successfully`);
          devices.push(device);
          setDevices(devices);
          setUnpairedDevices(unpairedDevices.filter(d => d.id !== device.id));
        } else {
          Toast.showShortBottom(`Device ${device.name} pairing failed`);
        }
      })
      .catch(err => Toast.showShortBottom(err.message));
  };

  /**
   * Connect to bluetooth device by id
   * @param  {Object} device
   */
  const connect = device => {
    setIsConnecting(true);
    BluetoothSerial.connect(device.id)
      .then(res => {
        Toast.showShortBottom(`Connected to device ${device.name}`);
        setDevices(device);
        setIsConnected(true);
        setIsConnecting(false);
      })
      .catch(err => Toast.showShortBottom(err.message));
  };

  /**
   * Disconnect from bluetooth device
   */
  const disconnect = () => {
    BluetoothSerial.disconnect()
      .then(() => setIsConnected(false))
      .catch(err => Toast.showShortBottom(err.message));
  };

  // /**
  //  * Toggle connection when we have active device
  //  * @param  {Boolean} value
  //  */
  // toggleConnect(value) {
  //   if (value === true && device) {
  //     this.connect(device);
  //   } else {
  //     this.disconnect();
  //   }
  // }

  /**
   * Write message to device
   * @param  {String} message
   */
  const write = message => {
    if (!isConnected) {
      Toast.showShortBottom('You must connect to device first');
    }

    BluetoothSerial.write(message)
      .then(res => {
        Toast.showShortBottom('Successfuly wrote to device');
        setIsConnected(true);
      })
      .catch(err => Toast.showShortBottom(err.message));
  };

  const onDevicePressFunc = device => {
    if (section === 0) {
      // this.setState({showConnectedIcon: true});
      connect(device);
    } else {
      // this.setState({showConnectedIcon: false});
      pairDevice(device);
    }
  };

  const activeTabStyle = {borderBottomWidth: 6, borderColor: '#009688'};

  return (
    <View style={{flex: 1}}>
      <View style={globalStyles.topBar}>
        <Text style={globalStyles.heading}>Bluetooth Serial Example</Text>
        {Platform.OS === 'android' ? (
          <View style={globalStyles.enableInfoWrapper}>
            <Text style={{fontSize: 12, color: '#FFFFFF'}}>
              {isEnabled ? 'disable' : 'enable'}
            </Text>
            <Switch
              onValueChange={toggleBluetooth.bind(this)}
              value={isEnabled}
            />
          </View>
        ) : null}
      </View>

      {Platform.OS === 'android' ? (
        <View
          style={[
            globalStyles.topBar,
            {justifyContent: 'center', paddingHorizontal: 0},
          ]}>
          <TouchableOpacity
            style={[globalStyles.tab, section === 0 && activeTabStyle]}
            onPress={() => setSection(0)}>
            <Text style={{fontSize: 14, color: '#FFFFFF'}}>PAIRED DEVICES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.tab, section === 1 && activeTabStyle]}
            onPress={() => setSection(1)}>
            <Text style={{fontSize: 14, color: '#FFFFFF'}}>
              UNPAIRED DEVICES
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {isDiscovering && section === 1 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator style={{marginBottom: 15}} size={60} />
          <Button
            textStyle={{color: '#FFFFFF'}}
            style={globalStyles.buttonRaised}
            title="Cancel Discovery"
            onPress={cancelDiscovery()}
          />
        </View>
      ) : (
        <DeviceList
          showConnectedIcon={section === 0}
          connectedId={device && device.id}
          devices={section === 0 ? devices : unpairedDevices}
          onDevicePress={device => this.onDevicePressFunc(device)}
        />
      )}

      {/* (
        {
           <DeviceList
          showConnectedIcon={section === 0}
          connectedId={device && device.id}
          devices={section === 0 ? devices : unpairedDevices}
          onDevicePress={device => this.onDevicePress(device)}
        /> 
        }
      ) 
      
      } */}

      <View style={{alignSelf: 'flex-end', height: 52}}>
        <ScrollView horizontal contentContainerStyle={globalStyles.fixedFooter}>
          {Platform.OS === 'android' && section === 1 ? (
            <Button
              title={isDiscovering ? '... Discovering' : 'Discover devices'}
              onPress={discoverUnpaired()}
            />
          ) : null}
          {Platform.OS === 'android' && !isEnabled ? (
            <Button title="Request enable" onPress={requestEnable()} />
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default SettingsScreenHook;
