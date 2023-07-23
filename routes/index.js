const router = require('express').Router();

const fs = require('fs');

const rootDir = require('../utils/path');

router.post('/add_user', async (req, res, next) => {
    let users = [];
    console.log('You\'re trying to add a user?');

    await fs.readFile('./users.txt', 'utf8', (err, data) => {
        if(err) {
            console.log(`Error: ${err}`);
            return;
        }
        users = JSON.parse(data);
        users.push(req.body);
    
        fs.writeFile('./users.txt', JSON.stringify(users), (err) => {
            // Will redirect to the root path
            res.writeHead(302, {'Location': '/users'});
            return res.end();
        });
    });
});

router.get("/users", async (req, res, next) => {
    let users = [];
    console.log('Wanna see all of the users?');

    await fs.readFile('./users.txt', 'utf8', (err, data) => {
        if(err) {
            console.log(`Error: ${err}`);
            return;
        }
        users = JSON.parse(data);
        console.log(users);
        console.log(`${users.length}`);
    
        res.render('users_display', {
            users,
            docTitle: 'Users',
            path: '/users',
        });
    });
});

router.get("/", (req, res, next) => {
    console.log('User form page');
    res.render('users_form', {
        docTitle: 'User form',
        path: '/',
    });
});

module.exports.routes = router;