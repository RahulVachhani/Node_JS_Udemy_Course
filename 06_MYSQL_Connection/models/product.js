import db from '../utils/database.js'

export default class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    save() {
        if (this.id){
            return db.execute(`UPDATE product SET title="${this.title}",price=${this.price},imageURl="${this.imageUrl}",description="${this.description}" WHERE id = ${this.id}`)
        }
        return db.execute(
            'INSERT INTO product (title, imageUrl, price, description) VALUES (?, ?, ?, ?)',
            [this.title, this.imageUrl, this.price, this.description]
          );
    }

    static delete(prodId) {
        return db.execute('DELETE FROM product WHERE ID = ?',[prodId])
    }

    static fetchAll() {
        return db.execute('SELECT * FROM product')
    }

    static findById(prodId) {

    return db.execute('SELECT * FROM product WHERE id = ?', [prodId]);
    }

}