/* Manager Router */

// Imports
const express = require('express');

// Global vars
const router = express.Router();

// Routes
// router.get('/', (req, res, next) => {
//     res.send('This is manager home page ' + req.method);
// })

// router.post('/', (req, res, next) => {
//     res.send('This is manager home page ' + req.method);
// })

// router.put('/', (req, res, next) => {
//     res.send('This is manager home page ' + req.method);
// })

// router.delete('/', (req, res, next) => {
//     res.send('This is manager home page ' + req.method);
// })

/* re-write above methods in better way */
router.route('/')
    .get((req, res) => {
        res.send('This is manager home page ' + req.method);
    })
    .post((req, res) => {
        res.send('This is manager home page ' + req.method);
    })
    .put((req, res) => {
        res.send('This is manager home page ' + req.method);
    })
    .delete((req, res) => {
        res.send('This is manager home page ' + req.method);
    });

router.get('/dashboard', (req, res) => {
    res.send('This is manager dashboard page ' + req.method);
})

router.post('/login', (req, res) => {
    res.send('This is manager login page ' + req.method);
})

// Export
module.exports = router;