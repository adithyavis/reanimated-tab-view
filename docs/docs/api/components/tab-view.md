---
sidebar_position: 1
---

# TabView

The main component for rendering a tab view.

```tsx
import { TabView } from 'reanimated-tab-view';
```

## Props

`TabView` extends `ViewProps` (excluding `children`) and accepts the following additional props:

### Required props

| Prop | Type | Description |
|------|------|-------------|
| `navigationState` | `NavigationState` | The state of the navigation including the current index and routes. `{ index: number; routes: Route[] }` |
| `onIndexChange` | `(index: number) => void` | Callback fired when the active tab index changes. |
| `renderScene` | `(props: SceneRendererProps) => ReactNode` | Function that renders the content for each tab. |

### Optional props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialLayout` | `object` | `undefined` | Initial layout dimensions to reduce jitter. See below. |
| `tabBarConfig` | `TabBarConfig` | `undefined` | Configuration for the tab bar. See below. |
| `renderHeader` | `(props: HeaderRendererProps) => ReactNode` | `undefined` | Renders a collapsible header above the tab bar. |
| `renderMode` | `'all' \| 'windowed' \| 'lazy'` | `'all'` | Controls how scenes are rendered. |
| `jumpMode` | `'smooth' \| 'scrolling' \| 'no-animation'` | `'smooth'` | Controls the animation when jumping between tabs. |
| `swipeEnabled` | `boolean` | `true` | Enables or disables swipe gestures between tabs. |
| `keyboardDismissMode` | `'none' \| 'on-drag' \| 'auto'` | `'auto'` | How to dismiss the keyboard when swiping. |
| `animatedRouteIndex` | `SharedValue<number>` | `undefined` | A shared value that gets updated with the current animated route index. |
| `sceneContainerStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for the scene container. |
| `tabViewCarouselStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for the tab view carousel. |
| `sceneContainerGap` | `number` | `0` | Gap between each scene. |
| `style` | `StyleProp<ViewStyle>` | `undefined` | Style for the root view. |
| `onSwipeStart` | `() => void` | `undefined` | Callback when a swipe gesture starts. |
| `onSwipeEnd` | `() => void` | `undefined` | Callback when a swipe gesture ends. |

### initialLayout

Object to provide initial dimensions and reduce layout jitter:

```tsx
initialLayout?: {
  tabView?: Partial<{ width: number; height: number }>;
  tabViewHeader?: Partial<{ width: number; height: number }>;
  tabBar?: Partial<{ width: number; height: number }>;
}
```

## TabBarConfig

Configuration object for the tab bar, passed via the `tabBarConfig` prop:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabBarPosition` | `'top' \| 'bottom'` | `'top'` | Position of the tab bar. |
| `tabBarType` | `'primary' \| 'secondary'` | `'secondary'` | Type of tab bar per Material Design spec. |
| `tabBarScrollEnabled` | `boolean` | `true` | Enables scrollable tab bar. |
| `tabBarDynamicWidthEnabled` | `boolean` | `true` for primary, `false` for secondary | Enables dynamic tab widths based on title length. |
| `scrollableTabWidth` | `number` | `100` | Width of each tab when `tabBarScrollEnabled` is true. |
| `tabBarStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for the tab bar container. |
| `tabBarIndicatorStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for the tab indicator. |
| `tabStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for individual tabs. |
| `tabLabelStyle` | `StyleProp<TextStyle>` | `undefined` | Style for tab labels. |
| `renderTabBar` | `(props: TabBarProps) => ReactNode` | `undefined` | Custom tab bar renderer. |

## Ref methods

Access ref methods by passing a ref to `TabView`:

```tsx
const ref = React.useRef<TabViewMethods>(null);

<TabView ref={ref} /* ...props */ />

// Later:
ref.current?.jumpTo('settings');
```

### `jumpTo(routeKey: string)`

Programmatically jump to a specific tab by its route key. The animation style follows the current `jumpMode` setting.
