import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import { ChevronRightIcon } from './assets/RedditIcons';
import { SubredditIcon } from './assets/SubredditIcon';
import { stats, type ProfileStat } from './profile';
import { colors } from './theme';

export const ProfileStats = () => {
  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <React.Fragment key={stat.key}>
          {index === 0 ? null : <View style={styles.divider} />}
          <Stat stat={stat} />
        </React.Fragment>
      ))}
    </View>
  );
};

const Stat = React.memo(function Stat({ stat }: { stat: ProfileStat }) {
  return (
    <Pressable style={styles.stat} hitSlop={6} disabled={!stat.expandable}>
      <View style={styles.valueRow}>
        {stat.communities ? (
          <View style={styles.communities}>
            {stat.communities.map((community, index) => (
              <View
                key={community}
                style={[styles.community, index > 0 && styles.communityOverlap]}
              >
                <SubredditIcon subreddit={community} size={16} />
              </View>
            ))}
          </View>
        ) : null}
        <CustomText style={styles.value}>{stat.value}</CustomText>
      </View>
      <View style={styles.labelRow}>
        <CustomText style={styles.label}>{stat.label}</CustomText>
        {stat.expandable ? (
          <ChevronRightIcon size={12} color={colors.textSecondary} />
        ) : null}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: 32,
    backgroundColor: colors.border,
  },
  stat: {
    gap: 3,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  value: {
    fontSize: 17,
    fontWeight: '700',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  communities: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  community: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.background,
  },
  communityOverlap: {
    marginLeft: -7,
  },
});
