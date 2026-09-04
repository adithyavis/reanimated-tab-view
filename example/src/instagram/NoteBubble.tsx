import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import { colors } from './theme';

type NoteBubbleProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
};

export const NoteBubble = ({ text, style }: NoteBubbleProps) => {
  return (
    <View style={[styles.bubble, style]}>
      <CustomText style={styles.text}>{text}</CustomText>
      <View style={styles.tail} />
      <View style={styles.tailTip} />
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    width: 78,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  text: {
    fontSize: 11,
    lineHeight: 14,
    color: colors.textSecondary,
  },
  tail: {
    position: 'absolute',
    right: 12,
    bottom: -4,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.surface,
  },
  tailTip: {
    position: 'absolute',
    right: 8,
    bottom: -10,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surface,
  },
});
