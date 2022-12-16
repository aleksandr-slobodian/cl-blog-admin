const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

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
server.use('/api', router)
server.listen(3002, () => {
  console.log('JSON Server is running')
})