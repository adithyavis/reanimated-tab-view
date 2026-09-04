import * as React from 'react';

import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DarkTheme,
  type Theme,
} from '@react-navigation/native';
import {
  createDrawerNavigator,
  type DrawerNavigationOptions,
} from '@react-navigation/drawer';
import { BasicScreen } from './screens/BasicScreen';
import { InstagramScreen } from './screens/InstagramScreen';
import { RedditScreen } from './screens/RedditScreen';
import { BottomBarScreen } from './screens/BottomBarScreen';
import { FlashListScreen } from './screens/FlashListScreen';
import { LegendListScreen } from './screens/LegendListScreen';

const Drawer = createDrawerNavigator();

const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#4A9BF5',
    background: '#000000',
    card: '#121212',
    text: '#FFFFFF',
    border: '#262626',
  },
};

const screenOptions: DrawerNavigationOptions = {
  swipeEnabled: false,
  drawerActiveTintColor: navigationTheme.colors.primary,
  drawerInactiveTintColor: '#A8A8A8',
  drawerActiveBackgroundColor: 'rgba(74, 155, 245, 0.16)',
  drawerStyle: { backgroundColor: navigationTheme.colors.card },
  headerStyle: { backgroundColor: navigationTheme.colors.card },
  headerTintColor: navigationTheme.colors.text,
};

export default function App() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <NavigationContainer theme={navigationTheme}>
          <Drawer.Navigator
            initialRouteName="Bottom bar"
            screenOptions={screenOptions}
          >
            <Drawer.Screen name="Basic" component={BasicScreen} />
            <Drawer.Screen name="Instagram" component={InstagramScreen} />
            <Drawer.Screen name="Reddit" component={RedditScreen} />
            <Drawer.Screen name="Bottom bar" component={BottomBarScreen} />
            <Drawer.Screen name="FlashList" component={FlashListScreen} />
            <Drawer.Screen name="LegendList" component={LegendListScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
