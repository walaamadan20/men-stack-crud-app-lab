const express = require('express');
const carRouter = express.Router();
const Car = require('../models/cars');


//get all cars
carRouter.get("/", async(req,res)=>{
    const allCars = await Car.find()
    console.log(allCars)
    res.render("cars/index.ejs",{allCars: allCars})

})

//delete car
carRouter.delete("/:carId",async (req,res)=>{
    try{
        await Car.findByIdAndDelete(req.params.carId)

      res.redirect('/cars')
  
    }catch(error){
      console.log(error)
      res.redirect("/")
    }
  })

//Create cars
carRouter.get("/create",(req,res)=>{
    res.render("cars/new.ejs")
})



// Create a new car
carRouter.post('/', async (req, res) => {
    try {
        req.body.owner = req.session.user._id; // Set the owner to the logged-in user
        const newCar = await Car.create(req.body); // Create the car
        res.redirect(`/cars/${newCar._id}`); // Redirect to the newly created car's show page
    } catch (error) {
        console.log(error);
        res.redirect('/'); // Redirect to home on error
    }
});
// Show a specific car
carRouter.get('/:carId', async (req, res) => {
    try {
        console.log("in create")
        const currentCar = await Car.findById(req.params.carId);
        if (!currentCar) {
            return res.status(404).send('Car not found');
        }
        res.render('cars/show.ejs', { car: currentCar }); // Pass the Car to the view
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
// Edit an existing car
carRouter.get('/:carId/edit', async (req, res) => {
    try {
        const currentCar = await Car.findById(req.params.carId);
        if (!currentCar) {
            return res.status(404).send('Car not found');
        }
        res.render('cars/edit.ejs', {
            currentCar // Pass the current car to the view
});
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
// Update an existing car
carRouter.put('/:carId', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.carId, req.body); // Update the car
        if (!updatedCar) {
            return res.status(404).send('car not found');
        }
        res.redirect(`/cars/${updatedCar._id}`); // Redirect to the updated car page
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = carRouter;