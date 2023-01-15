const sequelize = require('../config/connection');
const { User, Beers } = require('../models');

const userData = require('./userData.json');
const beerData = require('./beerData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const beer of beerData) {
    await Beers.create({
      ...beer,
    });
  }
  process.exit(0);
};

seedDatabase();
