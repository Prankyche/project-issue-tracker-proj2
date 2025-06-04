const express = require('express');
const router = express.Router();
const { createIssue } = require('../controllers/issueController');
const { getFilteredIssues } = require('../controllers/issueController');

router.get('/', getFilteredIssues);
router.post('/', createIssue);

module.exports = router;