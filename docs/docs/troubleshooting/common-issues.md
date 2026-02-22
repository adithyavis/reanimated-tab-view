---
sidebar_position: 1
---

# Common Issues

## Layout jitter on initial render

**Symptom:** The tab view or header flickers/jitters when first rendered.

**Cause:** The component uses `onLayout` to measure dimensions asynchronously. Until measurements complete, the layout may shift.

**Solution:** Pass `initialLayout` with known dimensions:

```tsx
const layout = useWindowDimensions();

<TabView
  initialLayout={{
    tabView: { width: layout.width },
    tabViewHeader: { height: 200 }, // your header height
    tabBar: { height: 48 },
  }}
  // ...other props
/>
```

## GestureHandlerRootView missing

**Symptom:** Gestures don't work, swipe between tabs fails, or you see a gesture handler error.

**Solution:** Wrap your app root with `GestureHandlerRootView`:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app */}
    </GestureHandlerRootView>
  );
}
```

## Collapsible header not collapsing

**Symptom:** The header is visible but does not collapse when scrolling.

**Cause:** You're using standard `ScrollView` or `FlatList` instead of the provided components.

**Solution:** Use `RTVScrollView` or `RTVFlatList` inside your scenes:

```tsx
import { RTVScrollView } from 'reanimated-tab-view';

// Use RTVScrollView instead of ScrollView
const MyTab = () => (
  <RTVScrollView>
    {/* content */}
  </RTVScrollView>
);
```

## Keyboard blocks content on swipe

**Symptom:** The keyboard stays open when swiping between tabs.

**Solution:** Use the `keyboardDismissMode` prop:

```tsx
<TabView
  keyboardDismissMode="on-drag" // Dismiss keyboard when swiping
  // ...other props
/>
```

Available modes:
- `'auto'` (default) - Automatically dismisses keyboard
- `'on-drag'` - Dismisses when the user starts swiping
- `'none'` - Never auto-dismiss

## Blank flash when jumping to distant tabs

**Symptom:** Brief blank content when tapping on a tab far from the current one.

**Cause:** With `renderMode="lazy"` or `"windowed"`, distant scenes may not be rendered yet.

**Solution:** Use `jumpMode="smooth"` (the default):

```tsx
<TabView
  renderMode="lazy"
  jumpMode="smooth" // Prevents blank flash
  // ...other props
/>
```
