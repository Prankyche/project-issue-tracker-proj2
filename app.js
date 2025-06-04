const express = require('express');
const app = express();
require('dotenv').config();
const issueRoutes = require('./routes/issues');
const projectRoutes = require('./routes/projects');
const commentRoutes = require('./routes/comments');

app.use(express.json());
app.use('/issues', issueRoutes);
app.use('/projects', projectRoutes);
app.use('/comments', commentRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});