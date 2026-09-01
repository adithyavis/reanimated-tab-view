---
sidebar_position: 3
---

# Jump Modes

Jump modes control the animation behavior when users tap on a tab to navigate directly to it (as opposed to swiping).

## Available modes

Set the jump mode using the `jumpMode` prop:

```tsx
<TabView
  jumpMode="smooth"
  // ...other props
/>
```

### `"smooth"` (default)

Smoothly animates from the current tab to the target tab without scrolling through intermediate scenes. This prevents blank flashes when using `"lazy"` or `"windowed"` render modes.

```tsx
<TabView jumpMode="smooth" />
```

### `"scrolling"`

Scrolls through all intermediate scenes when jumping. For example, jumping from tab 1 to tab 4 will visually scroll through tabs 2 and 3. If those scenes haven't been rendered yet (in lazy/windowed mode), you may see blank content briefly.

```tsx
<TabView jumpMode="scrolling" />
```

### `"no-animation"`

Instantly switches to the target tab with no animation. Useful when you want immediate tab changes.

```tsx
<TabView jumpMode="no-animation" />
```

## Comparison

| Mode | Animation | Shows intermediate scenes | Blank flash risk |
|------|-----------|--------------------------|-----------------|
| `smooth` | Fade/slide | No | None |
| `scrolling` | Scroll through | Yes | With lazy/windowed |
| `no-animation` | None | No | None |

## Programmatic jumping

You can also trigger jumps programmatically using the `jumpTo` ref method:

```tsx
const tabViewRef = React.useRef(null);

// Jump to a specific tab
tabViewRef.current?.jumpTo('settings');

return (
  <TabView
    ref={tabViewRef}
    jumpMode="smooth"
    // ...other props
  />
);
```
