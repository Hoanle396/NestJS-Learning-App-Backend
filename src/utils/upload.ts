import { diskStorage } from 'multer';

export const course = diskStorage({
  // Specify where to save the file
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/course');
  },
  // Specify the file name
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const avatar = diskStorage({
   // Specify where to save the file
   destination: (req, file, cb) => {
     cb(null, 'public/uploads/course');
   },
   // Specify the file name
   filename: (req, file, cb) => {
     cb(null, Date.now() + '-' + file.originalname);
   },
 });