const db = require('../db');

exports.createIssue = (req,res) => {
    const { title, projectId, assigneeId, status, description, priority } = req.body;

    if (!title || !projectId || !assigneeId || !status || !description || !priority) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'insert into issues (title, projectId, assigneeId, status, description, priority) values (?, ?, ?, ?, ?, ?)';
    db.query(query, [title, projectId, assigneeId, status, description, priority], (err, results) => {
        if (err) {
            console.error('Error creating issue:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        const newIssue = {
            id: res.insertId,
            title,
            projectId,
            assigneeId,
            status,
            description,
            priority
        };

        res.status(201).json(newIssue);
    })
};

exports.getFilteredIssues = (req, res) => {
  const { status, priority, projectId } = req.query;
  let query = 'SELECT * FROM issues WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  if (priority) {
    query += ' AND priority = ?';
    params.push(priority);
  }

  if (projectId) {
    query += ' AND project_id = ?';
    params.push(projectId);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching issues:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
};
