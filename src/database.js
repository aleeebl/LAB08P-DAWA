import {createPool} from 'mysql2/promise';

const sequelize = createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'data'
});

export default sequelize;