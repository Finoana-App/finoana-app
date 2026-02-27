'use client';

import Image from 'next/image';

interface MediaPreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

export function MediaPreview({ files, onRemove }: Readonly<MediaPreviewProps>) {
  if (files.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {files.map((file, index) => (
        <div key={`${file.name}-${index}`} className="group relative h-20 w-20 overflow-hidden rounded-lg">
          <Image
            src={URL.createObjectURL(file)}
            width={80}
            height={80}
            alt={file.name}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
            aria-label={`Remove ${file.name}`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
