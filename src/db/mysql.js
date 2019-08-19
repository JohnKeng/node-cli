const mysql = require('mysql')
const { MYSQL_CONF } = require('../../config/database.js')

const con = mysql.createConnection(MYSQL_CONF)
con.connect()

const exec = (sql)=> {
    return new Promise((resolve, reject)=>{
        con.query(sql,(err, result)=> {
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = { exec }