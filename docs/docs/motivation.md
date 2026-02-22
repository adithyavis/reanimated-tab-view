---
sidebar_position: 3
---

# Motivation

## Why reanimated-tab-view?

1. The original [react-native-tab-view](https://github.com/satya164/react-native-tab-view) is an amazing package, no doubt. However, it is dependent on [`react-native-pager-view`](https://github.com/callstack/react-native-pager-view). This dependency complicates solving issues such as:

   - [`TabView tab index not really controlled`](https://github.com/react-navigation/react-navigation/issues/11412)
   - [`Tab label aligning vertically in some devices when render single tab.`](https://github.com/react-navigation/react-navigation/issues/11083)
   - [`Screen getting stuck when switching between the tabs while keyboard opened.`](https://github.com/react-navigation/react-navigation/issues/11301)

   reanimated-tab-view depends purely on react-native-reanimated, and as such, the above issues won't be encountered.

2. The swipe and jump-to behaviors are built from scratch using the animation and gesture primitives offered by react-native-reanimated and react-native-gesture-handler.

3. Many real apps like Instagram, X, Reddit and LinkedIn have tab views that support collapsible headers. The original react-native-tab-view doesn't provide this support. We consider it an anti-pattern for a tab view component to not have support for collapsible headers — so reanimated-tab-view has it built-in.
