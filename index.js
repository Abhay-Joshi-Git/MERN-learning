const express = require ('express');

let app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there'});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('server started at 8080');
});