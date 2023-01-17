const router = require('express').Router();
const { Beers } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBeer = await Beers.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBeer);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const beerData = await Beer.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No Beer found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
