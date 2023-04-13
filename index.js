const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


//const sequelize = require('./database/db');
//const Events = require('./models/events');

//sequelize.sync();
//Events.sync();