---
sidebar_position: 2
---

# TabBar

The built-in tab bar component. Can be used directly when providing a custom `renderTabBar` implementation.

```tsx
import { TabBar } from 'reanimated-tab-view';
```

## Props

`TabBar` extends `ScrollViewProps` (excluding `children` and `indicatorStyle`) and accepts:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeColor` | `string` | `undefined` | Color of the active tab label. |
| `inactiveColor` | `string` | `undefined` | Color of inactive tab labels. |
| `getLabelText` | `(scene: Scene) => string \| undefined` | `undefined` | Custom function to get label text for a tab. |
| `renderTabContent` | `(props: TabContentProps & { route: Route }) => ReactNode` | `undefined` | Custom renderer for individual tab content. |
| `onTabPress` | `(scene: Scene) => void` | `undefined` | Callback when a tab is pressed. |
| `onTabLongPress` | `(scene: Scene) => void` | `undefined` | Callback when a tab is long-pressed. |
| `tabContentStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for tab content wrapper. |
| `indicatorStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for the tab indicator. |
| `labelStyle` | `StyleProp<TextStyle>` | `undefined` | Style for tab labels. |
| `tabStyle` | `StyleProp<ViewStyle>` | `undefined` | Style for individual tabs. |

## Usage with renderTabBar

```tsx
<TabView
  tabBarConfig={{
    renderTabBar: (props) => (
      <TabBar
        {...props}
        activeColor="#6200ee"
        inactiveColor="#666"
        indicatorStyle={{ backgroundColor: '#6200ee' }}
      />
    ),
  }}
/>
```

## Custom label text

```tsx
<TabBar
  {...props}
  getLabelText={({ route }) => route.title?.toUpperCase()}
/>
```
