const express = require('express')
const uuid = require('uuid')

const app = express()
const port = 3000
app.use(express.json())

const firstOrder = []

// Rota de criar pedidos
app.post('/firstOrder', (request, response) => {

    const {order, clienteName, price} = request.body

    const newOrder = {id:uuid.v4(), order, clienteName, price, status: "Em preparação"}

    firstOrder.push(newOrder)

    return response.status(201).json(newOrder)
})

// Rota que mostra os pedidos
app.get('/firstOrder', (request, response) => {
    return response.json(firstOrder)
})

app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
})

