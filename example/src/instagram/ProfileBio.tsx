import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import { ThreadsIcon } from './assets/ChromeIcons';
import { profile } from './profile';
import { colors } from './theme';

export const ProfileBio = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.bio}>
        {profile.bio}
        <CustomText style={styles.link}> · Add interests</CustomText>
      </CustomText>
      <View style={styles.threadsRow}>
        <ThreadsIcon size={15} color={colors.textPrimary} />
        <CustomText style={styles.threadsHandle}>
          {profile.threadsHandle}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  bio: {
    fontSize: 14,
    lineHeight: 19,
  },
  link: {
    color: colors.link,
  },
  threadsRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  threadsHandle: {
    fontSize: 14,
    fontWeight: '600',
  },
});
