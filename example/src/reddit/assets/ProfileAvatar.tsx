import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import avatar from './profile-avatar.png';
import { metrics } from '../theme';

const ART_ASPECT = 380 / 487;
const ART_SCALE = 0.92;

const ART_DROP = 0.045;

const ART_NUDGE = 0.02;

const BACKDROP = '#4b4b4b';

type ProfileAvatarProps = {
  size?: number;
};

export const ProfileAvatar = ({
  size = metrics.avatarSize,
}: ProfileAvatarProps) => {
  const width = size * ART_SCALE;

  return (
    <View
      style={[
        styles.crop,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <View
        style={[
          styles.bg,
          {
            width: width / 1.25,
            height: width / 1.25,
            borderRadius: width / 1.25,
            left: width / 5,
            top: width / 4,
          },
        ]}
      />

      <Image
        source={avatar}
        style={{
          width,
          height: width / ART_ASPECT,
          marginLeft: (size - width) / 2 + width * ART_NUDGE,
          marginTop: size * ART_DROP,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  crop: {
    overflow: 'hidden',
  },
  bg: {
    position: 'absolute',
    backgroundColor: BACKDROP,
  },
});
