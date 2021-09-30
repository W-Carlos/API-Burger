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

// Rota que mostra todos os pedidos
app.get('/firstOrder', (request, response) => {
    return response.json(firstOrder)
})

// Rota que altera pedido ja feito
app.put('/firstOrder/:id', (request, response) => {

    const {id} = request.params

    const {order, clienteName, price} = request.body

    const updateOrder = {id, order, clienteName, price}

    const index = firstOrder.findIndex(order => order.id === id)

    if(index < 0) {
        return response.status(404).json({message: "Order not found"})
    }

    firstOrder[index] = updateOrder

    return response.json(updateOrder)
})

// Rota que deleta pedido
app.delete('/firstOrder/:id', (request, response) => {
    const {id} = request.params

    const index = firstOrder.findIndex(order => order.id === id)

    if(index < 0) {
        return response.status(404).json({message: "Order not found"})
    }

    firstOrder.splice(index, 1)

    return response.status(204).json()
})

// Rota que retorna um pedido específico
app.get('/firstOrder/:id', (request, response) => {

    const {id} = request.params

    const index = firstOrder.findIndex(order => order.id === id)

    if(index < 0) {
        return response.status(404).json({message: "Order not found"})
    }

    orderId = firstOrder[index]

    return response.json(orderId)
})




app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
})

