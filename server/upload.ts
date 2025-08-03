import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { Request } from 'express';
import mime from 'mime-types';

// إنشاء مجلدات التخزين
const createUploadDirs = async () => {
  const dirs = [
    'uploads',
    'uploads/images',
    'uploads/documents',
    'uploads/videos',
    'uploads/thumbnails'
  ];
  
  for (const dir of dirs) {
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (error) {
      console.error(`Error creating directory ${dir}:`, error);
    }
  }
};

// إعداد multer للتخزين
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('نوع الملف غير مدعوم'));
    }
  }
});

// معالجة الصورة وضغطها
export const processImage = async (
  buffer: Buffer, 
  originalName: string
): Promise<{ filename: string; size: number; dimensions: string }> => {
  const ext = path.extname(originalName);
  const name = path.basename(originalName, ext);
  const timestamp = Date.now();
  const filename = `${name}-${timestamp}.webp`;
  const filepath = path.join('uploads/images', filename);
  
  // ضغط وتحسين الصورة
  const processedBuffer = await sharp(buffer)
    .resize(1920, 1920, { 
      fit: 'inside',
      withoutEnlargement: true 
    })
    .webp({ 
      quality: 85,
      effort: 6 
    })
    .toBuffer();
  
  // حفظ الصورة
  await fs.writeFile(filepath, processedBuffer);
  
  // الحصول على أبعاد الصورة
  const metadata = await sharp(processedBuffer).metadata();
  const dimensions = `${metadata.width}x${metadata.height}`;
  
  return {
    filename,
    size: processedBuffer.length,
    dimensions
  };
};

// إنشاء thumbnail للصورة
export const createThumbnail = async (
  buffer: Buffer,
  originalFilename: string
): Promise<string> => {
  const ext = path.extname(originalFilename);
  const name = path.basename(originalFilename, ext);
  const thumbnailFilename = `thumb-${name}.webp`;
  const thumbnailPath = path.join('uploads/thumbnails', thumbnailFilename);
  
  await sharp(buffer)
    .resize(300, 300, { 
      fit: 'cover',
      position: 'center'
    })
    .webp({ quality: 80 })
    .toFile(thumbnailPath);
    
  return thumbnailFilename;
};

// معالجة ملف عادي (غير صورة)
export const processFile = async (
  buffer: Buffer,
  originalName: string,
  mimetype: string
): Promise<{ filename: string; size: number }> => {
  const ext = path.extname(originalName);
  const name = path.basename(originalName, ext);
  const timestamp = Date.now();
  const filename = `${name}-${timestamp}${ext}`;
  
  let filepath: string;
  if (mimetype.startsWith('video/')) {
    filepath = path.join('uploads/videos', filename);
  } else {
    filepath = path.join('uploads/documents', filename);
  }
  
  await fs.writeFile(filepath, buffer);
  
  return {
    filename,
    size: buffer.length
  };
};

// تنسيق حجم الملف
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// تحديد نوع الملف
export const getFileType = (mimetype: string): string => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  return 'document';
};

// تهيئة مجلدات التخزين عند بدء التشغيل
createUploadDirs().catch(console.error);