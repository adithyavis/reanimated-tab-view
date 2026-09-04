import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { RedditTabView } from '../reddit/RedditTabView';
import { RedditTopBar } from '../reddit/RedditTopBar';
import { RedditBottomBar } from '../reddit/RedditBottomBar';
import { colors } from '../reddit/theme';

export const RedditScreen = () => {
  return (
    <View style={[styles.container]}>
      <RedditTopBar />
      <RedditTabView />
      <RedditBottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
