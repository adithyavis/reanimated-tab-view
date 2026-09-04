import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RTVScrollView } from 'reanimated-tab-view';
import { useTabBarClearance } from './FloatingTabBar';
import { colors, metrics } from './theme';

type SceneScrollViewProps = React.PropsWithChildren<{
  title: string;
  eyebrow?: string;
}>;

export const SceneScrollView = React.memo<SceneScrollViewProps>(
  ({ title, eyebrow, children }) => {
    const clearance = useTabBarClearance();

    return (
      <RTVScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: clearance + 12 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          {!!eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
          <Text style={styles.title}>{title}</Text>
        </View>
        {children}
      </RTVScrollView>
    );
  }
);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: metrics.screenPadding,
    paddingTop: 16,
  },
  header: {
    marginBottom: 20,
  },
  eyebrow: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
});
