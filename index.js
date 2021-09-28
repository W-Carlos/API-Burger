const express = require('express')

const app = express()
const port = 3000

const customerRequest = []

app.post('/customerRequest', (request, response) => {
    const {id, order, clientName, price, status} = request.body

    const order = {id, order, clientName, price, status}

    return response.json(customerRequest)
})

app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
})

