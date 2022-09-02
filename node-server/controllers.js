const multer  = require('multer');
const fs = require('fs');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
      destination: function(req, file ,callback){
        
        const userName = req.url.split('/')[1];
        const day = req.body.day;
        console.log(req.params, userName);
        try {
          fs.readdirSync('../db/'+userName+'/'+day+'/');
        } catch(err) {
          fs.mkdirSync('../db/'+userName+'/'+day+'/');
        }
        callback(null, '../db/'+userName+'/'+day+'/');
      },
      filename: function(req, file, callback){
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + extension);
      }
    })
  });

let middleware = upload.single('file');


exports.postSendFile = (req, res, next) => {
  middleware(req, res, () => {});
}

exports.getRender = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../react-project/build/index.html'));
}


