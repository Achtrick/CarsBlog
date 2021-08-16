const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  comments: {
    type: "array",
  },
  image: {
    type: "string",
    required: true,
  },
});

const cars = mongoose.model("cars", carsSchema);
module.exports = cars;
