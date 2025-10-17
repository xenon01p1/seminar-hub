
import multer from 'multer';
import path from 'path';
import fs from 'fs'; 

const uploadDir = '../frontend/public/upload'; 

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const uniqueSuffix = Date.now(); 
    const extension = path.extname(file.originalname);
    cb(null, `${timestamp}_${uniqueSuffix}${extension}`);
  }
});

export const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});