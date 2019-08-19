const querystring = require('querystring')
const { check } = require('./src/db/redis.js')

const path = require('./src/router')
  
const serverHandle = (req, res)=>{

  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])
  // session set
  req.session = {}
  // get token
  if(req.headers.token){
    req.session.token = req.headers.token
  }else{
    req.session.token = 'no-token'
  }
 

  if( path.hasOwnProperty(req.path) ){

    if(req.path === '/api/get/token' || req.path ==='/'){
      returnHandeler(req, res)
    }else {
      check(req.session.token, req).then(req=> {
        returnHandeler(req, res)
      }).catch((err)=>{
          err={message:'401 Unauthorized'}
          res.writeHead(401,{'content-type':'application/json'})
          res.end(JSON.stringify(err))
      })
    }

  } else {
      res.writeHead(404,{'content-type':'text/plain'})
      res.write('4o4 not found\n')
      res.end()
  }


  function returnHandeler(req, res){
    getPostData(req).then(postdata=> {
      req.body = postdata   
      const handleData = path[req.path](req, res)
      if(handleData){
        handleData.then( d=>{
          if(d){
            res.writeHead(200,{'content-type':'application/json'})
            res.end( JSON.stringify(d) )
          }
        })
        return
      }   

    }).catch(err=>{
      res.writeHead(401,{'content-type':'application/json'})
      res.end(JSON.stringify(err))
    })
  }
}

const getPostData = (req)=>{
  return new Promise((resolve, reject)=> {
    // if(req.session.need){
    //   if(req.session.token === 'no-token'){
    //     console.log('no token')
    //     reject({message:'need token'})
    //   }
    // }
    if(req.method !== 'POST') {
      resolve({})
      return
    }
    if(req.headers['content-type'] !== 'application/json'){
      resolve({})
      return
    }
    let data = ''
    req.on('data', chunk=> {
        data += chunk.toString()
    })
    req.on('end', ()=> {
        if(!data) {
          resolve({})
          return
        }
        resolve(JSON.parse(data))
    })
  })
}

module.exports = serverHandle