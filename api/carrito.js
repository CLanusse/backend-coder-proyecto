const fs = require('fs')

class Carrito {
    constructor() {
        this.id = 1
        this.timestamp = Date.now()   
        this.products = []
    }

    load() {
        try {
            const savedCart = JSON.parse(fs.readFileSync('./api/cart/cart.json', 'utf-8'))
            this.products = savedCart
        } catch {
            return
        }
    }

    agregar(item) {
        const newItem = {...item}
        this.products.push(newItem)
        this.persistCart()
        return newItem
    }

    listar(id) {
        return this.products.find(prod => prod.id === Number(id))
    }

    borrar(id) {
        if (this.products.length == 0) { return {error: "No hay items cargados."}}
        const item = this.products.find(prod => prod.id === Number(id)) || {error: "Producto no encontrado"}
        this.products = this.products.filter(el => el.id !== Number(id))
        this.persistCart()
        return item
    }

    persistCart() {
        fs.writeFile('./api/cart/cart.json', JSON.stringify(this.products), (error)=>{
            if (error) {
                throw new Error('Error de escritura')
            } else {
                console.log('Cart actualizado')
            }
        })
    }
}

module.exports = new Carrito()