import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  TabView,
  type NavigationState,
  type SceneRendererProps,
} from 'reanimated-tab-view';
import { createListData, type ListItemData } from './data';

const { width: windowWidth } = Dimensions.get('window');

const HEADER_HEIGHT = 180;
const TAB_BAR_HEIGHT = 48;
const ITEMS_PER_ROUTE = 200;

const ROUTES = [
  { key: 'alpha', title: 'Alpha' },
  { key: 'beta', title: 'Beta' },
  { key: 'gamma', title: 'Gamma' },
];

const DATA_BY_ROUTE: Record<string, ListItemData[]> = ROUTES.reduce(
  (acc, route) => {
    acc[route.key] = createListData(route.key, ITEMS_PER_ROUTE);
    return acc;
  },
  {} as Record<string, ListItemData[]>
);

const initialLayout = {
  tabView: { width: windowWidth },
  tabBar: { height: TAB_BAR_HEIGHT },
  tabViewHeader: { width: windowWidth, height: HEADER_HEIGHT },
};

type Props = {
  /** Name of the component under test, rendered in the collapsible header. */
  title: string;
  /** Renders the list under test for a single route. */
  renderList: (data: ListItemData[]) => React.ReactNode;
};

/**
 * Shared scaffolding for the RTVFlashList and RTVLegendList screens: a tab view
 * with a collapsible header, so that both screens exercise the same header
 * collapse behaviour and differ only in the list component they render.
 */
export const ListDemoTabView = ({ title, renderList }: Props) => {
  const [navigationState, setNavigationState] = React.useState<NavigationState>(
    { index: 0, routes: ROUTES }
  );

  const handleIndexChange = React.useCallback((index: number) => {
    setNavigationState((state) => ({ ...state, index }));
  }, []);

  const renderHeader = React.useCallback(
    () => (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>
          Scroll a list to collapse this header. Switch tabs to check that the
          collapsed offset stays in sync.
        </Text>
      </View>
    ),
    [title]
  );

  const renderScene = React.useCallback(
    ({ route }: SceneRendererProps) =>
      renderList(DATA_BY_ROUTE[route.key] ?? []),
    [renderList]
  );

  return (
    <TabView
      navigationState={navigationState}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      renderHeader={renderHeader}
      initialLayout={initialLayout}
      tabBarConfig={tabBarConfig}
    />
  );
};

const tabBarConfig = {
  tabBarStyle: { height: TAB_BAR_HEIGHT },
};

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgb(32, 32, 32)',
  },
  headerTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 8,
  },
});
