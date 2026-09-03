---
sidebar_position: 5
---

# RTVFlashList

A [FlashList](https://shopify.github.io/flash-list/) that integrates with the tab view's collapsible header system. Use this instead of `FlashList` when using collapsible headers.

```tsx
import { RTVFlashList } from 'reanimated-tab-view';
```

## Installation

`@shopify/flash-list` is an **optional** peer dependency. Install it in your app to use `RTVFlashList`:

```bash
yarn add @shopify/flash-list
```

Version 2 or newer is required. If the package is not installed, rendering `RTVFlashList` throws an error that tells you to install it. Apps that never render `RTVFlashList` do not need the dependency at all.

## Props

`RTVFlashList<T>` accepts all `FlashListProps<T>` props, except `renderScrollComponent` and `maintainVisibleContentPosition`, which are set internally.

## Usage

```tsx
const ScrollableScene = () => (
  <RTVFlashList
    data={items}
    renderItem={({ item }) => <ItemCard item={item} />}
    keyExtractor={(item) => item.id}
  />
);
```

## Generic typing

`RTVFlashList` supports TypeScript generics for type-safe data:

```tsx
type Item = {
  id: string;
  title: string;
};

<RTVFlashList<Item>
  data={items}
  renderItem={({ item }) => <Text>{item.title}</Text>}
  keyExtractor={(item) => item.id}
/>
```

## How it works

`RTVFlashList` renders a `FlashList` whose scroll component is `RTVScrollView`, through FlashList's `renderScrollComponent` prop. This ensures scroll synchronization with the collapsible header works correctly.

FlashList measures its item container relative to the scroll view, so the padding that the collapsible header adds is accounted for automatically.

### Why maintainVisibleContentPosition is forced off

FlashList enables `maintainVisibleContentPosition` by default. Native MVCP anchors the scroll view to its first content subview and adds any movement of that subview back onto the content offset.

That subview is exactly the one `RTVScrollView` translates in order to collapse the header. So every header translation is read back as content movement and compensated for with extra scroll offset, which translates the header further - a feedback loop that collapses the header in a single jump on the smallest scroll, and syncs every unfocused scene to the fully collapsed offset.

`RTVFlashList` therefore passes `maintainVisibleContentPosition={{ disabled: true }}`, which also switches off FlashList's own JS offset correction (it is gated on the same flag). The trade-off: prepending items, or items resizing above the viewport, can shift the visible content. `RTVFlatList` is unaffected because `FlatList` leaves MVCP off unless you ask for it.

## Ref

You can get a `FlashListRef` to the underlying list:

```tsx
const listRef = React.useRef<FlashListRef<Item>>(null);

<RTVFlashList ref={listRef} data={items} renderItem={renderItem} />;

listRef.current?.scrollToIndex({ index: 10, animated: true });
```
