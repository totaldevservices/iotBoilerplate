import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import {globalStyles} from '../style/global';

import Section from '../components/Section';

const SettingsScreen = () => {
  return (
    // SafeAreaView render content within the safe area boundaries of a device. Only available to iOS devices
    <SafeAreaView>
      <View style={styles.container}>
        <Section title="Settings">This is the Settings page</Section>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default SettingsScreen;
