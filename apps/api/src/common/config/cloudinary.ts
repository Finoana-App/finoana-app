import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

import { env } from '@/common/utils/env-config';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export enum MediaType {
  AVATAR = 'avatar',
  POST_IMAGE = 'post_image',
  GROUP_COVER = 'group_cover',
  EVENT_BANNER = 'event_banner',
  PRAYER_IMAGE = 'prayer_image',
  RESOURCE_THUMBNAIL = 'resource_thumbnail',
  GENERAL = 'general',
}

export interface UploadOptions {
  mediaType: MediaType;
  userId?: string;
  folder?: string;
  transformation?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    gravity?: string;
  };
  allowedFormats?: string[];
}

export interface UploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  resourceType: string;
}

class Cloudinary {
  private readonly baseFolder = 'finoana';

  /**
   * Get folder path based on media type
   */
  private getFolderPath(mediaType: MediaType, userId?: string): string {
    const folders: Record<MediaType, string> = {
      [MediaType.AVATAR]: `${this.baseFolder}/avatars`,
      [MediaType.POST_IMAGE]: `${this.baseFolder}/posts`,
      [MediaType.GROUP_COVER]: `${this.baseFolder}/groups`,
      [MediaType.EVENT_BANNER]: `${this.baseFolder}/events`,
      [MediaType.PRAYER_IMAGE]: `${this.baseFolder}/prayers`,
      [MediaType.RESOURCE_THUMBNAIL]: `${this.baseFolder}/resources`,
      [MediaType.GENERAL]: `${this.baseFolder}/media`,
    };

    let folder = folders[mediaType];

    if (userId && [MediaType.POST_IMAGE, MediaType.PRAYER_IMAGE].includes(mediaType)) {
      folder += `/${userId}`;
    }

    return folder;
  }

  /**
   * Get default transformation based on media type
   */
  private getDefaultTransformation(mediaType: MediaType) {
    const transformations: Record<MediaType, any> = {
      [MediaType.AVATAR]: {
        width: 500,
        height: 500,
        crop: 'fill',
        gravity: 'face',
        quality: 'auto:good',
        fetch_format: 'auto',
      },
      [MediaType.POST_IMAGE]: {
        width: 1200,
        height: 1200,
        crop: 'limit',
        quality: 'auto:good',
        fetch_format: 'auto',
      },
      [MediaType.GROUP_COVER]: {
        width: 1500,
        height: 500,
        crop: 'fill',
        gravity: 'center',
        quality: 'auto:good',
        fetch_format: 'auto',
      },
      [MediaType.EVENT_BANNER]: {
        width: 1200,
        height: 630,
        crop: 'fill',
        gravity: 'center',
        quality: 'auto:good',
        fetch_format: 'auto',
      },
      [MediaType.PRAYER_IMAGE]: {
        width: 800,
        height: 800,
        crop: 'limit',
        quality: 'auto:good',
        fetch_format: 'auto',
      },
      [MediaType.RESOURCE_THUMBNAIL]: {
        width: 400,
        height: 300,
        crop: 'fill',
        gravity: 'center',
        quality: 'auto:good',
        fetch_format: 'auto',
      },
      [MediaType.GENERAL]: {
        width: 1200,
        crop: 'limit',
        quality: 'auto:good',
        fetch_format: 'auto',
      },
    };

    return transformations[mediaType];
  }

  /**
   * Upload single file to Cloudinary
   */
  async uploadFile(file: Express.Multer.File, options: UploadOptions): Promise<UploadResult> {
    try {
      const folder = options.folder || this.getFolderPath(options.mediaType, options.userId);
      const transformation = options.transformation || this.getDefaultTransformation(options.mediaType);

      const optimizedPath = await this.optimizeImage(file.path);

      const result = await cloudinary.uploader.upload(optimizedPath, {
        folder: folder,
        transformation: transformation,
        allowed_formats: options.allowedFormats || ['jpg', 'png', 'jpeg', 'webp', 'gif'],
        resource_type: 'auto',
      });

      this.cleanupFile(file.path);
      this.cleanupFile(optimizedPath);

      return {
        url: result.url,
        secureUrl: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        resourceType: result.resource_type,
      };
    } catch (error: any) {
      this.cleanupFile(file.path);
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  /**
   * Upload multiple files to Cloudinary
   */
  async uploadMultipleFiles(files: Express.Multer.File[], options: UploadOptions): Promise<UploadResult[]> {
    try {
      const uploadPromises = files.map((file) => this.uploadFile(file, options));

      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error: any) {
      files.forEach((file) => this.cleanupFile(file.path));
      throw new Error(`Multiple upload failed: ${error.message}`);
    }
  }

  /**
   * Optimize image with Sharp before uploading
   */
  private async optimizeImage(filePath: string): Promise<string> {
    const ext = path.extname(filePath);
    const optimizedPath = filePath.replace(ext, `-optimized${ext}`);

    try {
      await sharp(filePath)
        .resize(2000, 2000, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .toFile(optimizedPath);

      return optimizedPath;
    } catch {
      return filePath;
    }
  }

  /**
   * Delete file from Cloudinary
   */
  async deleteFile(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error: any) {
      console.error('Failed to delete from Cloudinary:', error);
    }
  }

  async deleteMultipleFiles(publicIds: string[]): Promise<void> {
    try {
      const deletePromises = publicIds.map((publicId) => cloudinary.uploader.destroy(publicId));
      await Promise.all(deletePromises);
    } catch (error: any) {
      console.error('Failed to delete multiple files:', error);
    }
  }

  /**
   * Extract public ID from Cloudinary URL
   */
  extractPublicId(url: string): string | null {
    const match = url.match(/\/v\d+\/(.+)\.\w+$/);
    return match?.[1] ?? null;
  }

  /**
   * Clean up local temp file
   */
  private cleanupFile(filePath: string): void {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Failed to cleanup file:', error);
    }
  }

  /**
   * Get file info from Cloudinary
   */
  async getFileInfo(publicId: string) {
    try {
      const result = await cloudinary.api.resource(publicId);
      return {
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        url: result.url,
        secureUrl: result.secure_url,
        createdAt: result.created_at,
      };
    } catch (error: any) {
      throw new Error(`Failed to get file info: ${error.message}`);
    }
  }

  /**
   * Generate transformation URL (without uploading)
   */
  generateTransformationUrl(
    publicId: string,
    transformation: {
      width?: number;
      height?: number;
      crop?: string;
      quality?: string | number;
      format?: string;
    }
  ): string {
    return cloudinary.url(publicId, {
      transformation: [transformation],
      secure: true,
    });
  }
}

export const cloudinaryService = new Cloudinary();

export { v2 as default } from 'cloudinary';
