import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import {
  ChevronDownIcon,
  FeedOptionsIcon,
  PostListIcon,
} from './assets/RedditIcons';
import { colors } from './theme';

export const FeedOptionsButton = () => {
  return (
    <Pressable
      style={({ pressed }) => [styles.pill, pressed && styles.pressed]}
    >
      <FeedOptionsIcon size={19} />
      <CustomText style={styles.label}>Feed Options</CustomText>
    </Pressable>
  );
};

export const SavedFilterButton = () => {
  return (
    <Pressable
      style={({ pressed }) => [styles.selector, pressed && styles.pressed]}
      hitSlop={6}
    >
      <PostListIcon size={20} />
      <CustomText style={styles.selectorLabel}>POSTS</CustomText>
      <ChevronDownIcon size={16} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  selector: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  pressed: {
    opacity: 0.7,
  },
});
