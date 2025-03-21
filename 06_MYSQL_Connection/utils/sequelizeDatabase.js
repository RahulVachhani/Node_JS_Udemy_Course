import { Sequelize } from "sequelize"

const sequelize = new Sequelize('nodejs', 'root', 'admin@1234', {
    dialect: 'mysql', 
    host: 'localhost',
    logging: true
})

export default sequelize