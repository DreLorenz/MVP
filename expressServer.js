//const PORT = 3007;

const express = require('express');
const { Client } = require('pg')
const connectionString = 'postgres://postgres:docker@localhost:5432/workouttracker'

const config = require('./database/config')[process.env.NODE_ENV || DEV]
const PORT = config.PORT;


const client = new Client({
    connectionString: config.connectionString,
})

var cors = require('cors');

const app = express();
client.connect();


app.use(express.static("public"))

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Whats up!")
})

app.get('/journal', (req, res) => {
    client.query('SELECT * FROM journal')
        .then(result => {
            res.send(result.rows)
        })
        .catch((error) => {
            res.send(error)
        })
})

app.post('/journal', (req, res) => {
    const { journal_input } = req.body;
    client.query('INSERT INTO journal (journal_input) VALUES ($1)', [journal_input],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send('Entry Added')
        })

})


app.patch('/journal/:id', (req, res) => {
    const { journal_input } = req.body;
    client.query('UPDATE journal SET journal_input = $1 WHERE tracker_id = $2', [req.body.journal_input, req.params.id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send('Entry Updated')
        })
})

app.delete('/journal/:id', (req, res) => {
    client.query('DELETE FROM journal WHERE tracker_id = $1', [req.params.id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send('Entry Deleted')
        })
})



app.listen(PORT, () => {
    console.log(`Our app is running on ${PORT}`)
});