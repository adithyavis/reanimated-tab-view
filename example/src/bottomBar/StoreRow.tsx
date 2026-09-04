import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { StoreApp, StorySection } from './storeData';
import { colors, metrics } from './theme';

type AppIconProps = {
  app: StoreApp;
  size?: number;
};

export const AppIcon = React.memo<AppIconProps>(
  ({ app, size = metrics.appIconSize }) => (
    <Image
      source={{ uri: app.icon }}
      style={[
        styles.icon,
        {
          width: size,
          height: size,
          borderRadius: size * 0.225,
          backgroundColor: app.tint,
        },
      ]}
    />
  )
);

export const GetButton = React.memo<{ label?: string }>(({ label = 'GET' }) => (
  <View style={styles.getButton}>
    <Text style={styles.getLabel}>{label}</Text>
  </View>
));

export const StoreRow = React.memo<{ app: StoreApp; isLast?: boolean }>(
  ({ app, isLast }) => (
    <View style={[styles.row, !isLast && styles.rowDivider]}>
      <AppIcon app={app} />
      <View style={styles.rowText}>
        <Text style={styles.rowTitle} numberOfLines={1}>
          {app.name}
        </Text>
        <Text style={styles.rowTagline} numberOfLines={2}>
          {app.tagline}
        </Text>
      </View>
      <View style={styles.rowAction}>
        <GetButton label={app.price} />
        {!!app.note && (
          <Text style={styles.rowNote} numberOfLines={1}>
            {app.note}
          </Text>
        )}
      </View>
    </View>
  )
);

export const SectionHeader = React.memo<{ section: StorySection }>(
  ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {!!section.subtitle && (
        <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
      )}
    </View>
  )
);

export const StoreSection = React.memo<{ section: StorySection }>(
  ({ section }) => (
    <View style={styles.section}>
      <SectionHeader section={section} />
      <View style={styles.card}>
        {section.apps.map((app, index) => (
          <StoreRow
            key={app.id}
            app={app}
            isLast={index === section.apps.length - 1}
          />
        ))}
      </View>
    </View>
  )
);

const styles = StyleSheet.create({
  icon: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  sectionSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: metrics.cardRadius,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  rowText: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  rowTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  rowTagline: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  rowAction: {
    width: 96,
    alignItems: 'center',
  },
  getButton: {
    minWidth: 68,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: colors.action,
    alignItems: 'center',
  },
  getLabel: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '700',
  },
  rowNote: {
    color: colors.textTertiary,
    fontSize: 10,
    marginTop: 5,
  },
});
