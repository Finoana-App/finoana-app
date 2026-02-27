'use client';

import { useRef } from 'react';

import { Image as ImageIcon, Loader2, Send } from 'lucide-react';

import { Button } from '@workspace/ui/components/button';

import { MAX_IMAGES } from '@/hooks/use-create-post-form';

import { ACCEPTED_IMAGE_TYPES } from './constants';

interface PostToolbarProps {
  cancelLabel: string;
  shareLabel: string;
  isSubmitDisabled: boolean;
  isPending: boolean;
  fileCount: number;
  onFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export function PostToolbar({
  cancelLabel,
  shareLabel,
  isSubmitDisabled,
  isPending,
  fileCount,
  onFilesChange,
  onCancel,
  onSubmit,
}: Readonly<PostToolbarProps>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canAddMore = fileCount < MAX_IMAGES;

  return (
    <div className="border-border/50 mt-6 flex items-center justify-between border-t pt-4">
      <div className="flex gap-1">
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES}
          multiple
          className="hidden"
          onChange={onFilesChange}
          disabled={!canAddMore}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Add image"
          disabled={!canAddMore}
          onClick={() => fileInputRef.current?.click()}
          className="text-primary hover:bg-primary/10 relative h-9 w-9"
        >
          <ImageIcon className="h-4 w-4" />
          {fileCount > 0 && (
            <span className="bg-primary text-primary-foreground absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
              {fileCount}
            </span>
          )}
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={onCancel} className="cursor-pointer font-medium">
          {cancelLabel}
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer gap-2 font-medium"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {shareLabel}
        </Button>
      </div>
    </div>
  );
}
