
import DataTypes from 'sequelize';
import sequelize from '../database/connection.js';
const record = sequelize.define('record', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true

  },
  username: {
    type: DataTypes.STRING,
    allowNull: false

  },
  language: {
    type: DataTypes.ENUM('c++', 'java', 'javaScript', 'python'),
    allowNull: true,
    defaultValue: 'c++'

  },
  stdin: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'Default description' 
  },
  code: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'Default description' 
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
 
}, {
  // Other model options go here
});

export default record;
