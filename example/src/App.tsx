import * as React from 'react';

import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BasicScreen } from './screens/BasicScreen';
import { InstagramScreen } from './screens/InstagramScreen';

const Drawer = createDrawerNavigator();

const screenOptions = { swipeEnabled: false } as const;

export default function App() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Basic"
          screenOptions={screenOptions}
        >
          <Drawer.Screen name="Basic" component={BasicScreen} />
          <Drawer.Screen name="Instagram" component={InstagramScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
