require('dotenv').config();
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const path = require('path');
var multer  = require('multer');


const FILE_UPLOAD_BASE_PATH = process.env.FILE_UPLOAD_BASE_PATH;
const API_IMAGES_PATH = '/api/images';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    switch(req.url){
      case API_IMAGES_PATH:
        cb(null, path.join(__dirname, FILE_UPLOAD_BASE_PATH, '/images'));
      break;
      default:
        cb(null, path.join(__dirname, FILE_UPLOAD_BASE_PATH));
    }
  },
  filename: function (req, file, cb) {
    if(req.url === API_IMAGES_PATH && req.body.id){
      const ext = file.mimetype.split('/')[1];
      const fileName = `${req.body.id}.${ext}`;
      req.body['name'] = fileName;
      req.body['originalname'] = file.originalname;
      req.body['date'] = Date.now();
      cb(null, fileName);
    } else {
      cb(null, file.originalname);
    }
  }
})

var upload = multer({ storage })

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.post('/api/login',  (req, res) => {
  const {email, password} = req.body;
  if(email && password){
    const users = router.db.__wrapped__?.users.filter((user) => email === user.email && password === user.password);
    if(users && users.length){
      res.json(users[0])
    }else{
      res.status(401).json({});
    }
  }else{
    res.status(401).json({});
  }
})
server.use(upload.any());
server.use('/api', router)
server.listen(3002, () => {
  console.log('JSON Server is running')
})