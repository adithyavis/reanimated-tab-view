import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import { ChevronRightIcon, EyeIcon, EyeOffIcon } from './assets/RedditIcons';
import { colors, metrics } from './theme';

type VisibilityBannerProps = {
  label: string;

  hidden?: boolean;
  expandable?: boolean;
};

export const VisibilityBanner = React.memo<VisibilityBannerProps>(
  function VisibilityBanner({ label, hidden = false, expandable = false }) {
    const Icon = hidden ? EyeOffIcon : EyeIcon;

    return (
      <Pressable
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        disabled={!expandable}
      >
        <Icon size={20} color={colors.textSecondary} />
        <CustomText style={styles.label} numberOfLines={1}>
          {label}
        </CustomText>
        <View style={styles.spacer} />
        {expandable ? (
          <ChevronRightIcon size={16} color={colors.textPrimary} />
        ) : null}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 44,
    paddingHorizontal: 14,
    borderRadius: metrics.cardRadius,
    backgroundColor: colors.surface,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    flexShrink: 1,
    fontSize: 14,
  },
  spacer: {
    flex: 1,
  },
});
