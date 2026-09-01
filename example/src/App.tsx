import * as React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from './screens/HomeScreen';
import { InstagramScreen } from './screens/InstagramScreen';
import { FlashListScreen } from './screens/FlashListScreen';
import { LegendListScreen } from './screens/LegendListScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen
            name="Instagram"
            component={InstagramScreen}
            options={instagramOptions}
          />
          <Drawer.Screen
            name="FlashList"
            component={FlashListScreen}
            options={flashListOptions}
          />
          <Drawer.Screen
            name="LegendList"
            component={LegendListScreen}
            options={legendListOptions}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

/**
 * The tab view owns horizontal swipes, so the drawer is opened from the very
 * edge of the screen or from the header button.
 */
const screenOptions = {
  swipeEdgeWidth: 24,
} as const;

const instagramOptions = { title: 'Instagram (collapsible header)' } as const;
const flashListOptions = { title: 'RTVFlashList' } as const;
const legendListOptions = { title: 'RTVLegendList' } as const;

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
