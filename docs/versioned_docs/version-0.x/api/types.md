---
sidebar_position: 7
---

# Types

All exported TypeScript types from `reanimated-tab-view`.

```tsx
import type {
  Route,
  NavigationState,
  Layout,
  SceneRendererProps,
  HeaderRendererProps,
  TabViewProps,
  TabViewMethods,
  TabBarConfig,
  TabBarProps,
  TabContentProps,
  RenderMode,
  JumpMode,
  TabBarType,
  TabBarPosition,
  KeyboardDismissMode,
} from 'reanimated-tab-view';
```

## Route

Describes a single tab route.

```tsx
type Route = {
  key: string;
  title?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  testID?: string;
};
```

## NavigationState

The state object passed to `TabView` via the `navigationState` prop.

```tsx
type NavigationState = {
  index: number;
  routes: Route[];
};
```

## Layout

Describes width and height dimensions.

```tsx
type Layout = {
  width: number;
  height: number;
};
```

## SceneRendererProps

Props passed to the `renderScene` callback.

```tsx
type SceneRendererProps = {
  route: Route;
};
```

## HeaderRendererProps

Props passed to the `renderHeader` callback.

```tsx
type HeaderRendererProps = {
  collapsedPercentage: SharedValue<number>;
  collapsedHeaderHeight: SharedValue<number>;
};
```

## TabViewProps

Full props type for the `TabView` component. See [TabView API](/docs/api/components/tab-view) for details.

## TabViewMethods

Methods available via the `TabView` ref.

```tsx
type TabViewMethods = {
  jumpTo: (routeKey: string) => void;
};
```

## TabBarConfig

Configuration for the tab bar passed via `tabBarConfig`. See [TabView API](/docs/api/components/tab-view#tabbarconfig) for details.

## TabBarProps

Props for the `TabBar` component. See [TabBar API](/docs/api/components/tab-bar) for details.

## TabContentProps

Props passed to custom tab content renderers.

```tsx
type TabContentProps = Omit<ViewProps, 'children'> & {
  activePercentage: SharedValue<number>;
  label?: string;
  activeColor?: string;
  inactiveColor?: string;
  labelStyle?: StyleProp<TextStyle>;
};
```

## Enum types

### RenderMode

```tsx
type RenderMode = 'all' | 'windowed' | 'lazy';
```

### JumpMode

```tsx
type JumpMode = 'smooth' | 'scrolling' | 'no-animation';
```

### TabBarType

```tsx
type TabBarType = 'primary' | 'secondary';
```

### TabBarPosition

```tsx
type TabBarPosition = 'top' | 'bottom';
```

### KeyboardDismissMode

```tsx
type KeyboardDismissMode = 'none' | 'on-drag' | 'auto';
```
