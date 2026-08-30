import * as React from 'react';

import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  TabView as ReanimatedTabView,
  type NavigationState,
  type Route,
  type SceneRendererProps,
  type TabViewMethods,
  RTVScrollView,
} from 'reanimated-tab-view';
import {
  TabView,
  TabBar as ReactNavigationTabBar,
  type TabBarProps,
} from 'react-native-tab-view';
import converter from 'number-to-words';
import { SegmentedControl } from '../components/SegmentedControl';

const randomColor = (() => {
  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return () => {
    const h = randomInt(0, 360);
    const s = randomInt(42, 98);
    const l = randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  };
})();

const { width: windowWidth } = Dimensions.get('window');
const initialTabViewLayout = {
  width: windowWidth,
};

const SEGMENTS = ['ReanimatedTabView', 'TabView'];

const Scene = ({
  backgroundColor,
  text,
}: {
  backgroundColor: string;
  text: string;
  routeIndex: number;
}) => {
  return (
    <RTVScrollView>
      <View style={[{ backgroundColor, height: 1500 }]}>
        <Text style={styles.sceneText}>{text}</Text>
      </View>
    </RTVScrollView>
  );
};

export const BasicScreen = () => {
  const initialTabIndex = React.useMemo(() => 0, []);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = React.useState(0);
  const showReanimatedTabView = selectedSegmentIndex === 0;

  const renderTabBar = React.useCallback(
    (props: TabBarProps<Route>) => (
      <ReactNavigationTabBar {...props} scrollEnabled />
    ),
    []
  );

  const [navigationState, setNavigationState] = React.useState<NavigationState>(
    {
      index: initialTabIndex,
      routes: [...Array(4).keys()].map((i) => ({
        key: `${i}`,
        title: `Tab ${converter.toWords(i + 1)}`,
        color: randomColor(),
      })),
    }
  );

  const initialLayout = React.useMemo(
    () => ({ tabView: initialTabViewLayout }),
    []
  );

  const renderScene = React.useCallback(({ route }: SceneRendererProps) => {
    const { color, key } = route as Route & { color: string };
    return (
      <Scene
        backgroundColor={color}
        text={`Scene ${converter.toWords(parseInt(key, 10) + 1)}`}
        routeIndex={parseInt(key, 10)}
      />
    );
  }, []);

  const handleIndexChange = React.useCallback((index: number) => {
    setNavigationState((state) => ({ ...state, index }));
  }, []);

  const tabViewRef = React.useRef<TabViewMethods>(null);

  return (
    <View style={styles.container}>
      <SegmentedControl
        values={SEGMENTS}
        selectedIndex={selectedSegmentIndex}
        onChange={setSelectedSegmentIndex}
        style={styles.segmentedControl}
      />
      {showReanimatedTabView ? (
        <ReanimatedTabView
          ref={tabViewRef}
          onIndexChange={handleIndexChange}
          navigationState={navigationState}
          renderScene={renderScene}
          initialLayout={initialLayout}
        />
      ) : (
        <TabView
          onIndexChange={handleIndexChange}
          navigationState={navigationState}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          initialLayout={initialTabViewLayout}
          style={styles.tabView}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentedControl: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  tabView: { flex: 1 },
  sceneText: {
    fontSize: 18,
    marginBottom: 100,
  },
});
