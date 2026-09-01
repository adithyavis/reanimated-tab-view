import * as React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { InstagramTabView } from '../instagram/InstagramTabView';

export const InstagramScreen = () => (
  <SafeAreaView style={styles.container}>
    <InstagramTabView />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'rgb(32, 32, 32)',
  },
});
