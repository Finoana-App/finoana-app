'use client';

import { ChangeEvent, SubmitEvent, useRef, useState } from 'react';

import Image from 'next/image';

import { Camera } from 'lucide-react';

import { PrivacyLevel, UpdateProfileInput } from '@workspace/types';
import { Avatar, AvatarFallback } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Textarea } from '@workspace/ui/components/textarea';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: UpdateProfileInput;
  onSubmit?: (data: { displayName: string; avatarFile?: File | null; bio: string; privacy: PrivacyLevel }) => void;
}

export function EditProfileDialog({ open, onOpenChange, defaultValues, onSubmit }: Readonly<EditProfileDialogProps>) {
  const [displayName, setDisplayName] = useState(defaultValues?.displayName ?? '');
  const [bio, setBio] = useState(defaultValues?.bio ?? '');
  const [privacy, setPrivacy] = useState<PrivacyLevel>(defaultValues?.privacyLevel ?? PrivacyLevel.PUBLIC);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(defaultValues?.photoUrl);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.({ displayName, avatarFile, bio, privacy });
    onOpenChange(false);
  }

  function handleCancel() {
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-4">
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Complete these fields to update your profile</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group focus-visible:ring-primary relative h-20 w-20 cursor-pointer rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label="Upload profile photo"
            >
              <div className="ring-primary/20 h-full w-full overflow-hidden rounded-full ring-4">
                {preview ? (
                  <Image src={preview} alt="Avatar preview" fill className="object-cover" />
                ) : (
                  <Avatar className="h-full w-full">
                    <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                      {defaultValues?.displayName?.[0]?.toUpperCase() ?? 'U'}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="bg-background absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Camera className="h-5 w-5 text-foreground" strokeWidth={1.75} />
              </div>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="sr-only" />
          </div>
          <div className="space-y-5">
            <Label htmlFor="displayName">Display name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div className="space-y-5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell people a little about you"
              rows={3}
              className="resize-none"
            />
          </div>
          <div className="space-y-5">
            <Label>Privacy level</Label>
            <Select value={privacy} onValueChange={(v) => setPrivacy(v as PrivacyLevel)}>
              <SelectTrigger>
                <SelectValue placeholder="Select privacy level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="anonymous">Anonymous</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-xs">
              Public: visible to everyone · Private: visible to followers · Anonymous: hides identity
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-5">
            <Button type="button" variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
