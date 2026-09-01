---
sidebar_position: 7
---

# Refresh Control

Reanimated Tab View provides `RTVRefreshControl` and the `useRefreshControl` hook to add pull-to-refresh functionality that works correctly with collapsible headers.

## Using RTVRefreshControl

`RTVRefreshControl` is a drop-in replacement for React Native's `RefreshControl` that automatically handles the `progressViewOffset` needed for collapsible headers:

```tsx
import { RTVScrollView, RTVRefreshControl } from 'reanimated-tab-view';

const MyTab = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

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

## Using the useRefreshControl hook

If you need more control, use the `useRefreshControl` hook to get the correct `progressViewOffset` and apply it to a standard `RefreshControl`:

```tsx
import { RefreshControl } from 'react-native';
import { RTVScrollView, useRefreshControl } from 'reanimated-tab-view';

const MyTab = () => {
  const { progressViewOffset } = useRefreshControl();
  const [refreshing, setRefreshing] = React.useState(false);

  return (
    <RTVScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={progressViewOffset}
        />
      }
    >
      {/* content */}
    </RTVScrollView>
  );
};
```

The `progressViewOffset` value accounts for the header and tab bar heights so the refresh indicator appears in the correct position.

## Without collapsible headers

If you're not using collapsible headers, you can use the standard React Native `RefreshControl` directly without needing `RTVRefreshControl` or `useRefreshControl`.
