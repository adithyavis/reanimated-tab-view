---
sidebar_position: 6
---

# RTVLegendList

A [Legend List](https://www.legendapp.com/open-source/list/) that integrates with the tab view's collapsible header system. Use this instead of `LegendList` when using collapsible headers.

```tsx
import { RTVLegendList } from 'reanimated-tab-view';
```

## Installation

`@legendapp/list` is an **optional** peer dependency. Install it in your app to use `RTVLegendList`:

```bash
yarn add @legendapp/list
```

Version 3 or newer is required, because `RTVLegendList` imports from the `@legendapp/list/react-native` entry point. If the package is not installed, rendering `RTVLegendList` throws an error that tells you to install it. Apps that never render `RTVLegendList` do not need the dependency at all.

## Props

`RTVLegendList<T>` accepts all `LegendListProps<T>` props, except `renderScrollComponent` and `maintainVisibleContentPosition`, which are set internally.

## Usage

```tsx
const ScrollableScene = () => (
  <RTVLegendList
    data={items}
    renderItem={({ item }) => <ItemCard item={item} />}
    keyExtractor={(item) => item.id}
    recycleItems
  />
);
```

## Generic typing

`RTVLegendList` supports TypeScript generics for type-safe data:

```tsx
type Item = {
  id: string;
  title: string;
};

<RTVLegendList<Item>
  data={items}
  renderItem={({ item }) => <Text>{item.title}</Text>}
  keyExtractor={(item) => item.id}
/>
```

## How it works

`RTVLegendList` renders a `LegendList` whose scroll component is `RTVScrollView`, through Legend List's `renderScrollComponent` prop. This ensures scroll synchronization with the collapsible header works correctly.

### Why maintainVisibleContentPosition is forced off

Legend List enables `maintainVisibleContentPosition` by default (`{ data: false, size: true }`). Native MVCP anchors the scroll view to its first content subview and adds any movement of that subview back onto the content offset.

That subview is exactly the one `RTVScrollView` translates in order to collapse the header. So every header translation is read back as content movement and compensated for with extra scroll offset, which translates the header further - a feedback loop that collapses the header in a single jump on the smallest scroll, and syncs every unfocused scene to the fully collapsed offset.

`RTVLegendList` therefore passes `maintainVisibleContentPosition={false}`. The trade-off: items that resize above the viewport can shift the visible content. `RTVFlatList` is unaffected because `FlatList` leaves MVCP off unless you ask for it.

## Ref

You can get a `LegendListRef` to the underlying list:

```tsx
const listRef = React.useRef<LegendListRef>(null);

<RTVLegendList ref={listRef} data={items} renderItem={renderItem} />;

listRef.current?.scrollToIndex({ index: 10, animated: true });
```
