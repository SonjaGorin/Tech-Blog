const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
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
                {
                    model: Comment,
                    attributes: ["content"],
                    include: [
                        {
                            model: User,
                            attributes: ["username"],
                        },
                    ],
                },
            ],
        });
    
        const posts = dbPostData.map((post) =>
            post.get({ plain: true })
        );
        res.render("homepage", {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/:id", withAuth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [{
                    model: User,
                    attributes: ["username"]
                },
                {
                    model: Comment,
                    attributes: ["content", "createdAt"],
                    include: [
                        {
                            model: User,
                            attributes: ["username"],
                        },
                    ],
                },
            ],
        });
        if (!post) {
            res.status(404).json({ message: "No post found with that id!" });
            return;
        }
        // const plainPost = post.get({ plain: true });
        console.log(post.get({ plain: true }))
        res.render("post", {
            "post": post.get({ plain: true }),
            // ...plainPost,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update({
            title: req.body.title,
            content: req.body.content
    },
    {
        where: {
            id: req.params.id,
        },
    });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with that id!" });
            return;
        };
        res.status(200).json(dbPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;