---
sidebar_position: 6
---

# Scrollable Content

When using collapsible headers, you must use the provided scroll components instead of the standard React Native ones. This ensures scroll positions are synchronized across tabs and the header collapses correctly.

## RTVScrollView

Use `RTVScrollView` as a drop-in replacement for `ScrollView`:

```tsx
import { RTVScrollView } from 'reanimated-tab-view';

const MyTab = () => (
  <RTVScrollView>
    <View style={{ padding: 16 }}>
      <Text>Scrollable content here</Text>
    </View>
  </RTVScrollView>
);
```

`RTVScrollView` accepts all standard `ScrollView` props.

## RTVFlatList

Use `RTVFlatList` as a drop-in replacement for `FlatList`:

```tsx
import { RTVFlatList } from 'reanimated-tab-view';

const MyTab = () => (
  <RTVFlatList
    data={items}
    renderItem={({ item }) => <ItemCard item={item} />}
    keyExtractor={(item) => item.id}
    numColumns={3}
  />
);
```

`RTVFlatList` accepts all standard `FlatList<T>` props and supports generic typing:

```tsx
type Item = { id: string; title: string };

<RTVFlatList<Item>
  data={items}
  renderItem={({ item }) => <Text>{item.title}</Text>}
/>
```

## RTVFlashList and RTVLegendList

If your scenes render [FlashList](https://shopify.github.io/flash-list/) or [Legend List](https://www.legendapp.com/open-source/list/) instead of `FlatList`, use `RTVFlashList` or `RTVLegendList`:

```tsx
import { RTVFlashList, RTVLegendList } from 'reanimated-tab-view';

const MyFlashListTab = () => (
  <RTVFlashList
    data={items}
    renderItem={({ item }) => <ItemCard item={item} />}
    keyExtractor={(item) => item.id}
  />
);

const MyLegendListTab = () => (
  <RTVLegendList
    data={items}
    renderItem={({ item }) => <ItemCard item={item} />}
    keyExtractor={(item) => item.id}
    recycleItems
  />
);
```

Both accept every prop of the list they wrap, and both support generic typing the same way `RTVFlatList` does.

`@shopify/flash-list` (v2+) and `@legendapp/list` (v3+) are **optional** peer dependencies. Install whichever one you use; you do not need either if your scenes only use `RTVScrollView` or `RTVFlatList`. Rendering `RTVFlashList` or `RTVLegendList` without its package installed throws an error telling you which package to add.

## When to use these components

| Scenario | Component to use |
|----------|-----------------|
| Tab view **with** collapsible header | `RTVScrollView`, `RTVFlatList`, `RTVFlashList` or `RTVLegendList` (required) |
| Tab view **without** collapsible header | Standard `ScrollView`, `FlatList`, `FlashList` or `LegendList` (works fine) |

## Scroll event handlers

All of the `RTV*` scrollable components support scroll event callbacks:

```tsx
<RTVScrollView
  onScroll={handleScroll}
  onScrollBeginDrag={handleBeginDrag}
  onScrollEndDrag={handleEndDrag}
  onMomentumScrollBegin={handleMomentumBegin}
  onMomentumScrollEnd={handleMomentumEnd}
>
  {/* content */}
</RTVScrollView>
```

These handlers are intercepted internally to manage header collapsing, but your callbacks are still invoked.
