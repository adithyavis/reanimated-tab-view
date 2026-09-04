import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import {
  ChevronDownIcon,
  OverflowIcon,
  SearchIcon,
  SettingsIcon,
} from './assets/RedditIcons';
import { profile } from './profile';
import { colors, metrics } from './theme';

export const RedditTopBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.title} hitSlop={8}>
        <CustomText style={styles.username} numberOfLines={1}>
          {profile.username}
        </CustomText>
        <ChevronDownIcon size={17} />
      </Pressable>

      <View style={styles.actions}>
        <Pressable hitSlop={8}>
          <SearchIcon size={23} />
        </Pressable>
        <Pressable hitSlop={8}>
          <SettingsIcon size={23} />
        </Pressable>
        <Pressable hitSlop={8}>
          <OverflowIcon size={21} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: metrics.topBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: metrics.screenPadding,
    backgroundColor: colors.background,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  username: {
    flexShrink: 1,
    fontSize: 17,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingLeft: 12,
  },
});
