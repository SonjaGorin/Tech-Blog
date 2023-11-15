const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    try {
        const allComments = await Comment.findAll({})
        res.status(200).json(allComments); 
    } catch (err) {
        res.status(500).json(err);
    }
});