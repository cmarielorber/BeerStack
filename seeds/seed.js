const sequelize = require('../config/connection');
const { User, Beers, Post } = require('../models');

const userData = require('./userData.json');
const beerData = require('./beerData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Beers.bulkCreate(beerData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });
  
  console.log('\n---------Seeding Complete---------\n')
  process.exit(0);

};

seedDatabase();
