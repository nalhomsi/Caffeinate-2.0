const express = require('express');
const { Review, Shop, User } = require('../../models/index');
const router = express.Router();

// Get all Reviews
router.get('/', (req, res) => {
    Review.findAll({
        include: [User, Shop]
    }).then(dbReviewData => res.json(dbReviewData)).catch(err => {console.log(err); res.status(500).json(err)});
});

router.get("/:username", (req, res) => {
    Review.findOne({
        include: [User, Shop]
    })
})

module.exports = router;