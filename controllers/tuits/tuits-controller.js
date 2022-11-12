import posts from './tuits.js';

let tuits = posts;
const createTuit = (req, res) => {
  const newTuit = req.body;
  newTuit._id = (new Date()).getTime(); // store as a Number vs String
  newTuit.liked = false;
  newTuit.likes = 0;
  newTuit.dislikes = 0;
  newTuit.retuits = 0;
  newTuit.replies = 0;
  newTuit.time = '1s';
  tuits.push(newTuit);
  res.json(newTuit);
};
const findTuits = (req, res) => {
  res.json(tuits);
};
const updateTuit = (req, res) => {
  const tuitIdToUpdate = parseInt(req.params.tid);
  const updates = req.body;
  const tuitIndex = tuits.findIndex(t => t._id === tuitIdToUpdate);
  tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};
  res.sendStatus(200);
};
const deleteTuit = (req, res) => {
  const tuitIdToDelete = parseInt(req.params.tid); // parse to number
  tuits = tuits.filter(t => t._id !== tuitIdToDelete);
  res.sendStatus(200);
};

export default (app) => {
  app.post('/api/tuits', createTuit);
  app.get('/api/tuits', findTuits);
  app.put('/api/tuits/:tid', updateTuit);
  app.delete('/api/tuits/:tid', deleteTuit);
};