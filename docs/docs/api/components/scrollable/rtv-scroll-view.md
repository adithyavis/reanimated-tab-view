---
sidebar_position: 3
---

# RTVScrollView

A scroll view component that integrates with the tab view's collapsible header system. Use this instead of React Native's `ScrollView` when using collapsible headers.

```tsx
import { RTVScrollView } from 'reanimated-tab-view';
```

## Props

`RTVScrollView` accepts all standard React Native `ScrollView` props including:

- `onScroll`
- `onScrollBeginDrag`
- `onScrollEndDrag`
- `onMomentumScrollBegin`
- `onMomentumScrollEnd`
- `refreshControl`
- `contentContainerStyle`
- All other `ScrollView` props

## Usage

```tsx
const ScrollableScene = () => (
  <RTVScrollView contentContainerStyle={{ padding: 16 }}>
    <Text>Your scrollable content</Text>
  </RTVScrollView>
);
```

## How it works

`RTVScrollView` wraps `Animated.ScrollView` from Reanimated and:

1. Synchronizes scroll position with the collapsible header
2. Manages content container padding to account for header and tab bar heights
3. Intercepts scroll events to coordinate header collapse/expand behavior
4. Supports refs via `React.forwardRef`

## Ref

You can get a ref to the underlying `Animated.ScrollView`:

```tsx
const scrollRef = React.useRef(null);

<RTVScrollView ref={scrollRef}>
  {/* content */}
</RTVScrollView>
```
