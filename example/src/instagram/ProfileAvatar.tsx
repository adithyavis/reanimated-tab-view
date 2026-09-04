import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { PlusIcon } from './assets/ChromeIcons';
import { colors, metrics } from './theme';

type ProfileAvatarProps = {
  uri: string;
  size?: number;
  showAddBadge?: boolean;
};

export const ProfileAvatar = ({
  uri,
  size = metrics.avatarSize,
  showAddBadge = false,
}: ProfileAvatarProps) => {
  const source = useMemo(() => ({ uri }), [uri]);
  const sizeStyle = useMemo(
    () => ({ width: size, height: size, borderRadius: size / 2 }),
    [size]
  );

  return (
    <View style={sizeStyle}>
      <Image source={source} style={[styles.image, sizeStyle]} />
      {showAddBadge && (
        <View style={styles.badge}>
          <PlusIcon size={13} color={colors.background} strokeWidth={3} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.placeholder,
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.background,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
