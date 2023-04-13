const controller = require('./controllers/eventController');
const sequelize = require('./database/db');
const Events = require('./models/events');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

sequelize.sync();
Events.sync();

app.get('/events', controller.listEvents);
app.get('/event/:id', controller.searchByKey);
app.post('/eventsave', controller.saveEvent);
app.delete('/eventdelete/:id', controller.deleteEvent);
app.put('/eventupdate/:id', controller.updateEvent);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});