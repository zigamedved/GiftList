const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = '92cd6d009aba2b9860f22f81cf2a5d2d90a02b05816dc46e6e8d907c77c7de62';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {proof, name, } = req.body;
  if(!name || !proof){
    res.send("Please provide all data in request body!");
    return
  }

  console.log("Verifying given proof ", )

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
