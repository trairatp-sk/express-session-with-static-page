const app = require('./api/index.js');

const port = 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
