const { User } = require("../models");

const userData = [{
    username: "Sonja",
    password: "1234567"
}];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true, returning: true });

module.exports = seedUsers;