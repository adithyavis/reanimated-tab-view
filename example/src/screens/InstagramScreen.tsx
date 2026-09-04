import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { InstagramTabView } from '../instagram/InstagramTabView';
import { InstagramTopBar } from '../instagram/InstagramTopBar';
import { InstagramBottomBar } from '../instagram/InstagramBottomBar';
import { colors } from '../instagram/theme';

export const InstagramScreen = () => {
  return (
    <View style={[styles.container]}>
      <InstagramTopBar />
      <InstagramTabView />
      <InstagramBottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
