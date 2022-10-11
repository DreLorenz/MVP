module.exports = {



    production: {
        connectionString: process.env.POSTGRES_CONNECTION_STRING + "?SSL=true",
        port: process.env.PORT
    }
}