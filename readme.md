
development
```
npm run dev
```

production
```
npm run prod
```

original server up
```
node bin/www
```

need to set database(mysql and redis) config
add /config/database.js
```js
const env = process.env.NODE_ENV // catch evn variable

let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: '',
        password: '',
        port: '3306',
        database: ''
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: '',
        password: '',
        port: '3306',
        database: ''
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}

```