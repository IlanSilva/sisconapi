const { json } = require('express');
const express = require('express');
const app = express();
const cors = require('cors')
const customer = require('./routes/Customers');
const clients = require('./routes/Clients')
app.use(express.json());
app.use(cors())
// Routes

app.use('/requests', customer);
app.use('/clients', clients)

const port = 8082;
app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
});