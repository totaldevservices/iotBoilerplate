import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BTScreen from '../screens/BTScreen';
import BTScreenSerial from '../screens/displayBTSerial';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BT Screen" component={BTScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="BT ScreenSerial" component={BTScreenSerial} />
      </Stack.Navigator>
      <SettingsScreen />
    </NavigationContainer>
  );
};

export default AppNavigator;
