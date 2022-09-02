const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const cors = require("cors");

const routes = require('../node-server/routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use( express.static( path.join(__dirname, '../react-project/build') ) );
app.use(session({
  secret:"asdf",
  resave:false,
  saveUninitialized:true,
}));



app.use('/', routes);


app.use(cors());

http.listen(8000, function(){
    console.log('listening in 8000');
});
