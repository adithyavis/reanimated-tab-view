import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeIcon, SearchIcon, SendIcon } from './assets/ChromeIcons';
import { ReelsIcon } from './assets/ReelsIcon';
import { profile } from './profile';
import { colors, metrics } from './theme';

const AVATAR_SOURCE = {
  uri: `https://picsum.photos/id/${profile.avatarId}/80/80`,
};

export const InstagramBottomBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Pressable style={styles.item}>
        <HomeIcon size={26} color={colors.textPrimary} />
      </Pressable>
      <Pressable style={styles.item}>
        <ReelsIcon size={26} color={colors.textPrimary} />
      </Pressable>
      <Pressable style={styles.item}>
        <SendIcon size={26} color={colors.textPrimary} />
        <View style={styles.dot} />
      </Pressable>
      <Pressable style={styles.item}>
        <SearchIcon size={26} color={colors.textPrimary} />
      </Pressable>
      <Pressable style={styles.item}>
        <Image source={AVATAR_SOURCE} style={styles.avatar} />
        <View style={styles.dot} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
  },
  item: {
    flex: 1,
    height: metrics.bottomBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.placeholder,
  },
  dot: {
    position: 'absolute',
    right: '28%',
    bottom: 12,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.notification,
  },
});
