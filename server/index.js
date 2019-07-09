require('dotenv').config(__dirname + "./../.env")
const { checkForSession } = require('./middlewares/checkForSession')
const express = require('express')
const session = require('express-session')
const swagController = require('./controllers/swagController')
const { register, login, signOut, getUser,
    authenticator } = require('./controllers/authController')
const cartController = require("./controllers/cartController");
const searchController = require("./controllers/searchController");

const {
    SERVER_PORT,
    SESSION_SECRET
} = process.env
const app = express()

app.use(express.json())

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
)

app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`));

app.get("/api/swag", swagController.read);
app.post('/api/signout', signOut)
app.get('/api/user', getUser)
app.post('/api/login', login)
app.post('/api/register', register)
app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete);
app.get("/api/search", searchController.search);

app.listen(SERVER_PORT, () => {
    console.log(`server is up and running on ${SERVER_PORT}`);
})