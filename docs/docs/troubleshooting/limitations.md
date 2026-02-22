---
sidebar_position: 2
---

# Limitations

## Asynchronous layout measurement

This library uses `onLayout` to measure the dimensions of the header, tab bar, and tab view. Since these measurements happen asynchronously, you may see layout jitter during the initial render.

**Workaround:** Pass accurate values to the `initialLayout` prop to eliminate jitter:

```tsx
<TabView
  initialLayout={{
    tabView: { width: screenWidth, height: screenHeight },
    tabViewHeader: { width: screenWidth, height: headerHeight },
    tabBar: { width: screenWidth, height: 48 },
  }}
/>
```

## Web support

Collapsible headers are currently supported on **iOS** and **Android** only. Basic tab view functionality (swiping, tab bar, scene rendering) works on web.

## Upcoming features

The following features are planned but not yet available:

- **Accessibility** - Full accessibility support for screen readers
- **RTL support** - Right-to-left layout support
