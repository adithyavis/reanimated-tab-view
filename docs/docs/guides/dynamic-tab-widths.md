---
sidebar_position: 4
---

# Dynamic Tab Widths

Reanimated Tab View can automatically adjust tab widths based on the length of the tab title, following the Material Design specification.

## Enabling dynamic widths

Dynamic tab widths are controlled via the `tabBarConfig` prop:

```tsx
<TabView
  tabBarConfig={{
    tabBarDynamicWidthEnabled: true,
  }}
  // ...other props
/>
```

## Default behavior

- **Primary tab bar** (`tabBarType: 'primary'`): Dynamic widths are **enabled** by default
- **Secondary tab bar** (`tabBarType: 'secondary'`): Dynamic widths are **disabled** by default

```tsx
// Dynamic widths are automatically enabled for primary tab bars
<TabView
  tabBarConfig={{
    tabBarType: 'primary',
  }}
/>

// Explicitly enable for secondary tab bars
<TabView
  tabBarConfig={{
    tabBarType: 'secondary',
    tabBarDynamicWidthEnabled: true,
  }}
/>
```

## Fixed tab widths

When dynamic widths are disabled and `tabBarScrollEnabled` is true, each tab uses the `scrollableTabWidth` value:

```tsx
<TabView
  tabBarConfig={{
    tabBarScrollEnabled: true,
    tabBarDynamicWidthEnabled: false,
    scrollableTabWidth: 120, // Each tab will be 120px wide
  }}
/>
```

The default `scrollableTabWidth` is `100`.
