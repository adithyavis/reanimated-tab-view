---
sidebar_position: 6
---

# useRefreshControl

A hook that returns the correct `progressViewOffset` for use with a standard `RefreshControl` inside a collapsible header tab view.

```tsx
import { useRefreshControl } from 'reanimated-tab-view';
```

## Return value

| Property | Type | Description |
|----------|------|-------------|
| `progressViewOffset` | `number` | The offset needed for the refresh indicator to appear below the header and tab bar. |

## Usage

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

## When to use

- Use this hook when you need custom `RefreshControl` behavior but still need the correct offset for collapsible headers.
- If you don't need customization, use [`RTVRefreshControl`](/docs/api/components/scrollable/rtv-refresh-control) instead, which handles this automatically.

## Context requirement

This hook must be called within a component rendered inside a `TabView` (as part of `renderScene`), as it reads header and tab bar dimensions from the internal context.
