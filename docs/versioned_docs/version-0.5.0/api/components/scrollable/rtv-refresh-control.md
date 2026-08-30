---
sidebar_position: 5
---

# RTVRefreshControl

A refresh control component that automatically handles `progressViewOffset` for collapsible headers. Use this instead of React Native's `RefreshControl` when your tab view has a collapsible header.

```tsx
import { RTVRefreshControl } from 'reanimated-tab-view';
```

## Props

`RTVRefreshControl` accepts all standard React Native `RefreshControlProps`:

| Prop | Type | Description |
|------|------|-------------|
| `refreshing` | `boolean` | Whether the refresh indicator is active. |
| `onRefresh` | `() => void` | Callback when a pull-to-refresh is triggered. |
| `colors` | `string[]` | Spinner colors (Android). |
| `tintColor` | `string` | Spinner color (iOS). |
| `title` | `string` | Title shown below the spinner (iOS). |
| ...and all other `RefreshControlProps` |

The `progressViewOffset` prop is automatically set based on the header and tab bar heights, so you don't need to provide it.

## Usage

```tsx
import { RTVScrollView, RTVRefreshControl } from 'reanimated-tab-view';

const MyTab = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  };

  return (
    <RTVScrollView
      refreshControl={
        <RTVRefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* content */}
    </RTVScrollView>
  );
};
```
