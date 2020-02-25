const express = require('express')
const app = express()
const mysql = require('mysql')
const PORT = 8080
const bodyParser=require('body-parser')

const logger = function (req, res, next) {
  next()
  console.log(`REQUEST:${req.method} ${req.url}`)
}
app.use(logger)

var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "root"
});

con.connect(function(err) {
if (err) throw err;
console.log("Connected!");
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'pug')
app.use('/games', require('./routers/games'))
app.use('/players', require('./routers/players'))

app.use((req, res, next) => {
    res.status(404)
    res.send('Not Found')
    next()
})






app.listen(PORT, () => {
	console.log("Mon serveur fonctionne sur http://localhost:"+PORT+"\n"); 
});


