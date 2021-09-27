const express = require('express')

const app = express()
const port = 3000

app.get('/users', (request, response) => {
    return response.send('hello world')
})

app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
})

