const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log("listening port 3000"));

app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response)=>{
    console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json({
        status: 'success',
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.lon
    });
});