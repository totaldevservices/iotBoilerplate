import React from 'react';
import {ScrollView, View} from 'react-native';

import Device from './Device';

import {globalStyles} from '../style/global';

const DeviceList = ({
  devices,
  connectedId,
  showConnectedIcon,
  onDevicePress,
}) => (
  <ScrollView style={globalStyles.container}>
    <View style={globalStyles.listContainer}>
      {devices.map((device, i) => {
        return (
          <Device
            key={i}
            device={device}
            connectedId={connectedId}
            showConnectedIcon={showConnectedIcon}
            onDevicePress={onDevicePress}
          />
        );
      })}
    </View>
  </ScrollView>
);

export default DeviceList;
