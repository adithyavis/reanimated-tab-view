import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import { EyeIcon, UpvoteIcon } from './assets/RedditIcons';
import type { Comment } from './profile';
import { colors, metrics } from './theme';

type CommentCardProps = {
  comment: Comment;
};

export const CommentCard = React.memo<CommentCardProps>(function CommentCard({
  comment,
}) {
  return (
    <View style={styles.card}>
      <CustomText style={styles.postTitle} numberOfLines={1}>
        {comment.postTitle}
      </CustomText>

      <View style={styles.metaRow}>
        {comment.subreddit ? (
          <CustomText style={styles.subreddit}>{comment.subreddit}</CustomText>
        ) : null}
        <CustomText style={styles.meta}>• {comment.age} •</CustomText>
        <UpvoteIcon size={12} strokeWidth={2.2} color={colors.orange} />
        <CustomText style={styles.meta}>{comment.score}</CustomText>
      </View>

      <CustomText style={styles.body} numberOfLines={2}>
        {comment.body}
      </CustomText>

      <View style={styles.footer}>
        <View style={styles.views}>
          <EyeIcon size={17} color={colors.textSecondary} />
          <CustomText style={styles.meta}>{comment.views}</CustomText>
        </View>
        <Pressable hitSlop={8}>
          <CustomText style={styles.insights}>See More Insights</CustomText>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: metrics.screenPadding,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 6,
  },
  postTitle: {
    fontSize: 16,
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subreddit: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  body: {
    fontSize: 15,
    lineHeight: 21,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  views: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  insights: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.link,
  },
});
