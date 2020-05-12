'use strict'

import dotenv from 'dotenv'
import { dbUser, dbTypeUser } from '../db-api'
dotenv.config()


const userTypes = [
  {
    id: 1,
    name: "admin"
  },
  {
    id: 2,
    name: "user"
  }
]

const defaultUserAdmin = {
    id: 1,
    typeUserId: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: "123456"
  }

const createDefaultAdminUser = async () => {
  try {
    const response = await dbUser.create(defaultUserAdmin)
    console.log("guardo")
  } catch (error) {
    console.log(error)
  }
}

const createUserTypes = async () => {
  try {
    for (let user of userTypes) {
      await dbTypeUser.create(user)
    }
  } catch (error) {
    console.log(error)
  }
}

const createData = async () => {
  const typesUsers = await dbTypeUser.findAll()
  const userAdmin = await dbUser.findByEmail("johndoe@gmail.com")

  if (typesUsers.length == 0) createUserTypes()
  if (!userAdmin) createDefaultAdminUser()
  
}

export default createData
