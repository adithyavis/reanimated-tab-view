import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomText } from './basicComponents/CustomText';
import { HomeIcon, InboxIcon, PlusIcon } from './assets/RedditIcons';
import { ProfileAvatar } from './assets/ProfileAvatar';
import { colors } from './theme';

const BAR_HEIGHT = 54;

const ITEMS = ['Home', 'Create', 'Inbox'] as const;

const ICONS = {
  Home: HomeIcon,
  Create: PlusIcon,
  Inbox: InboxIcon,
};

export const RedditBottomBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { height: BAR_HEIGHT + insets.bottom, paddingBottom: insets.bottom },
      ]}
    >
      {ITEMS.map((item) => {
        const Icon = ICONS[item];
        return (
          <Pressable key={item} style={styles.item} hitSlop={6}>
            <Icon size={24} color={colors.textSecondary} />
            <CustomText style={styles.label}>{item}</CustomText>
          </Pressable>
        );
      })}

      <Pressable style={styles.item} hitSlop={6}>
        <View style={styles.avatar}>
          <ProfileAvatar size={26} />
        </View>
        <CustomText style={styles.activeLabel}>You</CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  avatar: {
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: colors.textPrimary,
    padding: 1,
  },
  label: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  activeLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
