const express = require('express')
const router = express.Router()

const productos = require('../api/productos')
productos.load()

const checkAdmin = (req, res, next) => {
    if (req.body.admin === true) {
        next()
    } else {
        res.json({error: -1, descripcion: `ruta ${req.url}, método ${req.method}, no autorizado`})
    }
}

router.get('/listar', (req, res)=>{
    
    const items = productos.listar
    if (items.length > 0) {
        res.json(items)
    } else {
        res.json({
            error: 'No hay productos cargados'
        })
    }
})

router.get('/listar/:id', (req, res)=>{
    
    const item = productos.listarId(req.params.id)

    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'Producto no encontrado'
        })
    }
})

router.post('/agregar', checkAdmin, (req, res) => {
    const newItem = productos.agregar(req.body)
    res.json(newItem)
})

router.put('/actualizar/:id', checkAdmin, (req, res) => {
    const item = productos.actualizar(req.body, req.params.id)
    res.json(item)
})

router.delete('/borrar/:id', checkAdmin, (req, res) => {
    const item = productos.borrar(req.params.id)
    res.json(item)
})



module.exports = router