const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../Literacy-main/frontend/build')));

app.get('/', (req, res) => {
    res.send('Here is root')
})

app.get('/function1', (req, res) => {
    res.send('Function 1')
})

app.get('/function2', (req, res) => {
    res.send('Function 2')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})