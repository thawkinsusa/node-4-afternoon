const users = require('../models/users')
let id = 1;

function register(req, res) {

    const { session } = req;
    const { username, password } = req.body
    users.push({ id, username, password })
    id++;
    session.user.username = username;
    res.status(200).send(session.user)
}

function login(req, res) {
 
    const { session } = req;
    const { username, password } = req.body;

    const user = users.find(
      user => user.username === username && user.password === password
    );

    if (user) {
      session.user.username = user.username;
      res.status(200).send(session.user);
    } else {
      res.status(500).send("Unauthorized.");
    }
}


function signOut(req, res) {
    req.session.destroy()
    res.status(200).send(req.session);
}

function getUser(req, res) {
    const{session} = req;
    res.status(200).send(session.user)
}

function authenticator() {
    const { session } = req;
}

module.exports = {
    register,
    login,
    signOut,
    getUser,
    authenticator
}