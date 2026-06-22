"use client";

import { useCallback, useState } from "react";
import type { SocialPost } from "@/lib/social/types";

export function usePostCommentsSheet() {
  const [commentPost, setCommentPost] = useState<SocialPost | null>(null);

  const openComments = useCallback((post: SocialPost) => {
    setCommentPost(post);
  }, []);

  const closeComments = useCallback(() => {
    setCommentPost(null);
  }, []);

  return { commentPost, openComments, closeComments };
}
