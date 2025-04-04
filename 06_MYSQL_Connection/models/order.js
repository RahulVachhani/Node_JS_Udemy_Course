import { Sequelize } from "sequelize";
import sequelize from "../utils/sequelizeDatabase.js";

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
})

export default Order