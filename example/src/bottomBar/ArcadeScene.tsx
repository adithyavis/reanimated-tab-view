import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ListScene } from './ListScene';
import { arcade } from './storeData';
import { colors, metrics } from './theme';

const HERO_SOURCE = { uri: arcade.artwork };

export const ArcadeScene = React.memo(() => (
  <ListScene
    title="Arcade"
    eyebrow="Included in your plan"
    sections={arcade.sections}
  >
    <View style={styles.hero}>
      <View style={styles.heroFrame}>
        <Image source={HERO_SOURCE} style={styles.heroImage} />
      </View>
      <View style={styles.heroBody}>
        <Text style={styles.heroHeadline}>{arcade.headline}</Text>
        <Text style={styles.heroSubtitle}>{arcade.subtitle}</Text>
        <View style={styles.heroButton}>
          <Text style={styles.heroButtonLabel}>Try it free</Text>
        </View>
      </View>
    </View>
  </ListScene>
));

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.card,
    borderRadius: metrics.cardRadius,
    overflow: 'hidden',
    marginBottom: 28,
  },
  heroFrame: {
    width: '100%',
    aspectRatio: 8 / 5,
    overflow: 'hidden',
    backgroundColor: colors.placeholder,
  },
  heroImage: {
    width: '100%',
    aspectRatio: 9 / 16,
  },
  heroBody: {
    padding: 16,
  },
  heroHeadline: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  heroButton: {
    alignSelf: 'flex-start',
    marginTop: 14,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: colors.accent,
  },
  heroButtonLabel: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
});
