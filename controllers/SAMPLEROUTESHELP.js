const router = require('express').Router();
const { User, Something, Somethingexample } = require('../../models');

// The `/api/Users` endpoint

router.get('/', async(req, res) => {
    // find all Users
    try {
        const UsersData = await User.findAll({
            // be sure to include its associated Something data
            //Including Somethings
            include: [{ model: Something, through: Somethingexample, as: "Something" }]
        });
        res.status(200).json(UsersData);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.get('/:id', async(req, res) => {
    // find a single User by its `id`
    try {
        const UsersData = await User.findByPk(req.params.id, {
            // be sure to include its associated Something data
            //Including Somethings
            include: [{ model: Something, through: Somethingexample, as: "Something" }]
        });
        res.status(200).json(UsersData);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.post('/', async(req, res) => {
    // create a new User
    try {
        const UsersData = await User.create(req.body);
        res.status(200).json(UsersData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async(req, res) => {
    // update a User's name by its `id` value
    try {
        const UsersData = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(UsersData)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async(req, res) => {
    // delete on User by its `id` value
    try {
        const UserData = await User.destroy({
            where: { id: req.params.id }
        });
        if (!UserData) {
            res.status(404).json({ message: 'No User with this id!' });
            return;
        }
        res.status(200).json(UserData);
    } catch (err) {
        res.status(500).json(err);
    }
});



// SECOND EXAMPLES


const router = require('express').Router();
const { example2model1, example2model2 } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
    // find all categories
    try {
        const categoriesData = await example2model1.findAll({
            //Including the example2model2s associated with the categories
            include: [{ model: example2model2 }]
        });
        res.status(200).json(categoriesData);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.get('/:id', async(req, res) => {
    // find one example2model1 by its `id` value
    try {
        const categoriesData = await example2model1.findByPk(req.params.id, {
            //Including the example2model2s associated with the categories
            include: [{ model: example2model2 }]
        });
        res.status(200).json(categoriesData);
    } catch (err) {
        res.status(400).json(err)
    }
    // be sure to include its associated example2model2s
});

router.post('/', async(req, res) => {
    // create a new example2model1
    try {
        const example2model1Data = await example2model1.create(req.body);
        res.status(200).json(example2model1Data);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async(req, res) => {
    // update a example2model1 by its `id` value
    try {
        const example2model1Data = await example2model1.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(example2model1Data)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async(req, res) => {
    // delete a example2model1 by its `id` value
    try {
        const example2model1Data = await example2model1.destroy({
            where: { id: req.params.id }
        });
        if (!example2model1Data) {
            res.status(404).json({ message: 'No example2model1 with this id!' });
            return;
        }
        res.status(200).json(example2model1Data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;





// THIRD EXAMPLE


const router = require('express').Router();
const { example3model1, example3model2, example3model1, example3model4 } = require('../../models');

// The `/api/example3model1s` endpoint

// get all example3model1s
router.get('/', async(req, res) => {
    // find all example3model1s
    // be sure to include its associated example3model2 and example3model1 data
    try {
        const example3model1sData = await example3model1.findAll({
            //Including catgory and example3model1
            include: [{ model: example3model2, as: "example3model2" }, { model: example3model1, through: example3model4, as: "example3model1" }]
        });
        res.status(200).json(example3model1sData);
    } catch (err) {
        res.status(400).json(err)
    }
});

// get one example3model1
router.get('/:id', async(req, res) => {
    // find a single example3model1 by its `id`
    try {
        const example3model1sData = await example3model1.findByPk(req.params.id, {
            // be sure to include its associated example3model2 and example3model1 data
            //Including catgory and example3model1
            include: [{ model: example3model2, as: "example3model2" }, { model: example3model1, through: example3model4, as: "example3model1" }]
        });
        res.status(200).json(example3model1sData);
    } catch (err) {
        res.status(400).json(err)
    }
});

// create new example3model1
router.post('/', async(req, res) => {
    /* req.body should look like this...
      {
        example3model1_name: "Basketball",
        price: 200.00,
        stock: 3,
        example3model1Ids: [1, 2, 3, 4]
      }
    */
    example3model1.create(req.body)
        .then((example3model1) => {
            // if there's example3model1 example3model1s, we need to create pairings to bulk create in the example3model4 model
            if (req.body.example3model1Ids.length) {
                const example3model4IdArr = req.body.example3model1Ids.map((example3model1_id) => {
                    return {
                        example3model1_id: example3model1.id,
                        example3model1_id,
                    };
                });
                return example3model4.bulkCreate(example3model4IdArr);
            }
            // if no example3model1 example3model1s, just respond
            res.status(200).json(example3model1);
        })
        .then((example3model4Ids) => res.status(200).json(example3model4Ids))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

// update example3model1
router.put('/:id', async(req, res) => {
    // update example3model1 data
    example3model1.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        .then((example3model1) => {
            // find all associated example3model1s from example3model4
            return example3model4.findAll({ where: { example3model1_id: req.params.id } });
        })
        .then((example3model4s) => {
            // get list of current example3model1_ids
            const example3model4Ids = example3model4s.map(({ example3model1_id }) => example3model1_id);
            // create filtered list of new example3model1_ids
            const newexample3model4s = req.body.example3model1Ids
                .filter((example3model1_id) => !example3model4Ids.includes(example3model1_id))
                .map((example3model1_id) => {
                    return {
                        example3model1_id: req.params.id,
                        example3model1_id,
                    };
                });
            // figure out which ones to remove
            const example3model4sToRemove = example3model4s
                .filter(({ example3model1_id }) => !req.body.example3model1Ids.includes(example3model1_id))
                .map(({ id }) => id);

            // run both actions
            return Promise.all([
                example3model4.destroy({ where: { id: example3model4sToRemove } }),
                example3model4.bulkCreate(newexample3model4s),
            ]);
        })
        .then((updatedexample3model4s) => res.json(updatedexample3model4s))
        .catch((err) => {
            // console.log(err);
            res.status(400).json(err);
        });
});

router.delete('/:id', async(req, res) => {
    // delete one example3model1 by its `id` value
    try {
        const example3model1Data = await example3model1.destroy({
            where: { id: req.params.id }
        });
        if (!example3model1Data) {
            res.status(404).json({ message: 'No example3model1 with this id!' });
            return;
        }
        res.status(200).json(example3model1Data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;












