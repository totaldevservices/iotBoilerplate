import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  Alert,
  BackHandler,
} from 'react-native';

import AppNavigator from './routes/AppNavigator';

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

  return <AppNavigator />;
  // return (
  //   // <View style={{height: '100%'}}>
  //   <SafeAreaView>
  //     {/* <Text>Hey</Text> */}
  //     {/* <View> */}
  //     <AppNavigator />
  //     {/* </View> */}
  //   </SafeAreaView>
  // );
};

export default App;

// import React, {useEffect} from 'react';
// import {SafeAreaView, Button, Alert, BackHandler} from 'react-native';
// import 'react-native-gesture-handler';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// import HomeScreen from './screens/HomeScreen';
// import SettingsScreen from './screens/SettingsScreen';
// import BTScreen from './screens/BTScreen';

// const Stack = createStackNavigator();

// const App = () => {
//   useEffect(() => {
//     const backHandlerAction = () => {
//       Alert.alert('Quit', 'Are you sure you want to exit the app?', [
//         {
//           text: 'Cancel',
//           onPress: () => null,
//           style: 'cancel',
//         },
//         {text: 'YES', onPress: () => BackHandler.exitApp()},
//       ]);
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backHandlerAction,
//     );

//     return () => backHandler.remove();
//   }, []);

//   return (
//     // <SafeAreaView>
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         {/* <Stack.Navigator initialRouteName="Home"> */}
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             headerRight: () => (
//               <Button
//                 onPress={() => alert('This is a button!')}
//                 title="Info"
//                 color="#fff"
//               />
//             ),
//           }}
//           initialParams={{this.goToSettings}}
//         />
//         <Stack.Screen name="Settings" component={SettingsScreen} />
//         <Stack.Screen name="BTScreen" component={BTScreen} />
//       </Stack.Navigator>
//       <SettingsScreen />
//     </NavigationContainer>
//     // </SafeAreaView>
//   );
// };

// export default App;
