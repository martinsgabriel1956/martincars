const express = require('express');
const routes = express.Router();

let data = [];

routes.get('/', (req, res) => res.json(data));

routes.post("/", (req, res) => {
  const { image, brandModel, year, plate, color} = req.body;

  data.push({
    image,
    brandModel,
    year,
    plate,
    color
  });

  return res.json({ message: "Success" })  
})

module.exports = routes;