const fs = require('fs')

class Productos {

    constructor () {
        this.items =  []
    }

    get listar() {
        return this.items
    }

    load() {
        try {
            const savedItems = JSON.parse(fs.readFileSync('./api/stock/stock.json', 'utf-8'))
            this.items = savedItems
        } catch {
            return
        }
    }
    agregar(producto) {
        const newItem = {
            id: this.items.length + 1,
            title: producto.title,
            price: producto.price,
            thumbnail: producto.thumbnail,
            stock: producto.stock,
            cod: producto.cod,
            desc: producto.desc,
            timestamp: Date.now()
        }
        this.items.push(newItem)
        this.persistStock()
        return newItem
    }

    listarId(id) {
        return this.items.find(prod => prod.id === Number(id))
    }

    borrar(id) {
        if (this.items.length == 0) { return {error: "No hay items cargados."}}
        const item = this.items.find(prod => prod.id === Number(id)) || {error: "Producto no encontrado"}
        this.items = this.items.filter(el => el.id !== Number(id))
        this.persistStock()
        return item
    }

    actualizar(prod, id) {
        if (this.items.length == 0) { return {error: "No hay items cargados."}}
        const {title, price, thumbnail, stock, cod, desc} = prod
        const item = this.items.find(prod => prod.id === Number(id))
        if (item) {
            item.title = title
            item.price = price
            item.thumbnail = thumbnail
            item.sotck = stock
            item.cod = cod
            item.desc = desc

            this.persistStock()
            return item
        } else {
            return {error: "Producto no encontrado"}
        }
    }

    persistStock() {
        fs.writeFile('./api/stock/stock.json', JSON.stringify(this.items), (error)=>{
            if (error) {
                throw new Error('Error de escritura')
            } else {
                console.log('Stock actualizado')
            }
        })
    }
}


module.exports = new Productos()