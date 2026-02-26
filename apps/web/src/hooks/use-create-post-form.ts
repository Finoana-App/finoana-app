import { useCallback, useState } from 'react';

import { PostType } from '@workspace/types';

import { useCreatePost } from '@/lib/hooks/use-post';

const INITIAL_FORM_STATE = {
  content: '',
  category: PostType.GENERAL,
  isAnonymous: false,
} as const;

export const MAX_IMAGES = 5;

export function useCreatePostForm(onClose: () => void) {
  const [content, setContent] = useState<string>(INITIAL_FORM_STATE.content);
  const [category, setCategory] = useState<PostType>(INITIAL_FORM_STATE.category);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(INITIAL_FORM_STATE.isAnonymous);
  const [files, setFiles] = useState<File[]>([]);

  const { mutate: createPost, isPending } = useCreatePost();

  const reset = useCallback(() => {
    setContent(INITIAL_FORM_STATE.content);
    setCategory(INITIAL_FORM_STATE.category);
    setIsAnonymous(INITIAL_FORM_STATE.isAnonymous);
    setFiles([]);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const toggleAnonymous = useCallback(() => {
    setIsAnonymous((prev) => !prev);
  }, []);

  const handleFilesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    setFiles((prev) => {
      const merged = [...prev, ...selected];
      return merged.slice(0, MAX_IMAGES);
    });
    e.target.value = '';
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!content.trim()) return;

    const formData = new FormData();
    formData.append('content', content);
    formData.append('postType', category);
    formData.append('isAnonymous', String(isAnonymous));
    files.forEach((file) => formData.append('images', file));

    createPost(formData, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  }, [content, category, isAnonymous, files, createPost, reset, onClose]);

  return {
    content,
    category,
    files,
    isPending,
    isAnonymous,
    setContent,
    setCategory,
    toggleAnonymous,
    handleClose,
    handleFilesChange,
    handleRemoveFile,
    handleSubmit,
  };
}
