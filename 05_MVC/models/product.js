import fs from 'fs'
import path from 'path'

// const products= []

export default class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    save() {
        // products.push({title:this.title})

        const p = path.join(import.meta.dirname, 'data.json')

        fs.readFile(p, (err, fileContent) => {
            let products = []
            if (!err) {
                products = JSON.parse(fileContent)
            }
            if (this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id)
                const updatedProduct = [...products]
                updatedProduct[existingProductIndex] = this
                products = updatedProduct
            }
            else {
                this.id = Math.random().toString()
                products.push(this)
            }
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.log(err);
                }
            })
        })

    }

    static delete(prodId) {
        const p = path.join(import.meta.dirname, 'data.json')
        fs.readFile(p, (err, fileContent) => {
            let products = []
            if (!err) {
                products = JSON.parse(fileContent)
            }
            if (prodId) {
                const existingProduct = products.find(product => product.id === prodId)
                fs.readFile(path.join(import.meta.dirname, 'cart.json'), (err, fileContent) => {
                    if (!err) {
                        let cart = JSON.parse(fileContent)
                        let product = cart.products.find(prod => prod.id === prodId)
                        if (product) {
                            Product.findById(product.id, (product1) => {
                                cart.totalPrice = cart.totalPrice - parseFloat(product1.price) * parseInt(product.qty)
                                console.log(cart);

                                cart.products = cart.products.filter(prod => prod.id !== prodId)
                                products = products.filter(product => product.id !== existingProduct.id)
                                fs.writeFile(path.join(import.meta.dirname, 'cart.json'), JSON.stringify(cart), (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        console.log(`Successfully updated cart`);
                                    }
                                })

                                fs.writeFile(p, JSON.stringify(products), (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                })

                            })
                        }
                        else {
                            products = products.filter(product => product.id !== existingProduct.id)
                            fs.writeFile(p, JSON.stringify(products), (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            })
                        }


                    }
                })
            }
        })
    }

    static fetchAll(cb) {
        // return products

        fs.readFile(path.join(import.meta.dirname, 'data.json'), (err, fileContent) => {
            if (err) {
                cb([])
            }
            cb(JSON.parse(fileContent))
        })
    }

    static findById(prodId, cb) {
        Product.fetchAll(products => {
            cb(products.find(product => product.id === prodId))
        })
    }

    static AddToCart(prodId) {
        const p = path.join(import.meta.dirname, 'cart.json')

        fs.readFile(p, (err, fileContent) => {
            let products = []
            if (!err) {
                products = JSON.parse(fileContent)
            }
            Product.findById(prodId, (product) => {
                products.push(product)
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(`Successfully store the product is cart`)
                    }
                })
            })
        })
    }
}