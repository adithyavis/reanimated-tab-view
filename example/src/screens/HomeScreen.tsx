import * as React from 'react';
import {
  Button,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  TabView as ReanimatedTabView,
  type NavigationState,
  type TabViewMethods,
  RTVScrollView,
} from 'reanimated-tab-view';
import {
  TabView as TabView,
  TabBar as ReactNavigationTabBar,
} from 'react-native-tab-view';
import converter from 'number-to-words';

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
  width: windowWidth - 50,
};

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

export const HomeScreen = () => {
  const initialTabIndex = React.useMemo(() => 0, []);
  const [showReanimatedTabView, setShowReanimatedTabView] =
    React.useState(true);

  const toggleShowReanimatedTabView = React.useCallback(
    () => setShowReanimatedTabView((prev) => !prev),
    []
  );

  const renderTabBar = React.useCallback(
    (props) => <ReactNavigationTabBar {...props} scrollEnabled />,
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

  const renderScene = React.useCallback(({ route }) => {
    return (
      <Scene
        backgroundColor={route.color}
        text={`Scene ${converter.toWords(parseInt(route.key, 10) + 1)}`}
        routeIndex={parseInt(route.key, 10)}
      />
    );
  }, []);

  const handleIndexChange = React.useCallback((index: number) => {
    setNavigationState((state) => ({ ...state, index }));
  }, []);

  const tabViewRef = React.useRef<TabViewMethods>(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        {`Rendered component: ${
          showReanimatedTabView ? 'ReanimatedTabView' : 'TabView'
        }`}
      </Text>
      <Button onPress={toggleShowReanimatedTabView} title="TOGGLE" />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  tabView: { flex: 1, width: windowWidth - 50 },
  sceneText: {
    fontSize: 18,
    marginBottom: 100,
  },
});
