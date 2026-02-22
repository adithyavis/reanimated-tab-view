---
sidebar_position: 3
---

# Migration from react-native-tab-view

`reanimated-tab-view` is designed to be largely API-compatible with `react-native-tab-view`. This guide covers the key differences and steps to migrate.

## Installation changes

Remove `react-native-tab-view` and `react-native-pager-view`, then install `reanimated-tab-view`:

```bash
# Remove old packages
yarn remove react-native-tab-view react-native-pager-view

# Install reanimated-tab-view
yarn add reanimated-tab-view
```

Ensure `react-native-reanimated` (>= 3.0.0) and `react-native-gesture-handler` (>= 2.9.0) are installed.

## Import changes

```diff
- import { TabView, TabBar } from 'react-native-tab-view';
+ import { TabView, TabBar } from 'reanimated-tab-view';
```

## API compatibility

Most props work the same way:

| Prop | Compatible | Notes |
|------|-----------|-------|
| `navigationState` | Yes | Same API |
| `renderScene` | Yes | Same API |
| `onIndexChange` | Yes | Same API |
| `renderTabBar` | Moved | Now inside `tabBarConfig.renderTabBar` |
| `tabBarPosition` | Moved | Now inside `tabBarConfig.tabBarPosition` |
| `initialLayout` | Changed | Now accepts `{ tabView, tabViewHeader, tabBar }` object |
| `lazy` | Changed | Use `renderMode="lazy"` instead |
| `swipeEnabled` | Yes | Same API |
| `keyboardDismissMode` | Yes | Same API |

## Key differences

### Tab bar configuration

Tab bar props are now grouped under `tabBarConfig`:

```diff
  <TabView
-   renderTabBar={(props) => <TabBar {...props} />}
-   tabBarPosition="top"
+   tabBarConfig={{
+     renderTabBar: (props) => <TabBar {...props} />,
+     tabBarPosition: 'top',
+   }}
  />
```

### Lazy rendering

```diff
  <TabView
-   lazy
+   renderMode="lazy"
  />
```

### Initial layout

```diff
  <TabView
-   initialLayout={{ width: layout.width }}
+   initialLayout={{ tabView: { width: layout.width } }}
  />
```

## New features available after migration

After migrating, you gain access to features not available in `react-native-tab-view`:

- **Collapsible headers** via `renderHeader` prop
- **Windowed render mode** for balanced performance
- **Smooth jump mode** preventing blank flashes
- **Dynamic tab widths** following Material Design spec
- **No `react-native-pager-view` dependency** - fewer native module issues
