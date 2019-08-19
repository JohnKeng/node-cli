const { exec } = require('../db/mysql.js')

const logincheck = (username, password)=> {
    
    let sql = `select id, username, realname from users 
               where username='${username}' and password='${password}';
    `
    console.log(sql)
    return exec(sql).then( rows=> rows[0] || {} )


}

module.exports = {
    logincheck
}