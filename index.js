const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')

const app = express()
const port = 3000
app.use(express.json())

const firstOrder = []

const checkId = (request, response, next) => {
    const {id} = request.params

    const index = firstOrder.findIndex(order => order.id === id)

    if(index < 0) {
        return response.status(404).json({message: "Order not found"})
    }

    request.orderIndex = index
    request.orderId = id

    next()
}

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
app.put('/firstOrder/:id', checkId, (request, response) => {

    const index = request.orderIndex
    const id = request.orderId

    const {order, clienteName, price} = request.body

    const updateOrder = {id, order, clienteName, price, status: "Em preparação"}

    firstOrder[index] = updateOrder

    return response.json(updateOrder)
})

// Rota que deleta pedido
app.delete('/firstOrder/:id', checkId, (request, response) => {
    const index = request.orderIndex

    firstOrder.splice(index, 1)

    return response.status(204).json()
})

// Rota que retorna um pedido específico pelo id
app.get('/firstOrder/:id', checkId, (request, response) => {

    const index = request.orderIndex

    orderId = firstOrder[index]

    return response.json(orderId)
})

// Rota que altera o status do pedido recebido pelo id para "Pronto".
app.patch('/firstOrder/:id', checkId, (request, response) => {
    const {order, clienteName, price, status} = request.body

    const index = request.orderIndex
    const id = request.orderId

    const changeStatus = {id, order, clienteName, price, status}

    firstOrder[index] = changeStatus

    return response.json(changeStatus)
})

app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
})

