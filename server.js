const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory data store
let items = [];

// Create (POST)
app.post('/items', (req, res) => {
    const newItem = req.body;
    if (!newItem.name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    newItem.id = items.length + 1;
    items.push(newItem);
    res.status(201).json(newItem);
});

// Read (GET)
app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
});

// Update (PUT)
app.put('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    const updatedItem = req.body;
    updatedItem.id = parseInt(req.params.id);
    items[itemIndex] = updatedItem;
    res.json(updatedItem);
});
// Delete (DELETE)
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    items.splice(itemIndex, 1);
    res.status(204).send();
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
