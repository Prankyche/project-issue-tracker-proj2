const db = require('../db');

exports.createProject = (req, res) => {
    const { name, ownerId, description } = req.body;

    if (!name || !ownerId || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO projects (name, ownerId, description) VALUES (?, ?, ?)';
    db.query(query, [name, ownerId, description], (err, results) => {
        if (err) {
            console.error('Error creating project:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        const newProject = {
            id: results.insertId,
            name,
            ownerId,
            description
        };

        res.status(201).json(newProject);
    });
};