const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const app = express()
const port = 3001
app.use(express.json())
app.use(cors())

// Atenção: Não é uma boa prática utilizar um array para armazenar os dados em uma API. O correto seria armazenar em um banco de dados. O arrey só foi utilizado porque o foco era a criação das rotas.
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

const routeMethod = (request, response, next) => {
    
    console.log(request.method)
    console.log(request.url)

    next()
}

// Rota de criar pedidos
app.post('/firstOrder', routeMethod, (request, response) => {

    const {order, clienteName, price} = request.body

    const newOrder = {id:uuid.v4(), order, clienteName, price, status: "Em preparação"}

    firstOrder.push(newOrder)

    return response.status(201).json(newOrder)
})

// Rota que mostra todos os pedidos
app.get('/firstOrder', routeMethod, (request, response) => {
    return response.json(firstOrder)
})

// Rota que altera pedido ja feito
app.put('/firstOrder/:id', checkId, routeMethod,(request, response) => {

    const index = request.orderIndex
    const id = request.orderId

    const {order, clienteName, price} = request.body

    const updateOrder = {id, order, clienteName, price, status: "Em preparação"}

    firstOrder[index] = updateOrder

    return response.status(201).json(updateOrder)
})

// Rota que deleta pedido
app.delete('/firstOrder/:id', checkId, routeMethod, (request, response) => {
    const index = request.orderIndex

    firstOrder.splice(index, 1)

    return response.status(204).json()
})

// Rota que retorna um pedido específico pelo id
app.get('/firstOrder/:id', checkId, routeMethod, (request, response) => {

    const index = request.orderIndex

    orderId = firstOrder[index]

    return response.status(201).json(orderId)
})

// Rota que altera o status do pedido recebido pelo id para "Pronto".
app.patch('/firstOrder/:id', checkId, routeMethod, (request, response) => {
    const {order, clienteName, price, status} = request.body

    const index = request.orderIndex
    const id = request.orderId

    const changeStatus = {id, order, clienteName, price, status}

    firstOrder[index] = changeStatus

    return response.status(201).json(changeStatus)
})

app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
})

