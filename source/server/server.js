import express from 'express'
import path from 'path'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import router from './api/v1/routes'

const app = express()

app.use( express.static( 'public' ))

app.use( bodyParser.json() )
app.use( router )

app.get('*', ( request, response ) =>
  response.sendFile( path.join( __dirname, '/../../public/index.html' ) )
)

app.listen( 3200, () =>
  console.log( chalk.green( '-:: Listening on port 3200 ::-' ) ) // eslint-disable-line no-console
)

export default app
