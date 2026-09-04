import * as React from 'react';

import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BasicScreen } from './screens/BasicScreen';
import { InstagramScreen } from './screens/InstagramScreen';
import { RedditScreen } from './screens/RedditScreen';
import { BottomBarScreen } from './screens/BottomBarScreen';
import { FlashListScreen } from './screens/FlashListScreen';
import { LegendListScreen } from './screens/LegendListScreen';

const Drawer = createDrawerNavigator();

const screenOptions = { swipeEnabled: false } as const;

export default function App() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Instagram"
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
