const db = require('../db');

exports.addComment = (req, res) => {
    const {issueId, userId, commentText} = req.body;

    if (!issueId || !userId || !commentText) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'insert into comments (issueId, userId, commentText) values (?, ?, ?)';
    db.query(query, [issueId, userId, commentText], (err, results) => {
        if (err) {
            console.error('Error adding comment: ', err);
            return res.status(500).json({ error: 'Database error' });
        }
        const newComment = {
            id: results.insertId,
            issueId,
            userId,
            commentText
        };
        res.status(201).json(newComment);
    });
};