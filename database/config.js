module.exports = {

    dev: {
        connectionString: 'postgres://postgres:docker@localhost:5432/workouttracker',
        PORT: 3007
    },

    production: {
        connectionString: process.env.POSTGRES_CONNECTION_STRING + "?ssl=true",
        PORT: process.env.PORT
    },

}
