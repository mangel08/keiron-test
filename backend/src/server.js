'use strict'

/* Global Imports */
import api from './api'
import Debug from 'debug'
import chalk from 'chalk'
import dotenv from 'dotenv'
import { handleFatalError } from './util/'
import sequelize from './sequelize'
import InitialData from './initialData/'

/* Config Vars */
dotenv.config()
const debug = new Debug('keiron-test-backend:root')

/* Config HandleErrors in server */
process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

async function start () {
  await sequelize.sync()
  await sequelize.authenticate()
  await InitialData()
  api.listen(process.env.PORT, () => {
    debug(
      chalk`{green.bold API Server ${process.env.APP_NAME} listening on http://localhost:${process.env.PORT} 🆗}`
    )
    debug(chalk`{magenta.bold ProcessID: ${process.pid}}`)
  })
}

start()
