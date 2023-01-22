const router = require('express').Router();
const { Beers } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const beerData = await (await Beers.findAll()).sort((a, b) => {
      return a.likes > b.likes;
    });

    res.status(200).json(beerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newBeer = await Beers.create({
      ...req.body
    });

    res.status(200).json(newBeer);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id/increase', async (req, res) => {
  try {
    const currentData = await Beers.findByPk(req.params.id);
    const updateData = await Beers.update(req.body, {
      where: {
        likes: currentData.likes + 1,
      },
    });
    if (!updateData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(updateData);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const beerData = await Beers.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!beerData) {
      res.status(404).json({ message: 'No Beer found with this id!' });
      return;
    }

    res.status(200).json(beerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
