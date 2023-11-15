const router = require("express").Router();
const { Post, User } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });
    
        const posts = dbPostData.map((post) =>
            post.get({ plain: true })
        );
        res.render("main", {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [{
                    model: User,
                    attributes: ["username"]
            }],
        });
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with that id!" });
            return;
        }
            res.status(200).json(dbPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});