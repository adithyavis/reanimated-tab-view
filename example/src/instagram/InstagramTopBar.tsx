import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import {
  ChevronDownIcon,
  LockIcon,
  MenuIcon,
  PlusIcon,
  ThreadsIcon,
} from './assets/ChromeIcons';
import { profile } from './profile';
import { colors, metrics } from './theme';

const THREADS_UNREAD_COUNT = 8;

export const InstagramTopBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleLayer} pointerEvents="box-none">
        <Pressable style={styles.title} hitSlop={8}>
          <LockIcon size={15} color={colors.textPrimary} />
          <CustomText style={styles.username}>{profile.username}</CustomText>
          <ChevronDownIcon size={16} color={colors.textPrimary} />
          <View style={styles.unreadDot} />
        </Pressable>
      </View>

      <Pressable hitSlop={10}>
        <PlusIcon size={26} color={colors.textPrimary} strokeWidth={2} />
      </Pressable>

      <View style={styles.actions}>
        <Pressable hitSlop={10}>
          <ThreadsIcon size={26} color={colors.textPrimary} />
          <View style={styles.badge}>
            <CustomText style={styles.badgeLabel}>
              {THREADS_UNREAD_COUNT}
            </CustomText>
          </View>
        </Pressable>
        <Pressable hitSlop={10}>
          <MenuIcon size={26} color={colors.textPrimary} />
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
  titleLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginLeft: 2,
    backgroundColor: colors.notification,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  badge: {
    position: 'absolute',
    top: -7,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.notification,
  },
  badgeLabel: {
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 13,
  },
});
