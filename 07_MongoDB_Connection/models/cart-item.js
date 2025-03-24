import { Sequelize } from "sequelize";
import sequelize from "../utils/sequelizeDatabase.js";

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true 
    },
    quantity: Sequelize.INTEGER
})


export default CartItem