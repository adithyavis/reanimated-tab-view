import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { BottomBarTabView } from '../bottomBar/BottomBarTabView';
import { colors } from '../bottomBar/theme';

export const BottomBarScreen = () => {
  return (
    <View style={styles.container}>
      <BottomBarTabView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
