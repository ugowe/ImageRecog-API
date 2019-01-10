const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'c1b1712aecd84dc180a75300a3b271a4'
});

const handleAPIcall = (req, res) => {
  app.models.initModel({ id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40" })
    .then(generalModel => {
      return generalModel.predict(req.body.input);
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'));
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
  handleImage: handleImage,
  handleAPIcall: handleAPIcall
};