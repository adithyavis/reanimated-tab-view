import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { HeaderRendererProps } from 'reanimated-tab-view';
import { CustomText } from './basicComponents/CustomText';
import { CollapsingHeaderSection } from './CollapsingHeaderSection';
import { ProfileAvatarRow } from './ProfileAvatarRow';
import { ProfileLinks } from './ProfileLinks';
import { ProfileStats } from './ProfileStats';
import { ChevronRightIcon } from './assets/RedditIcons';
import { profile } from './profile';
import { colors, metrics } from './theme';

export const HEADER_HEIGHT = 268;

export const RedditHeader = ({
  collapsedHeaderHeight,
}: HeaderRendererProps) => {
  return (
    <View style={styles.header}>
      <CollapsingHeaderSection collapsedHeaderHeight={collapsedHeaderHeight}>
        <ProfileAvatarRow />
      </CollapsingHeaderSection>

      <CollapsingHeaderSection
        collapsedHeaderHeight={collapsedHeaderHeight}
        style={styles.nameSection}
      >
        <CustomText style={styles.displayName} numberOfLines={1}>
          {profile.username}
        </CustomText>
      </CollapsingHeaderSection>

      <CollapsingHeaderSection
        collapsedHeaderHeight={collapsedHeaderHeight}
        style={styles.handleSection}
      >
        <Pressable style={styles.handleRow} hitSlop={6}>
          <CustomText style={styles.handle}>
            {profile.handle} • {profile.followers}
          </CustomText>
          <ChevronRightIcon size={13} color={colors.textSecondary} />
        </Pressable>
      </CollapsingHeaderSection>

      <CollapsingHeaderSection
        collapsedHeaderHeight={collapsedHeaderHeight}
        style={styles.linksSection}
      >
        <ProfileLinks />
      </CollapsingHeaderSection>

      <CollapsingHeaderSection
        collapsedHeaderHeight={collapsedHeaderHeight}
        style={styles.statsSection}
      >
        <ProfileStats />
      </CollapsingHeaderSection>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: metrics.screenPadding,
    paddingTop: 8,
    paddingBottom: 12,
  },
  nameSection: {
    marginTop: 14,
  },
  displayName: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  handleSection: {
    marginTop: 4,
  },
  handleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  handle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  linksSection: {
    marginTop: 12,
  },
  statsSection: {
    marginTop: 14,
  },
});
