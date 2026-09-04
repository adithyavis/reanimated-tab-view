import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import { profile, trophies } from './profile';
import { colors, metrics } from './theme';

const KARMA = [
  { key: 'post', value: profile.postKarma, label: 'Post Karma' },
  { key: 'comment', value: profile.commentKarma, label: 'Comment Karma' },
];

export const AboutTab = () => {
  return (
    <View style={styles.container}>
      <View style={styles.karmaRow}>
        {KARMA.map((karma) => (
          <View key={karma.key} style={styles.karma}>
            <CustomText style={styles.karmaValue}>{karma.value}</CustomText>
            <CustomText style={styles.karmaLabel}>{karma.label}</CustomText>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <CustomText style={styles.sectionLabel}>TROPHIES</CustomText>

      {trophies.map((trophy) => (
        <View key={trophy.key} style={styles.trophyRow}>
          <Image source={trophy.badge} style={styles.trophyBadge} />
          <CustomText style={styles.trophyTitle}>{trophy.title}</CustomText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
  },
  karmaRow: {
    flexDirection: 'row',
    paddingHorizontal: metrics.screenPadding,
    paddingBottom: 22,
  },
  karma: {
    flex: 1,
    gap: 4,
  },
  karmaValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  karmaLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
  },
  sectionLabel: {
    paddingHorizontal: metrics.screenPadding,
    paddingTop: 20,
    paddingBottom: 14,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.9,
    color: colors.textSecondary,
  },
  trophyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: metrics.screenPadding,
    paddingVertical: 10,
  },
  trophyBadge: {
    width: 48,
    height: 48,
  },
  trophyTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});
