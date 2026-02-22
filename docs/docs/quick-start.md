---
sidebar_position: 2
---

# Quick Start

Here's a minimal example to get you started with Reanimated Tab View.

## Basic usage

```tsx
import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView } from 'reanimated-tab-view';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = ({ route }) => {
  switch (route.key) {
    case 'first':
      return <FirstRoute />;
    case 'second':
      return <SecondRoute />;
    default:
      return null;
  }
};

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ tabView: { width: layout.width } }}
    />
  );
}
```

## Key concepts

### Navigation state

The `navigationState` prop controls which tab is active and defines the available routes:

```tsx
const [index, setIndex] = React.useState(0);
const [routes] = React.useState([
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
  { key: 'third', title: 'Third' },
]);
```

Each route must have a unique `key` and an optional `title` displayed in the tab bar.

### Scene rendering

The `renderScene` function receives a `route` object and should return the component for that tab:

```tsx
const renderScene = ({ route }) => {
  switch (route.key) {
    case 'first':
      return <FirstRoute />;
    case 'second':
      return <SecondRoute />;
    default:
      return null;
  }
};
```

### Initial layout

Pass `initialLayout` to avoid layout jitter on first render:

```tsx
<TabView
  initialLayout={{ tabView: { width: layout.width } }}
  // ...other props
/>
```

## Next steps

- Learn about [collapsible headers](/docs/guides/scrollable/collapsible-headers)
- Explore [render modes](/docs/guides/render-modes) for performance optimization
- See the full [API reference](/docs/api/components/tab-view)
