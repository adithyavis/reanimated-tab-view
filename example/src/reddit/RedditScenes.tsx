import React from 'react';
import { StyleSheet, View, type ListRenderItem } from 'react-native';
import { RTVFlatList, RTVScrollView } from 'reanimated-tab-view';
import { AboutTab } from './AboutTab';
import { CommentCard } from './CommentCard';
import { FeedOptionsButton, SavedFilterButton } from './FeedControls';
import { PostCard } from './PostCard';
import { VisibilityBanner } from './VisibilityBanner';
import {
  comments,
  posts,
  savedPosts,
  type Comment,
  type Post,
} from './profile';
import { colors, metrics } from './theme';

const Separator = () => <View style={styles.separator} />;

const keyExtractor = (item: Post | Comment) => item.key;

const renderPost: ListRenderItem<Post> = ({ item }) => <PostCard post={item} />;

const renderComment: ListRenderItem<Comment> = ({ item }) => (
  <CommentCard comment={item} />
);

const PostsHeader = () => (
  <View style={styles.listHeader}>
    <FeedOptionsButton />
    <VisibilityBanner label="Showing all posts" expandable />
  </View>
);

const CommentsHeader = () => (
  <View style={styles.listHeader}>
    <VisibilityBanner label="Showing all comments" expandable />
  </View>
);

const SavedHeader = () => (
  <View style={styles.listHeader}>
    <SavedFilterButton />
    <VisibilityBanner label="Saved content is only visible to you" hidden />
  </View>
);

export const PostsScene = React.memo(function PostsScene() {
  return (
    <RTVFlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={keyExtractor}
      ListHeaderComponent={PostsHeader}
      ItemSeparatorComponent={Separator}
      showsVerticalScrollIndicator={false}
    />
  );
});

export const CommentsScene = React.memo(function CommentsScene() {
  return (
    <RTVFlatList
      data={comments}
      renderItem={renderComment}
      keyExtractor={keyExtractor}
      ListHeaderComponent={CommentsHeader}
      ItemSeparatorComponent={Separator}
      showsVerticalScrollIndicator={false}
    />
  );
});

export const SavedScene = React.memo(function SavedScene() {
  return (
    <RTVFlatList
      data={savedPosts}
      renderItem={renderPost}
      keyExtractor={keyExtractor}
      ListHeaderComponent={SavedHeader}
      ItemSeparatorComponent={Separator}
      showsVerticalScrollIndicator={false}
    />
  );
});

export const AboutScene = React.memo(function AboutScene() {
  return (
    <RTVScrollView showsVerticalScrollIndicator={false}>
      <AboutTab />
    </RTVScrollView>
  );
});

const styles = StyleSheet.create({
  listHeader: {
    gap: 12,
    paddingHorizontal: metrics.screenPadding,
    paddingTop: 12,
    paddingBottom: 4,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
  },
});
