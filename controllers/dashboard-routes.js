const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        const allUserPosts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                "id",
                "title",
                "content",
                "createdAt"
            ],
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
    
        const posts = allUserPosts.map((post) =>
            post.get({ plain: true })
        );
        res.render("dashboard", {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});