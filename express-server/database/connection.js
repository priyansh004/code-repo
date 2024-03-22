// database/connection.js
import Sequelize from 'sequelize';
import dotenv from 'dotenv'; // Import dotenv package
dotenv.config();

const dbName = process.env.db_name;
const dbUser = process.env.user;
const dbPassword = process.env.password;
const dbHost = process.env.host;
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql'
});

export default sequelize;
