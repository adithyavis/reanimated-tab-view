import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import {
  CommentIcon,
  DownvoteIcon,
  OverflowIcon,
  RepostIcon,
  ShareIcon,
  UpvoteIcon,
} from './assets/RedditIcons';
import { SubredditIcon } from './assets/SubredditIcon';
import type { Post } from './profile';
import { colors, metrics } from './theme';

type PostCardProps = {
  post: Post;
};

export const PostCard = React.memo<PostCardProps>(function PostCard({ post }) {
  const imageSource = useMemo(
    () =>
      post.imageId
        ? { uri: `https://picsum.photos/id/${post.imageId}/800/600` }
        : undefined,
    [post.imageId]
  );

  return (
    <View style={styles.card}>
      <View style={styles.metaRow}>
        <SubredditIcon subreddit={post.subreddit} size={20} />
        <CustomText style={styles.subreddit}>{post.subreddit}</CustomText>
        <CustomText style={styles.meta}>{post.age}</CustomText>
        {post.views ? (
          <CustomText style={styles.meta}>• {post.views}</CustomText>
        ) : null}
        <View style={styles.spacer} />
        <Pressable hitSlop={8}>
          <OverflowIcon size={18} color={colors.textSecondary} />
        </Pressable>
      </View>

      <CustomText style={styles.title}>{post.title}</CustomText>

      {post.body ? (
        <CustomText style={styles.body} numberOfLines={4}>
          {post.body}
        </CustomText>
      ) : null}

      {post.quote ? (
        <View style={styles.quote}>
          <CustomText style={styles.quoteText} numberOfLines={9}>
            {post.quote}
          </CustomText>
        </View>
      ) : null}

      {imageSource ? (
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      ) : null}

      <View style={styles.actions}>
        <View style={styles.pill}>
          <UpvoteIcon
            size={18}
            color={post.upvoted ? colors.orange : colors.textSecondary}
          />
          <CustomText style={styles.count}>{post.score}</CustomText>
          <DownvoteIcon size={18} color={colors.textSecondary} />
        </View>
        <View style={styles.pill}>
          <CommentIcon size={17} color={colors.textSecondary} />
          <CustomText style={styles.count}>{post.comments}</CustomText>
        </View>
        <View style={styles.spacer} />
        <View style={styles.iconPill}>
          <RepostIcon size={17} color={colors.textSecondary} />
        </View>
        <View style={styles.iconPill}>
          <ShareIcon size={17} color={colors.textSecondary} />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: metrics.screenPadding,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  subreddit: {
    fontSize: 13,
    fontWeight: '600',
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  spacer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  quote: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: metrics.cardRadius,
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  quoteText: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: metrics.cardRadius,
    backgroundColor: colors.surface,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  iconPill: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  count: {
    fontSize: 13,
    fontWeight: '600',
  },
});
