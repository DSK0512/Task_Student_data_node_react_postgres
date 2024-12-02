const  express =  require('express')
const bodyParser  = require( 'body-parser')
const cors = require('cors') 
require('dotenv').config();

const studentRoutes = require('./routes/studentRoutes');

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/students', studentRoutes);

const PORT = process.env.port || 4000

app.listen(PORT, ()=> {
    console.log(`Running on ${PORT}`)
})