import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import { colors, metrics } from './theme';

const ACTIONS = ['Edit profile', 'Share profile'];

export const ProfileActionButtons = () => {
  return (
    <View style={styles.container}>
      {ACTIONS.map((action) => (
        <Pressable
          key={action}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <CustomText style={styles.label}>{action}</CustomText>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  button: {
    flex: 1,
    height: metrics.actionButtonHeight,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
