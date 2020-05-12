'use strict'

/* Global imports */
import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'
import dotenv from 'dotenv'
import User from './user'

/* Config Vars */
dotenv.config()

// Schema del modelo Usuario con sequelize

const Ticket = sequelize.define('ticket', {
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  requested_ticket: { type: DataTypes.BOOLEAN, defaultValue: false },
  // created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
})

Ticket.belongsTo(User)

export default Ticket
