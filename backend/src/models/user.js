'use strict'

/* Global imports */
import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'
import bcrypt from 'bcrypt-nodejs'
import dotenv from 'dotenv'
import TypeUser from './typeUser'

/* Config Vars */
dotenv.config()

// Schema del modelo Usuario con sequelize

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  typeUserId: { type: DataTypes.INTEGER, allowNull: false},
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
})

User.belongsTo(TypeUser)

// Función que se ejecuta antes de guardar el usuario
// Genera el cifrado del password y se lo sustituye por el password original

User.beforeCreate(async (user, options) => {
  await bcrypt.genSalt(10, (err, salt) => {
    if (err) return false
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return err
      user.password = hash
    })
  })
})

// Metodo del modelo usuario para comparar el password
User.prototype.comparePassword = async (candidatePassword, user, callback) => {
  await bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
    if (err) return callback(err)
    callback(null, isMatch)
  })
}

export default User
