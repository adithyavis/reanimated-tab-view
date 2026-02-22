---
sidebar_position: 4
---

# RTVFlatList

A flat list component that integrates with the tab view's collapsible header system. Use this instead of React Native's `FlatList` when using collapsible headers.

```tsx
import { RTVFlatList } from 'reanimated-tab-view';
```

## Props

`RTVFlatList<T>` accepts all standard React Native `FlatList<T>` props including:

- `data`
- `renderItem`
- `keyExtractor`
- `numColumns`
- `onScroll`
- `onScrollBeginDrag`
- `onScrollEndDrag`
- `onMomentumScrollBegin`
- `onMomentumScrollEnd`
- `refreshControl`
- All other `FlatList` props

## Usage

```tsx
const MyTab = () => (
  <RTVFlatList
    data={items}
    renderItem={({ item }) => <ItemCard item={item} />}
    keyExtractor={(item) => item.id}
  />
);
```

## Generic typing

`RTVFlatList` supports TypeScript generics for type-safe data:

```tsx
type Item = {
  id: string;
  title: string;
};

<RTVFlatList<Item>
  data={items}
  renderItem={({ item }) => <Text>{item.title}</Text>}
  keyExtractor={(item) => item.id}
/>
```

## How it works

`RTVFlatList` wraps `Animated.FlatList` from Reanimated and uses `RTVScrollView` internally as its scroll component. This ensures scroll synchronization with the collapsible header works correctly.

## Ref

You can get a ref to the underlying `Animated.FlatList`:

```tsx
const flatListRef = React.useRef(null);

<RTVFlatList ref={flatListRef} data={items} renderItem={renderItem} />
```
