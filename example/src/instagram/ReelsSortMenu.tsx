import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import { CheckIcon } from './assets/ChromeIcons';
import { colors } from './theme';

export type ReelsSort = 'latest' | 'most-viewed';

const OPTIONS: { value: ReelsSort; label: string }[] = [
  { value: 'latest', label: 'Latest' },
  { value: 'most-viewed', label: 'Most viewed' },
];

type ReelsSortMenuProps = {
  value: ReelsSort;
  onChange: (value: ReelsSort) => void;
  style?: StyleProp<ViewStyle>;
};

export const ReelsSortMenu = ({
  value,
  onChange,
  style,
}: ReelsSortMenuProps) => {
  return (
    <View style={[styles.menu, style]}>
      {OPTIONS.map((option) => (
        <Pressable
          key={option.value}
          style={({ pressed }) => [styles.option, pressed && styles.pressed]}
          onPress={() => onChange(option.value)}
        >
          <CustomText style={styles.label}>{option.label}</CustomText>
          {value === option.value && (
            <CheckIcon size={18} color={colors.textPrimary} />
          )}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: 168,
    borderRadius: 14,
    paddingVertical: 4,
    backgroundColor: colors.surfaceElevated,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  option: {
    height: 44,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  pressed: {
    opacity: 0.6,
  },
  label: {
    fontSize: 15,
  },
});
