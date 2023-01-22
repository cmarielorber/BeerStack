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

router.put('/:id/increase', withAuth, async (req, res) => {
  try {
    const selectedBeer = await Beers.findByPk(req.params.id);
    if (!selectedBeer) {
      res.status(404).json({ message: 'There is no beer with this ID!' });
      return;
    }
    await selectedBeer.increment('likes', {by: 1});
    const updatedBeer = await Beers.findByPk(req.params.id);
    res.status(200).json(updatedBeer);
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
