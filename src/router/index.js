const handleTokenRouter = require('./token.js')
const handelIndexRouter = (req, res)=>{
    if(req.path === '/'){
        return new Promise((resolve, reject)=>{
            resolve({ 
                message:'AK api server is working!',
                url: Object.keys(path)
            })
        })
    }
}

// 往下新增
const handleApiRouter = require('./api.js')





const path = {
    '/': handelIndexRouter,
    '/api/get/token': handleTokenRouter,
    '/api/class': handleApiRouter,
    '/api/class/add': handleApiRouter
}

module.exports = path