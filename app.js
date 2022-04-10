require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
//db
const connectDb = require('./db/connect')
const parkingslotRouter = require('./routes/parkingrouter')
const bookingRouter = require('./routes/bookingrouter')
//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errprHandlerMiddleware = require('./middleware/error-handler')
const morgan = require('morgan')
app.use(morgan('tiny'))
app.use(express.json())
app.get('/api/v1/', (req, res) => res.send('fine'))
app.use('/api/v1/parking', parkingslotRouter)
app.use('/api/v1/book', bookingRouter)
app.use(notFoundMiddleware)
app.use(errprHandlerMiddleware)









const port = 3000 || process.env.PORT
const start = async () => {
    try {
        await connectDb(process.env.MONGOURL)
        app.listen(port, () => { console.log(`app is listning from ${port}`) })
    }
    catch (error) {
        console.log(error)
    }
}
start()