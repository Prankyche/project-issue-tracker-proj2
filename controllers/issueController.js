const db = require('../db');

exports.createIssue = (req,res) => {
    const { title, description, assigned_to, status, priority, deadline, project_id } = req.body;

    const query = 'insert into issues (title, description, assigned_to, status, priority, deadline, project_id) values (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [title, description, assigned_to, status, priority, deadline, project_id], (err, results) => {
        if (err) {
            console.error('Error creating issue:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        const newIssue = {
            id: res.insertId,
            title,
            description,
            assigned_to,
            status,
            priority,
            deadline,
            project_id
        };

        res.status(201).json(newIssue);
    })
};

exports.getFilteredIssues = (req, res) => {
  const { status, priority, project_id } = req.query;
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

  if (project_id) {
    query += ' AND project_id = ?';
    params.push(project_id);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching issues:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
};
