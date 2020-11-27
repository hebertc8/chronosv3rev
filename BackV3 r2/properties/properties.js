let chronos = {
    PORT: process.env.PORT || process.env.APP_PORT,
    valor: {
        "secret": process.env.SECRET
    },
    config: {
        server: process.env.IP_SQL,
        authentication: {
            type: process.env.TYPE,
            options: {
                userName: process.env.SQL_USERNAME,
                password: process.env.SQL_PASSWORD,
            }
        },
        driver: process.env.DRIVER,
        options: {
            instanceName: process.env.INSTANCE,
            database: process.env.DATABASE,
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true,
            connectTimeout: 5000,
            requestTimeout: 150000
        }
    },
}

let MyTp = {
    PORT: process.env.PORT || process.env.APP_PORT,
    valor: {
        "secret": process.env.SECRET
    },
    config: {
        server: process.env.IP_SQL,
        authentication: {
            type: process.env.TYPE,
            options: {
                userName: process.env.SQL_USERNAME,
                password: process.env.SQL_PASSWORD,
            }
        },
        driver: process.env.DRIVER,
        options: {
            instanceName: process.env.INSTANCE,
            database: process.env.DATABASE2,
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true,
            connectTimeout: 5000,
            requestTimeout: 150000
        }
    },
}
module.exports = { chronos: chronos, MyTp: MyTp }