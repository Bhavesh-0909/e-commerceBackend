const app = require('./app');
const pool = require('./database/pg.databse')
require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Server Started at ${PORT}`)
})

pool.connect();