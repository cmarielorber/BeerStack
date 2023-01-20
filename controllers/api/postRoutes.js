router.post('/dashboard', async (req, res) => {
    console.log(req.body)
    try {
      const userData = await User.create(req.body);
      req.session.save(() => {
        req.session.title = userData.title;
        req.session.description = userData.description;
        req.session.user_id = userData.user_id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    } 
  });