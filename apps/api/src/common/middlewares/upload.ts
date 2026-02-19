import { Request, RequestHandler } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';

const uploadsDir = path.join(__dirname, '../../uploads/temp');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const imageFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'));
  }
};

export const uploadSingle: RequestHandler = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: Number.parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
  },
}).single('image');

export const uploadAvatar: RequestHandler = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB for avatars
  },
}).single('avatar');

export const uploadMultiple: RequestHandler = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: Number.parseInt(process.env.MAX_FILE_SIZE || '10485760'),
    files: Number.parseInt(process.env.MAX_FILES_PER_UPLOAD || '5'),
  },
}).array('images', Number.parseInt(process.env.MAX_FILES_PER_UPLOAD || '5'));

export const handleUploadError = (err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File size too large',
        message: 'Maximum file size is 10MB',
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        error: 'Too many files',
        message: `Maximum ${process.env.MAX_FILES_PER_UPLOAD || 5} files allowed`,
      });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

export const cleanupTempFile = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Failed to cleanup temp file:', error);
  }
};

export const cleanupTempFiles = (files: Express.Multer.File[]) => {
  files.forEach((file) => cleanupTempFile(file.path));
};
