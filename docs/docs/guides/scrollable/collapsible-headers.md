---
sidebar_position: 1
---

# Collapsible Headers

Reanimated Tab View supports collapsible headers that smoothly collapse as the user scrolls content within any tab. This is a common pattern seen in apps like Instagram profiles.

## Basic setup

To add a collapsible header, use the `renderHeader` prop along with `RTVScrollView` or `RTVFlatList` inside your scenes:

```tsx
import { TabView, RTVScrollView } from 'reanimated-tab-view';

function MyTabView() {
  const renderHeader = ({ collapsedPercentage, collapsedHeaderHeight }) => (
    <View style={{ height: 200 }}>
      <Text>Profile Header</Text>
    </View>
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'posts':
        return (
          <RTVScrollView>
            {/* Your scrollable content */}
          </RTVScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderHeader={renderHeader}
      onIndexChange={setIndex}
      initialLayout={{
        tabView: { width: layout.width },
        tabViewHeader: { height: 200 },
      }}
    />
  );
}
```

## Header renderer props

The `renderHeader` callback receives `HeaderRendererProps`:

| Prop | Type | Description |
|------|------|-------------|
| `collapsedPercentage` | `SharedValue<number>` | Animated value from 0 (expanded) to 1 (fully collapsed) |
| `collapsedHeaderHeight` | `SharedValue<number>` | Animated value representing the current collapsed height |

You can use these shared values to create animated header effects:

```tsx
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';

const renderHeader = ({ collapsedPercentage }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(collapsedPercentage.value, [0, 1], [1, 0]),
  }));

  return (
    <Animated.View style={[{ height: 200 }, animatedStyle]}>
      <Text>This fades as you scroll</Text>
    </Animated.View>
  );
};
```

## Using with RTVScrollView

You **must** use `RTVScrollView` instead of the standard `ScrollView` for collapsible headers to work. `RTVScrollView` handles scroll synchronization across tabs:

```tsx
import { RTVScrollView } from 'reanimated-tab-view';

const PostsTab = () => (
  <RTVScrollView>
    {posts.map((post) => (
      <PostCard key={post.id} post={post} />
    ))}
  </RTVScrollView>
);
```

## Using with RTVFlatList

For list-based content, use `RTVFlatList` instead of `FlatList`:

```tsx
import { RTVFlatList } from 'reanimated-tab-view';

const PostsTab = () => (
  <RTVFlatList
    data={posts}
    renderItem={({ item }) => <PostCard post={item} />}
    keyExtractor={(item) => item.id}
  />
);
```

## Reducing initial jitter

Pass `initialLayout` with `tabViewHeader` dimensions to avoid layout jitter during the first render:

```tsx
<TabView
  initialLayout={{
    tabView: { width: screenWidth },
    tabViewHeader: { width: screenWidth, height: 200 },
  }}
  // ...other props
/>
```

## Platform support

Collapsible headers are currently supported on **iOS** and **Android**.
