const { getClass, addClass } = require('../controller/api.js') 
const { SuccessModel, ErrorModel } = require('../model/resModel.js')

const handleApiRouter = (req, res)=> {

    const { path, query, body } = req
    // console.log('token user id is :', req.session.id)  
    if(path === '/api/class'){
        const id = query.id || 0
        const listData = getClass()
        return listData.then(listData=> {
            return new SuccessModel(listData,'讀取班級成功')
        })
    }

    if(path === '/api/class/add'){
        const {classname,students,teacher} = body   
        const addData = addClass(classname,students,teacher)
        return addData.then(addData=> {
            return new SuccessModel(addData,'新增班級成功')
        })
    }


}

module.exports = handleApiRouter