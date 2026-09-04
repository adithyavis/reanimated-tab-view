import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SceneScrollView } from './SceneScrollView';
import { StoreRow } from './StoreRow';
import { searchSuggestions, searchTrending } from './storeData';
import { SearchIcon } from './assets/TabIcons';
import { colors, metrics } from './theme';

export const SearchScene = React.memo(() => (
  <SceneScrollView title="Search">
    <View style={styles.field}>
      <SearchIcon size={18} color={colors.textSecondary} />
      <Text style={styles.fieldPlaceholder}>Games, apps, stories and more</Text>
    </View>

    <Text style={styles.sectionTitle}>Suggested</Text>
    <View style={styles.card}>
      {searchSuggestions.map((suggestion, index) => (
        <View
          key={suggestion}
          style={[
            styles.suggestion,
            index < searchSuggestions.length - 1 && styles.divider,
          ]}
        >
          <SearchIcon size={16} color={colors.textTertiary} />
          <Text style={styles.suggestionText}>{suggestion}</Text>
        </View>
      ))}
    </View>

    <Text style={styles.sectionTitle}>Trending this week</Text>
    <View style={styles.card}>
      {searchTrending.map((app, index) => (
        <StoreRow
          key={app.id}
          app={app}
          isLast={index === searchTrending.length - 1}
        />
      ))}
    </View>
  </SceneScrollView>
));

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.cardElevated,
    marginBottom: 24,
  },
  fieldPlaceholder: {
    color: colors.textSecondary,
    fontSize: 16,
    marginLeft: 8,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: metrics.cardRadius,
    paddingHorizontal: 14,
    marginBottom: 28,
  },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  suggestionText: {
    color: colors.textPrimary,
    fontSize: 15,
    marginLeft: 10,
  },
});
