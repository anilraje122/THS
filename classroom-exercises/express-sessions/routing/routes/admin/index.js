/* Admin Router */

// Imports
const express = require('express');

// Global vars
const router = express.Router();

// Routes
router.get('/', (req, res) => {
    res.send('This is admin home page ' + req.method);
})

router.post('/', (req, res) => {
    res.send('This is admin home page ' + req.method);
})

router.put('/', (req, res) => {
    res.send('This is admin home page ' + req.method);
})

router.delete('/', (req, res) => {
    res.send('This is admin home page ' + req.method);
})

router.get('/dashboard', (req, res) => {
    res.send('This is admin dashboard page ' + req.method);
})

router.post('/login', (req, res) => {
    res.send('This is admin login page ' + req.method);
})

// Export
module.exports = router;