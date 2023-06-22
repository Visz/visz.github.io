const express = require('express');
const mongoose = require('mongoose');
const groupRoutes = require('./routes/groupRoutes');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/myapp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/groups', groupRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(express.json());
app.use('/', groupRoutes);
