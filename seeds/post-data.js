const { Post } = require("../models");

const postData = [{
    title: "First Post",
    content: "This is the content for the first post.",
    user_id: 1
}];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;