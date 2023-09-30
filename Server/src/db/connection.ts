import { Sequelize } from "sequelize";


const sequelize = new Sequelize('pc_parts', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize;