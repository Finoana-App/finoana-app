import { useCreatePost } from "@/lib/hooks/use-post";
import { PostType } from "@workspace/types";
import { useCallback, useState } from "react";

const INITIAL_FORM_STATE = {
  content: '',
  category: PostType.GENERAL,
} as const;

export function useCreatePostForm(onClose: () => void) {
  const [content, setContent] = useState<string>(INITIAL_FORM_STATE.content);
  const [category, setCategory] = useState<PostType>(INITIAL_FORM_STATE.category);

  const { mutate: createPost, isPending } = useCreatePost();

  const reset = useCallback(() => {
    setContent(INITIAL_FORM_STATE.content);
    setCategory(INITIAL_FORM_STATE.category);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleSubmit = useCallback(() => {
    if (!content.trim()) return;

    createPost(
      { content, postType: category, isAnonymous: false },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  }, [content, category, createPost, reset, onClose]);

  return {
    content,
    category,
    isPending,
    setContent,
    setCategory,
    handleClose,
    handleSubmit,
  };
}