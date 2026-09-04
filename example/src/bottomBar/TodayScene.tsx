import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SceneScrollView } from './SceneScrollView';
import { AppIcon, GetButton } from './StoreRow';
import { today, type Story } from './storeData';
import { colors, metrics } from './theme';

const StoryCard = React.memo<{ story: Story }>(({ story }) => (
  <View style={styles.card}>
    <View style={styles.artworkFrame}>
      <Image source={{ uri: story.artwork }} style={styles.artwork} />
    </View>
    <View style={styles.body}>
      <Text style={styles.eyebrow}>{story.eyebrow}</Text>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.subtitle}>{story.subtitle}</Text>
    </View>
    <View style={styles.footer}>
      <AppIcon app={story.app} size={44} />
      <View style={styles.footerText}>
        <Text style={styles.appName} numberOfLines={1}>
          {story.app.name}
        </Text>
        <Text style={styles.appTagline} numberOfLines={1}>
          {story.app.tagline}
        </Text>
      </View>
      <View style={styles.footerAction}>
        <GetButton label={story.app.price} />
        {!!story.app.note && <Text style={styles.note}>{story.app.note}</Text>}
      </View>
    </View>
  </View>
));

export const TodayScene = React.memo(() => (
  <SceneScrollView eyebrow={today.date} title="Today">
    {today.stories.map((story) => (
      <StoryCard key={story.id} story={story} />
    ))}
  </SceneScrollView>
));

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: metrics.cardRadius,
    overflow: 'hidden',
    marginBottom: 20,
  },
  artworkFrame: {
    width: '100%',
    aspectRatio: 10 / 7,
    overflow: 'hidden',
    backgroundColor: colors.placeholder,
  },
  artwork: {
    width: '100%',
    aspectRatio: 9 / 16,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  eyebrow: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginTop: 4,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  footerText: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  appName: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  appTagline: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  footerAction: {
    alignItems: 'center',
  },
  note: {
    color: colors.textTertiary,
    fontSize: 10,
    marginTop: 5,
  },
});
