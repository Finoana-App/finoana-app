'use client';

import { ChangeEvent, useRef, useState } from 'react';

import Image from 'next/image';

import { Camera, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { PrivacyLevel, UpdateProfileInput, User } from '@workspace/types';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Textarea } from '@workspace/ui/components/textarea';

import { useDictionary } from '@/hooks/use-dictionary';

import { ApiError } from '@/lib/api/client';
import { useUpdateProfile } from '@/lib/hooks/use-user';

import { Dictionary } from '@/i18n/dictionaries/en';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: UpdateProfileInput;
  user: User;
  onProfileUpdated?: (updatedUser?: User) => void;
}

export function EditProfileDialog({
  open,
  onOpenChange,
  defaultValues,
  user,
  onProfileUpdated,
}: Readonly<EditProfileDialogProps>) {
  const [displayName, setDisplayName] = useState(defaultValues?.displayName ?? '');
  const [bio, setBio] = useState(defaultValues?.bio ?? '');
  const [privacy, setPrivacy] = useState<PrivacyLevel>(
    (defaultValues?.privacyLevel as PrivacyLevel) ?? PrivacyLevel.PUBLIC
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(defaultValues?.photoUrl ?? '');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { dictionary } = useDictionary<Dictionary>();

  const { mutate: updateProfileMutation, isPending: isUpdating } = useUpdateProfile();

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedDisplayName = displayName.trim();
    if (!trimmedDisplayName) {
      toast.error(dictionary?.dashboard.profile.errors?.displayNameRequired || 'Display name is required', {
        position: 'top-center',
        duration: 5000,
      });
      return;
    }

    const formData = new FormData();

    formData.append('displayName', trimmedDisplayName);
    formData.append('bio', bio.trim());
    formData.append('privacyLevel', privacy);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    updateProfileMutation(formData, {
      onSuccess: (response) => {
        if (response?.success) {
          const updatedUser = Array.isArray(response.responseObject)
            ? response.responseObject[0]
            : response.responseObject;

          toast.success(dictionary?.dashboard.profile.errors?.success || 'Profile updated successfully', {
            position: 'top-center',
            duration: 5000,
          });

          if (preview?.startsWith('blob:')) {
            URL.revokeObjectURL(preview);
          }

          setAvatarFile(null);
          onProfileUpdated?.(updatedUser);
          onOpenChange(false);
        }
      },
      onError: (error: ApiError) => {
        console.error('[Update Profile] Error:', error);

        const errorMessage =
          error?.message ||
          dictionary?.dashboard.profile.errors?.updateFailed ||
          'Failed to update profile. Please try again.';

        toast.error(errorMessage, {
          position: 'top-center',
          duration: 5000,
        });
      },
    });
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setDisplayName(user.displayName ?? '');
      setBio(user.bio ?? '');
      setPrivacy((user.privacyLevel as PrivacyLevel) ?? PrivacyLevel.PUBLIC);
      setPreview(user.photoUrl ?? undefined);
      setAvatarFile(null);
    }
    onOpenChange(open);
  }

  function handleCancel() {
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-4">
          <DialogTitle>{dictionary?.dashboard.profile.editProfile}</DialogTitle>
          <DialogDescription>{dictionary?.dashboard.profile.editProfileDescription}</DialogDescription>
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
                  <div className="relative h-full w-full">
                    <Image
                      src={preview}
                      alt="Avatar preview"
                      fill
                      className="rounded-full object-cover"
                      sizes="80px"
                      unoptimized={preview.startsWith('blob:')}
                    />
                  </div>
                ) : (
                  <Avatar className="h-full w-full">
                    <AvatarImage src={user.photoUrl ?? undefined} alt={user.displayName ?? 'User avatar'} />
                    <AvatarFallback className="bg-primary/10 text-primary text-3xl">
                      {user?.displayName?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="bg-background absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Camera className="text-foreground h-5 w-5" strokeWidth={1.75} />
              </div>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="sr-only" />
          </div>
          <div className="space-y-5">
            <Label htmlFor="displayName">{dictionary?.dashboard.profile.displayName}</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={dictionary?.dashboard.profile.displayNamePlaceholder}
              disabled={isUpdating}
              required
            />
          </div>
          <div className="space-y-5">
            <Label htmlFor="bio">{dictionary?.dashboard.profile.bio}</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={dictionary?.dashboard.profile.bioPlaceholder}
              rows={3}
              disabled={isUpdating}
              className="resize-none"
            />
          </div>
          <div className="space-y-5">
            <Label>{dictionary?.dashboard.profile.privacyLevel}</Label>
            <Select value={privacy} onValueChange={(v) => setPrivacy(v as PrivacyLevel)} disabled={isUpdating}>
              <SelectTrigger>
                <SelectValue placeholder={dictionary?.dashboard.profile.privacyLevelPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">{dictionary?.dashboard.profile.privacy.public}</SelectItem>
                <SelectItem value="private">{dictionary?.dashboard.profile.privacy.private}</SelectItem>
                <SelectItem value="anonymous">{dictionary?.dashboard.profile.privacy.anonymous}</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-xs">{dictionary?.dashboard.profile.privacyLevelDescription}</p>
          </div>
          <div className="flex justify-end gap-2 pt-5">
            <Button type="button" variant="ghost" className="cursor-pointer" onClick={handleCancel}>
              {dictionary?.common.cancel}
            </Button>
            <Button type="submit" className="cursor-pointer" disabled={isUpdating}>
              {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
              {isUpdating ? dictionary?.common.saving : dictionary?.common.saveChanges}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
