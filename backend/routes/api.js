const express = require('express');
const router = express.Router();

// Import models
const Job = require("../models/job")
const User = require("../models/user")

router.get('/jobs', function (req, res, next) {
  Job.find({}).then((jobs) => {
    res.send(jobs)
  }).catch(next);
});
router.post('/jobs/search', function (req, res, next) {
  Job.paginate({
    "position": {
      $regex: req.body.position,
      $options: 'i'
    }
  }, { page: req.body.page, limit: req.body.limit })
    .then((jobs) => {
      res.send(jobs)
    }).catch(next);
});

router.post('/jobs/export', function (req, res, next) {
  Job.find({
    "position": {
      $regex: req.body.position,
      $options: 'i'
    }
  }).then((jobs) => {
    res.send(jobs)
  }).catch(next);
});
router.post('/users/search', function (req, res, next) {
  User.find({
    "id": {
      $in: req.body.users
    }
  })
    .then((users) => {
      res.send(users)
    }).catch(next);
});

module.exports = router;