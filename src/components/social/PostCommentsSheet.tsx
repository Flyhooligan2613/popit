"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  addPostComment,
  formatCount,
  formatTimeAgo,
  getCommentsForPost,
  toggleCommentLike,
} from "@/lib/social/socialStore";
import { loadUserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent } from "@/lib/identity/types";
import { SOCIAL_UPDATE_EVENT } from "@/lib/social/socialStore";
import type { PostComment, SocialPost } from "@/lib/social/types";

type PostCommentsSheetProps = {
  post: SocialPost | null;
  onClose: () => void;
};

export default function PostCommentsSheet({ post, onClose }: PostCommentsSheetProps) {
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<PostComment | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const refresh = () => setTick((n) => n + 1);
    window.addEventListener(SOCIAL_UPDATE_EVENT, refresh);
    return () => window.removeEventListener(SOCIAL_UPDATE_EVENT, refresh);
  }, []);

  useEffect(() => {
    if (!post) {
      setDraft("");
      setReplyTo(null);
    }
  }, [post]);

  const comments = useMemo(
    () => (post ? getCommentsForPost(post.id) : []),
    [post, tick]
  );

  const topLevel = comments.filter((c) => !c.parentId);
  const repliesFor = (parentId: string) => comments.filter((c) => c.parentId === parentId);

  const submit = async () => {
    if (!post || !draft.trim()) return;
    const user = await loadUserProfile();
    addPostComment({
      postId: post.id,
      text: draft,
      authorUsername: user.username,
      authorName: user.name,
      authorAccent: getIdentityAccent(user.identity),
      parentId: replyTo?.id,
    });
    setDraft("");
    setReplyTo(null);
    setTick((n) => n + 1);
  };

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="social-sheet-backdrop"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="social-sheet post-comments-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="social-sheet__head">
              <div>
                <h2 className="social-sheet__title">Comments</h2>
                <p className="social-sheet__subtitle">
                  {formatCount(post.comments)} on @{post.authorUsername}&apos;s post
                </p>
              </div>
              <button type="button" className="social-sheet__close" onClick={onClose} aria-label="Close">
                ×
              </button>
            </div>

            <div className="post-comments-sheet__list">
              {topLevel.length === 0 && (
                <p className="post-comments-sheet__empty">Be the first to comment.</p>
              )}
              {topLevel.map((comment) => (
                <div key={comment.id} className="post-comments-sheet__thread">
                  <CommentRow
                    comment={comment}
                    onLike={() => {
                      toggleCommentLike(post.id, comment.id);
                      setTick((n) => n + 1);
                    }}
                    onReply={() => setReplyTo(comment)}
                  />
                  {repliesFor(comment.id).map((reply) => (
                    <div key={reply.id} className="post-comments-sheet__reply">
                      <CommentRow
                        comment={reply}
                        onLike={() => {
                          toggleCommentLike(post.id, reply.id);
                          setTick((n) => n + 1);
                        }}
                        onReply={() => setReplyTo(reply)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {replyTo && (
              <p className="post-comments-sheet__replying">
                Replying to @{replyTo.authorUsername}
                <button type="button" onClick={() => setReplyTo(null)}>
                  Cancel
                </button>
              </p>
            )}

            <div className="post-comments-sheet__composer">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={replyTo ? "Write a reply…" : "Add a comment…"}
                className="post-comments-sheet__input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") void submit();
                }}
              />
              <button type="button" className="post-comments-sheet__send" onClick={() => void submit()}>
                Post
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CommentRow({
  comment,
  onLike,
  onReply,
}: {
  comment: PostComment;
  onLike: () => void;
  onReply: () => void;
}) {
  return (
    <article className="post-comments-sheet__comment">
      <div className="post-comments-sheet__comment-head">
        <Link href={`/profile/${comment.authorUsername}`} className="post-comments-sheet__author">
          @{comment.authorUsername}
        </Link>
        <span className="post-comments-sheet__time">{formatTimeAgo(comment.createdAt)}</span>
      </div>
      <p className="post-comments-sheet__text">{comment.text}</p>
      <div className="post-comments-sheet__actions">
        <button
          type="button"
          className={comment.liked ? "is-active" : ""}
          onClick={onLike}
        >
          {comment.liked ? "❤️" : "🤍"} {formatCount(comment.likes)}
        </button>
        <button type="button" onClick={onReply}>
          Reply
        </button>
      </div>
    </article>
  );
}
