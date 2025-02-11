const mongoose = require('mongoose');
const carsSchema = mongoose.Schema({
    carBrand: {
      type: String,
      required: true,
    },
    carName: {
      type: String,
      required: true,
    },
    carModel: {
        type: String,
        required: true,  
    },
    carColor: {
        type: String,
        required: true,  
    },

    currentCarPrice:{
        type: Number,
        required: true, 
    },

    carWeight: {
        type: String,
        required: true,   
    },
    carInsurancePackage: {
        type: String,
        required: true,
        enum: ['Bronze', 'Silver', 'Gold', 'Platinum']
 
    },
    carInsurancePrice: {
        type: Number,
        required: true, 
    }
  });
  
  const Car = mongoose.model('Car', carsSchema);
  
  module.exports = Car;
  