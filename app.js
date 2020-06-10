const express = require("express")
const session = require("express-session")
const path    = require('path')
const app     = express()
const http    = require('http')
const server  = http.createServer(app)
const Login = require('./routes/Login');
const bodyParser= require('body-parser');
const Patient = require('./routes/PagerPatient');
const Doctor = require('./routes/PagerDoctor');
const Receptionist = require('./routes/PagerReceptionist');

app.use(express.static(path.join(__dirname, 'Public')))
app.set('views', path.join(__dirname, 'views'));
app.set("views","./views")
app.set('view engine', 'ejs')

app.use(session({
    secret:'whatever',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use("/",Login)
app.use("/Patient",Patient)
app.use("/Doctor",Doctor)
app.use("/Receptioniste",Receptionist)


const port = process.env.PORT || 3000;

const serv = server.listen( port, () => console.log("Listening on port " + port + " ...") )

module.exports = app;