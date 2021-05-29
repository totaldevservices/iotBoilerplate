import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';

import {GlobalProvider} from './context/GlobalState';

import TabNavigator from './routes/TabNavigator';

const App = () => {
  useEffect(() => {
    // Function handles Back button on Android devices if present
    const backHandlerAction = () => {
      Alert.alert('Quit', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backHandlerAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <GlobalProvider>
      <TabNavigator />
    </GlobalProvider>
  );
};

export default App;
