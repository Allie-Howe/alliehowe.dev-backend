import express from 'express';

const app = express();
const port = process.env.PORT || 4321;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening on port ${port}`);
});
