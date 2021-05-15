import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';

import TabNavigator from './routes/TabNavigator';

const App = () => {
  useEffect(() => {
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

  return <TabNavigator />;
};

export default App;
