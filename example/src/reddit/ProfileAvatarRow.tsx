import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import { ProfileAvatar } from './assets/ProfileAvatar';
import { colors, metrics } from './theme';

export const ProfileAvatarRow = () => {
  return (
    <View style={styles.container}>
      <ProfileAvatar />
      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.outlined,
            pressed && styles.pressed,
          ]}
        >
          <CustomText style={styles.label}>Edit</CustomText>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.filled,
            pressed && styles.pressed,
          ]}
        >
          <CustomText style={styles.label}>Create</CustomText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    height: metrics.actionButtonHeight,
    paddingHorizontal: 18,
    borderRadius: metrics.actionButtonHeight / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  filled: {
    backgroundColor: colors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
