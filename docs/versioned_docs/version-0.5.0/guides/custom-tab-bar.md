---
sidebar_position: 5
---

# Custom Tab Bar

Reanimated Tab View provides multiple ways to customize the tab bar appearance or replace it entirely.

## Styling the built-in tab bar

Use properties in `tabBarConfig` to style the default tab bar:

```tsx
<TabView
  tabBarConfig={{
    tabBarStyle: { backgroundColor: '#fff' },
    tabStyle: { paddingHorizontal: 16 },
    tabBarIndicatorStyle: { backgroundColor: '#6200ee', height: 3 },
    tabLabelStyle: { fontSize: 14, fontWeight: '600' },
  }}
  // ...other props
/>
```

### Tab bar colors

Control active and inactive tab colors via the `TabBarProps`:

```tsx
<TabView
  tabBarConfig={{
    renderTabBar: (props) => (
      <TabBar
        {...props}
        activeColor="#6200ee"
        inactiveColor="#999"
      />
    ),
  }}
/>
```

### Tab bar position

Place the tab bar at the top or bottom:

```tsx
<TabView
  tabBarConfig={{
    tabBarPosition: 'bottom',
  }}
/>
```

## Custom tab bar component

For full control, use `renderTabBar` in `tabBarConfig`:

```tsx
import { TabBar } from 'reanimated-tab-view';

<TabView
  tabBarConfig={{
    renderTabBar: (props) => (
      <TabBar
        {...props}
        activeColor="white"
        inactiveColor="gray"
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: '#6200ee' }}
      />
    ),
  }}
/>
```

## Custom tab content

To customize how individual tab labels are rendered, use `renderTabContent`:

```tsx
<TabView
  tabBarConfig={{
    renderTabBar: (props) => (
      <TabBar
        {...props}
        renderTabContent={({ route, activePercentage, label }) => {
          // Return your custom tab content
          return (
            <View style={styles.tab}>
              <Icon name={route.key} />
              <Text>{label}</Text>
            </View>
          );
        }}
      />
    ),
  }}
/>
```

The `renderTabContent` callback receives `TabContentProps` along with the `route`:

| Prop | Type | Description |
|------|------|-------------|
| `activePercentage` | `SharedValue<number>` | Animated value from 0 (inactive) to 1 (active) |
| `label` | `string \| undefined` | The tab label text |
| `activeColor` | `string \| undefined` | Color when active |
| `inactiveColor` | `string \| undefined` | Color when inactive |
| `labelStyle` | `StyleProp<TextStyle>` | Label text style |
| `route` | `Route` | The route object for this tab |

## Tab events

Handle tab press and long press events:

```tsx
<TabView
  tabBarConfig={{
    renderTabBar: (props) => (
      <TabBar
        {...props}
        onTabPress={({ route }) => {
          console.log('Pressed tab:', route.key);
        }}
        onTabLongPress={({ route }) => {
          console.log('Long pressed tab:', route.key);
        }}
      />
    ),
  }}
/>
```
