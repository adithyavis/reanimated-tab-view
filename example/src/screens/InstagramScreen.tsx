import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { InstagramTabView } from '../instagram/InstagramTabView';

export const InstagramScreen = () => {
  return (
    <View style={styles.container}>
      <InstagramTabView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32, 32, 32)',
  },
});
