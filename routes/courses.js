const express = require('express');
const router = express.Router();

const customers = [
    { id: 1, name: 'john' },
    { id: 2, name: 'jane' },
    { id: 3, name: 'super' }
];

// Get
router.get('/', (req, res) => {
    res.send(customers);
});

// Get single customer
router.get('/:id', (req, res) => {
    const customer = customers.find(person => person.id === +req.params.id);
    if (!customer) return res.status(400).send('Customer not found');

    res.send(customer);
});

// POST
router.post('/', (req, res) => {
    const customer = {
        id: customers.length + 1,
        name: req.body.name
    };
    // validate client sent content
    if (Object.keys(req.body).length === 0 || req.body.name.length < 3) {
        return res.send('Name is required and length should be greater than 2');
    };

    customers.push(customer);
    res.send(customers);
});

// PUT
router.put('/:id', (req, res) => {
    const customer = customers.find(person => person.id === +req.params.id);
    if (!customer) return res.status(400).send('Customer not found');

    // validate client sent content
    if (Object.keys(req.body) === 0 || req.body.name.length < 2) {
        return res.send('Name is required and length should be greater than 2');
    };

    customer.name = req.body.name;
    res.send(customers);
});

// Delete
router.delete('/:id', (req, res) => {
    const customer = customers.find(person => person.id === +req.params.id);
    if (!customer) return res.status(400).send('Customer not found');

    const index = customers.indexOf(customer);
    customers.splice(index, 1);
    res.send(customer);
});

module.exports = router;