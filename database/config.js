module.exports = {

    dev: {
        connectionString: 'postgres://postgres:postgrespw@localhost:55002/popsingers',
        PORT: 3002
    },

    production: {
        connectionString: process.env.POSTGRES_CONNECTION_STRING + "?SSL=true",
        port: process.env.PORT
    }
}