const express = require('express');
const app = express();
const courses = require('./routes/courses');
const morgan = require('morgan');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
// set via env variable - set DEBUG=app:startup or app:*

startupDebugger('hello world'); // replacing console.log with this
dbDebugger('hello world'); // control which debug to choose

app.use(express.json());
app.use(express.static('public'));
app.use('/api/customers', courses);
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

console.log(process.env.NODE_ENV, 'environments');
console.log(config.get('name'));
console.log(config.get('mail.password'), 'pwd');



app.listen(3000, () => console.log('server started'));