---
sidebar_position: 2
---

# Render Modes

Reanimated Tab View supports three render modes to control how tab scenes are rendered. Choose the mode that best fits your performance requirements.

## Available modes

Set the render mode using the `renderMode` prop:

```tsx
<TabView
  renderMode="windowed"
  // ...other props
/>
```

### `"all"` (default)

Renders all scenes at once during the initial mount.

- **Best for:** Small number of tabs (2-4) with lightweight content
- **Trade-off:** Higher initial render cost, but instant tab switching

```tsx
<TabView renderMode="all" />
```

### `"windowed"`

Renders a window of scenes: the current scene plus its immediate neighbors.

- **Best for:** Many tabs where individual scene render cost is low
- **Trade-off:** Scenes outside the window are unmounted, but adjacent tabs are always ready

```tsx
<TabView renderMode="windowed" />
```

### `"lazy"`

Renders scenes only when they are first navigated to.

- **Best for:** Many tabs with expensive-to-render content
- **Trade-off:** First visit to a tab may show a brief loading state

```tsx
<TabView renderMode="lazy" />
```

## Comparison

| Mode | Initial render | Tab switch speed | Memory usage |
|------|---------------|-----------------|--------------|
| `all` | Slowest (renders everything) | Instant | Highest |
| `windowed` | Fast (renders 3 scenes) | Fast for adjacent tabs | Medium |
| `lazy` | Fastest (renders 1 scene) | May have delay on first visit | Lowest |

## Interaction with jump modes

When using `"lazy"` or `"windowed"` mode, jumping to a distant tab may briefly show blank content if the target scene hasn't been rendered yet. To avoid this, use `jumpMode="smooth"` (the default), which smoothly animates to the target without exposing unrendered scenes.

See [Jump Modes](/docs/guides/jump-modes) for more details.
