const express = require('express')
const router = express.Router()
const fs = require('fs')

const carrito = require('../api/carrito')
carrito.load()

router.get('/listar/:id', (req, res)=>{
    
    const item = carrito.listar(req.params.id)

    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'Producto no encontrado'
        })
    }
})

router.post('/agregar/:id_producto', (req, res) => {

    try {
        const productos = JSON.parse(fs.readFileSync('./api/stock/stock.json', 'utf-8'))
        const itemToAdd = productos.find(el => el.id === Number(req.params.id_producto))
        if (itemToAdd) {
            const newItem = carrito.agregar(itemToAdd)
            res.json(newItem)
        } else {
            res.json({
                error: 'Producto para agregar no encontrado'
            })
        }
    } catch {
        res.json({
            error: 'No encontramos el stock'
        })
    }

})

router.delete('/borrar/:id', (req, res) => {
    const item = carrito.borrar(req.params.id)
    res.json(item)
})



module.exports = router