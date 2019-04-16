const express = require('express')
const app = express()

//Set up routes
app.use('/Random', require('./src/routes/random'));
app.use('/Movies', require('./src/routes/movies'))

app.get('/', (req, res) => res.send("Hi! I'm Mister Meeseeks"))

app.listen(3000, () => console.log('Example app listening on port 3000!'))