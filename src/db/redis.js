const redis = require('redis')
const { REDIS_CONF } = require('../../config/database.js')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err=>console.error(err))

const set = (key, val)=> {
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

const get = (key)=> {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if(err){
                reject(err)
                return
            }
            if(val == null){
                resolve(null)
                return
            }
            try{
                resolve( JSON.parse(val) )
            }catch(ex){
                resolve(val)
            }
        })
    })
}

const check = (key ,req)=>{
    return new Promise((resolve, reject)=> {
        redisClient.exists(key, (err, reply)=> {            
            if (reply === 1) {
                resolve(req)
            } else {
                reject(err)
                return
            }
        })
    })
}



module.exports = {
    set,
    get,
    check
}