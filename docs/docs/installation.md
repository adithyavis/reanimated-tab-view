---
sidebar_position: 1
---

# Installation

## Prerequisites

Reanimated Tab View requires the following peer dependencies:

- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) (>= 4.0.0)
- [react-native-worklets](https://docs.swmansion.com/react-native-worklets/) (>= 0.4.0)
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) (>= 2.9.0)

Reanimated 4 runs on the New Architecture only, so your app must have it enabled.

Make sure you have them installed and configured in your project before proceeding. Follow the official installation guides:

- [React Native Reanimated installation](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)
- [React Native Gesture Handler installation](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation)

## Optional peer dependencies

These are only needed if you render the matching component inside a scene:

| Package | Version | Needed for |
|---------|---------|------------|
| [@shopify/flash-list](https://shopify.github.io/flash-list/) | >= 2.0.0 | [`RTVFlashList`](./api/components/scrollable/rtv-flash-list.md) |
| [@legendapp/list](https://www.legendapp.com/open-source/list/) | >= 3.0.0 | [`RTVLegendList`](./api/components/scrollable/rtv-legend-list.md) |

Leaving them out is fine: your app still bundles, and only the component you did not install is unavailable.

## Install the package

```bash
yarn add reanimated-tab-view
```

Or using npm:

```bash
npm install reanimated-tab-view
```

## Wrap your app with GestureHandlerRootView

Ensure your app is wrapped with `GestureHandlerRootView` from `react-native-gesture-handler`:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app content */}
    </GestureHandlerRootView>
  );
}
```

## Platform support

| Platform | Supported |
|----------|-----------|
| iOS      | Yes       |
| Android  | Yes       |
| Web      | Partial   |

Collapsible headers are supported on iOS and Android.
