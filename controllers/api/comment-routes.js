const router = require("express").Router();
const { Comment, Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    try {
        const allComments = await Comment.findAll({})
        res.status(200).json(allComments); 
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id, {
            include: [{
                model: Post,
            }],
        });
        if (!comment) {
            res.status(404).json({ message: "No comment found with that id!" });
            return;
          };
          res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
      }
});