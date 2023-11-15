const seedUsers = require("./user-data");
const seedPosts = require("./post-data");

const sequelize = require("../config/connection");

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    process.exit(0);
};

seedAll();