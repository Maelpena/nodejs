const express = require('express')
const app = express()
const mysql = require('mysql')
const PORT = 8080

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
 
// CREATE TABLE TODOS / USERS
/*db.open('dart.db').then(() => {
  return Promise.all([
    db.run("CREATE TABLE IF NOT EXISTS GAMES (mode, name, currentPlayerId, status , createdAt)"),
    db.run("CREATE TABLE IF NOT EXISTS PLAYERS (name, email, gameWin, gameLost, createdAt)")
  ])
})
.then(() => {
  console.log('Database ready')
})
.catch((err) => console.log('une erreur est survenue', err))

*/
app.use('/', require('./routers/games'))
//app.use('/', require('./routers/players'))

app.use((req, res, next) => {
    res.status(404)
    res.send('Not Found')
    next()
})

app.set('view engine', 'pug')



// Démarrer le serveur 
app.listen(PORT, () => {
	console.log("Mon serveur fonctionne sur http://localhost:"+PORT+"\n"); 
});






// const express = require('express')
// const app = express()
// const db = require('sqlite')
// const PORT = 8080


// //CREATE TABLE TODOS / USERS
// db.open('todolist.db').then(() => {
//   return Promise.all([
//     db.run("CREATE TABLE IF NOT EXISTS TODOS (message, completion, createdAt, updatedAt, userId)"),
//     db.run("CREATE TABLE IF NOT EXISTS USERS (firstname, lastname, username, password, email, createdAt, updatedAt)")
//   ])
// })
// .then(() => {
//   console.log('Database ready')
// })
// .catch((err) => console.log('une erreur est survenue', err))


// app.use(express.json())
// app.use(express.urlencoded({
//  extended: true
// }))

// app.set('views', './views')
// app.set('view engine', 'pug')




// app.use('/todos', require('./routes/todos'))
// app.use('/users', require('./routes/users'))

 

// app.listen(PORT, () => {
//  console.log('Serveur sur port : ', PORT)
// })