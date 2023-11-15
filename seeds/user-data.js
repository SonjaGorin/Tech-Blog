const { User } = require("../models");

const userData = [{
    username: "Sonja",
    password: "123"
}];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;