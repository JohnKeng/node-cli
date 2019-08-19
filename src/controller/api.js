const { exec } = require('../db/mysql.js')

const getClass = (teacher, classname)=> {
    let sql = `select * from class where 1=1 `
    if(teacher){        
        sql += `and teacher='${teacher}' `
    }
    if(classname){
        sql += `and classname like '%${classname}%' `
    }
    sql += `order by createtime desc;`
    console.log(sql)
    return exec(sql)
}


const addClass = (classname,students,teacher)=>{
    const createtime = Date.now()
    let sql = `
            insert into class(classname, students, createtime, teacher) 
            values('${classname}', '[${students}]', '${createtime}', '${teacher}');
    `
    console.log(sql)
    return exec(sql).then(insertData=> {
        return { id: insertData.insertId }
    })
}

module.exports = {
    getClass, addClass
}