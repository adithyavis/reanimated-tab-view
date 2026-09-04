import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import { ChevronRightIcon } from './assets/RedditIcons';
import volcano from './assets/achievements/16itpg51vs1d1.webp';
import meteor from './assets/achievements/mhy48431vs1d1.webp';
import sun from './assets/achievements/xwfmnf31vs1d1.webp';
import { profile } from './profile';
import { colors } from './theme';

const ACHIEVEMENTS = [volcano, meteor, sun];

export const ProfileLinks = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.entry} hitSlop={6}>
        <CustomText style={styles.label}>Add social link</CustomText>
        <ChevronRightIcon size={13} color={colors.textSecondary} />
      </Pressable>

      <Pressable style={styles.entry} hitSlop={6}>
        <View style={styles.badges}>
          {ACHIEVEMENTS.map((achievement, index) => (
            <Image
              key={achievement}
              source={achievement}
              style={[styles.badge, index > 0 && styles.badgeOverlap]}
            />
          ))}
        </View>
        <CustomText style={styles.label}>{profile.achievements}</CustomText>
        <ChevronRightIcon size={13} color={colors.textSecondary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 26,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  label: {
    fontSize: 14,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 3,
  },
  badgeOverlap: {
    marginLeft: -7,
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.background,
  },
});
