const CONSTANTS = require('../constants');
const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname.toLowerCase()); 
  if (CONSTANTS.UPLOAD_IMG_TYPES.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error('Only format: '+ CONSTANTS.UPLOAD_IMG_TYPES.toString() ))
  }
};

const upload = multer({
  storage,
  limits: { files: CONSTANTS.MAX_LIMIT_IMG },
  fileFilter,
});

module.exports = upload;

const storage = multer.diskStorage({
  destination: CONSTANTS.UPLOAD_FOLDER,
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});



