import fs from 'fs'
import path from 'path'
import Product from './product.js'

const p = path.join(import.meta.dirname, 'cart.json')


export default class Cart{
    static addToCart(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            if(!err){
                cart = JSON.parse(fileContent)
            }
            
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct
            if(existingProduct){
                updatedProduct ={...existingProduct}
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products[existingProductIndex] = updatedProduct
            }
            else{
                updatedProduct = {id: id, qty: 1}
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + parseInt(productPrice)
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if(err) {
                    console.log(err);   
                }
                else{
                    console.log(`Successfully product added to cart`);
                    
                }
            })
        })
        
    }

    static delete(prodId){
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            if(!err && fileContent){
                cart = JSON.parse(fileContent)
            }
    
            // Filter out the product to be deleted
            const updatedProducts = cart.products.filter(product => product.id !== prodId)
    
            if(updatedProducts.length === 0){
                cart.products = []
                cart.totalPrice = 0
                fs.writeFile(p, JSON.stringify(cart), (err) => {
                    if(err) console.log(err)
                    else console.log('Product deleted & cart updated')
                })
                return;
            }
    
            let completed = 0;
            let updatedPrice = 0;
    
            for (let product of updatedProducts){
                Product.findById(product.id, (foundProduct) => {
                    if(foundProduct){
                        updatedPrice += foundProduct.price * product.qty;
                    }
                    completed++;
                    if (completed === updatedProducts.length){
                        cart.products = updatedProducts;
                        cart.totalPrice = updatedPrice;
                        fs.writeFile(p, JSON.stringify(cart), (err) => {
                            if(err) console.log(err)
                            else console.log('Product deleted & cart updated')
                        })
                    }
                })
            }
        })
    }


    static delete1(prodId){
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            if(!err){
                cart = JSON.parse(fileContent)
            }
            let updatedProduct = cart.products.filter(prod => prod.id !== prodId)
            let deleteProduct = cart.products.find(prod => prod.id === prodId)
            Product.findById(prodId, (product) => {
                cart.totalPrice = cart.totalPrice - parseFloat(product.price) * parseInt(deleteProduct.qty)
                cart.products = updatedProduct
                fs.writeFile(p, JSON.stringify(cart), (err) => {
                    if(err){
                        console.log(err);                        
                    }
                    else{
                        console.log(`Successfully updated cart`);    
                    }
                })
            })
        })
    }

    static fetchAllItems(cb){
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            let products = []
            if(!err && fileContent){
                cart = JSON.parse(fileContent)
                if (cart.products.length > 0){
                    let completed = 0;
                    for (let prod of cart.products){
                        Product.findById(prod.id, (product) => {
                            if(product){
                                products.push({...product, qty: prod.qty})
                            }
                            completed++;
                            if (completed === cart.products.length){
                            cb({products, totalPrice: cart.totalPrice})
                        }
                        })
                    }
                   
                }
                else{
                    cb(cart)
                }
            }
            else{
                cb(cart)
            }
        })
    }
               
}