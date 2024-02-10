const { logincheck } = require('../controller/token.js') 
const { set } = require('../db/redis.js')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')

const handleTokenRouter = (req, res)=> {
    const {method, path, body, session} = req

    if(method === 'GET' && path === '/api/get/token'){
        const {username, password} = req.query
        const login = logincheck(username, password)
        return login.then(d=> {
            if(d.username){
                session.token = generateToken()
                session.username = d.username
                session.realname = d.realname
                set(session.token, session) 
                return { username:session.username,token: session.token }
            }
            return new ErrorModel(`登入失敗`)
        })
    }

    if(method === 'POST' && path === '/api/get/token'){
        const {username, password} = body
        const login = logincheck(username, password)
        return login.then(d=> {
            if(d.username){
                session.token = generateToken()
                session.id = d.id
                set(session.token, session)     
                return { username:session.username,token: session.token }
            }
            return new ErrorModel(`登入失敗`)
        })
    }

}

const generateToken = () => {
    return `${new Date().getTime()}${Math.random()}`
}
 
  
module.exports = handleTokenRouter 