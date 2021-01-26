var http = require('http');

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Hello World");

    // Initializing the array of cars
    let cars = [
      {
        CarName: "Tata",
        CarModel: "Manual",
        ManufacturingYear: 2020,
        Price: 1200000,
        LastServiceDate: new Date("2020-01-18"),
      },
      {
        CarName: "Tesla",
        CarModel: "AMT",
        ManufacturingYear: 2021,
        Price: 250000000,
        LastServiceDate: new Date("2020-01-01"),
      },
      {
        CarName: "BMW",
        CarModel: "DCT",
        ManufacturingYear: 2020,
        Price: 4500000,
        LastServiceDate: new Date("2019-04-25"),
      },
      {
        CarName: "Audi",
        CarModel: "CVT",
        ManufacturingYear: 2018,
        Price: 5400000,
        LastServiceDate: new Date("2018-08-15"),
      },
      {
        CarName: "Mercedes",
        CarModel: "DCT",
        ManufacturingYear: 2019,
        Price: 9500000,
        LastServiceDate: new Date("2019-07-12"),
      },
      {
        CarName: "Skoda",
        CarModel: "CVT",
        ManufacturingYear: 2012,
        Price: 3200000,
        LastServiceDate: new Date("2015-03-02"),
      },
      {
        CarName: "Honda",
        CarModel: "Manual",
        ManufacturingYear: 2010,
        Price: 800000,
        LastServiceDate: new Date("2015-08-14"),
      },
      {
        CarName: "Bugatti",
        CarModel: "DCT",
        ManufacturingYear: 2020,
        Price: 160000000,
        LastServiceDate: new Date("2021-01-03"),
      },
      {
        CarName: "Ferrari",
        CarModel: "DCT",
        ManufacturingYear: 2015,
        Price: 80000000,
        LastServiceDate: new Date("2016-10-18"),
      },
      {
        CarName: "Pagani",
        CarModel: "DCT",
        ManufacturingYear: 2017,
        Price: 90000000,
        LastServiceDate: new Date("2019-12-08"),
      },
    ];

    //Styling and differentiating the module
    console.log("************************************************");

    // Printing the total cars available
    console.log("Total cars available is : " + cars.length);

    //Styling and differentiating the module
    console.log("************************************************");

    // Filtering a "Tata" car from the available ones
    function findACar(cars, name) {
      let availableCar = cars.find((car) => car.CarName === name);
      if (availableCar) {
        return true;
      } else {
        return false;
      }
    }

    //Initializing "Tata" to the variable
    searchCarName = "Tata";

    //Logic for if car is available
    if (findACar(cars, searchCarName) == true) {
      console.log("Don't worry we have " + searchCarName + " car available ;)");
    }
    //Logic for the if car is not available
    else {
      console.log(
        "Sorry " + searchCarName + " car is not available right now ;("
      );
    }

    //Styling and differentiating the module
    console.log("************************************************");

    // Filtering a "DCT" model car from the available ones
    function findACarModel(cars, model) {
      let availableCar = cars.find((car) => car.CarModel === model);
      if (availableCar) {
        return true;
      } else {
        return false;
      }
    }

    //Initializing "DCT" to the variable
    searchACarModel = "DCT";

    //Logic for if car is available
    if (findACarModel(cars, searchACarModel) == true) {
      console.log(
        "Don't worry we have " + searchACarModel + " cars available ;)"
      );
    }

    //Logic for the if car is not available
    else {
      console.log(
        "Sorry " + searchACarModel + " cars is not available right now ;("
      );
    }

    //Styling and differentiating the module
    console.log("************************************************");

    // Filtering cars which has been manufactured after 2015
    function carManufacturedAfterThisYear(cars, year) {
      let availableCar = cars.find((car) => car.ManufacturingYear > year);
      if (availableCar) {
        return true;
      } else {
        return false;
      }
    }

    //Initializing 2015 to the variable
    manufacturedAfterYear = 2015;

    //Logic for if car is available
    if (carManufacturedAfterThisYear(cars, manufacturedAfterYear) == true) {
      console.log(
        "We have cars that has been manufactured after " + manufacturedAfterYear
      );
    }

    //Logic for the if car is not available
    else {
      console.log(
        "Sorry we don't have any cars that has been manufactured after " +
          manufacturedAfterYear
      );
    }

    //Styling and differentiating the module
    console.log("************************************************");

    //Working with the date

    //Printing the current date and time
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log("Current date is : " + date + " time is : " + time);

    //Styling and differentiating the module
    console.log("************************************************");

    //Finding the date of one prior based on the current date
    var currentDate = new Date();
    console.log("Current date is : " + currentDate.toLocaleDateString());
    currentDate.setMonth(currentDate.getMonth() - 1);
    console.log(
      "Prior one month date on this date is : " +
        currentDate.toLocaleDateString()
    );

    //Styling and differentiating the module
    console.log("************************************************");

    //Finding the date of one month after based on the current date
    var currentDate = new Date();
    console.log("Current date is : " + currentDate.toLocaleDateString());
    currentDate.setMonth(currentDate.getMonth() + 2, 0);
    console.log(
      "After one month date on this date will be : " +
        currentDate.toLocaleDateString()
    );

    //Styling and differentiating the module
    console.log("************************************************");

    res.end();
  })
  .listen(8080);