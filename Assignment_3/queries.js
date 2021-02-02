// databse connectivity
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Sample",
  password: "1234",
  port: 5432,
});

// logic for getting all cars details
const getCars = (request, response) => {
  pool.query(
    'SELECT car.id AS Id, car."name" AS Car_Name, model."name" AS Model_Name, make."name" AS Maker_Name, array_agg(image.image_path) AS Car_Images FROM car INNER JOIN model ON car.model_id = model.id INNER JOIN make ON car.make_id = make.id INNER JOIN image ON car.id = image.car_id GROUP BY car.id, Car_Name, Model_Name, Maker_Name ORDER BY car.id;',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// logic for getting car details by id
const getCarById = (request, response) => {
  // takes id from parameters passed with API
  const id = parseInt(request.params.id);
  pool.query(
    'SELECT car.id AS Id, car."name" AS Car_Name, model."name" AS Model_Name, make."name" AS Maker_Name, array_agg(image.image_path) AS Car_Images FROM car INNER JOIN model ON car.model_id = model.id INNER JOIN make ON car.make_id = make.id INNER JOIN image ON car.id = image.car_id GROUP BY car.id, Model_Name, Maker_Name HAVING car.id = $1;',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const uploadImage = (id, image, createdDate, res) => {
  // insert an image path into the database and image in folder
  pool.query(
    "INSERT INTO image (image_path, car_id, created_date) VALUES ($1, $2, $3)",
    [image, id, createdDate],
    (error, results) => {
      if (error) throw error;
      // if image gets successfully saved the send the success response
      res.status(201).send(`Image ${id} uploaded successfully.`);
    }
  );
};

const createCar = async (request, response) => {
  // create a new car by taking parameters passed with the API
  const carName = request.body.carName;
  const makeName = request.body.makeName;
  const modelName = request.body.modelName;
  let modelId;
  let makeId;

  // check if car is available
  const availableCar = await pool.query(
    "SELECT name from car where name = $1",
    [carName]
  );

  // check if maker is available
  const availableMake = await pool.query(
    "SELECT id, name FROM make where name = $1",
    [makeName]
  );

  // check if model is available
  const availableModel = await pool.query(
    "SELECT id, name FROM model where name = $1",
    [modelName]
  );

  // if car is available then send car is available
  if (availableCar.rowCount >= 1) {
    response.status(409).send(`Car already exists.`);
  }

  // if maker is available then send maker is available
  else if (availableMake.rowCount >= 1) {
    response.status(409).send(`Make already exists.`);
  }

  // if model is available then send model is available
  else if (availableModel.rowCount >= 1) {
    response.status(409).send(`Model already exists.`);
  }

  // if not then insert maker
  else {
    const result1 = await pool.query(
      "INSERT INTO make (name) VALUES ($1) RETURNING id",
      [modelName]
    );
    makeId = result1.rows[0].id;

    // insert model also
    const result2 = await pool.query(
      "INSERT INTO model (name) VALUES ($1) RETURNING id",
      [modelName]
    );
    modelId = result2.rows[0].id;

    // if both are new then add new car
    if (makeId != null && modelId != null) {
      pool.query(
        "INSERT INTO car (name, make_id, model_id) VALUES ($1, $2, $3) RETURNING id",
        [carName, makeId, modelId],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(201).send(`Car ${carName} added successfully.`);
        }
      );
    }
  }
};

const updateCar = async (request, response) => {
  // update car based on the parameters passed along with the API
  const carName = request.body.carName;
  const makeName = request.body.makeName;
  const modelName = request.body.modelName;
  let carId = parseInt(request.params.id);
  let modelId;
  let makeId;
  // check for car if id is available
  const availableCar = await pool.query("SELECT * from car where id = $1", [
    carId,
  ]);
  // if car id available then check for name
  if (availableCar.rowCount > 0) {
    // if name on that id is available then car is available and update the model and maker details
    let compare = carName.localeCompare(availableCar.rows[0].name.toString());
    if (compare == 0) {
      // fetch old makers id
      const oldMakeId = await pool.query(
        "SELECT id FROM make WHERE name = $1",
        [makeName]
      );
      // fetch old model id
      const oldModelId = await pool.query(
        "SELECT id FROM model WHERE name = $1",
        [modelName]
      );
      // if model is old and maker is new
      if (oldMakeId.rowCount == 0 && oldModelId.rowCount > 0) {
        // then add new maker id and store into the variable
        const newMakeId = await pool.query(
          "INSERT INTO make (name) VALUES ($1) RETURNING id",
          [makeName]
        );
        makeId = newMakeId.rows[0].id;
        modelId = oldModelId.rows[0].id;
        // if maker is old and model is new
      } else if (oldMakeId.rowCount > 0 && oldModelId.rowCount == 0) {
        makeId = oldMakeId.rows[0].id;
        // then add new model id and store into the variable
        const newModelId = await pool.query(
          "INSERT INTO model (name) VALUES ($1) RETURNING id",
          [modelName]
        );
        modelId = newModelId.rows[0].id;
      } else {
        // if both are new then add both and fetch new ids of both
        const newMakeId = await pool.query(
          "INSERT INTO make (name) VALUES ($1) RETURNING id",
          [makeName]
        );
        const newModelId = await pool.query(
          "INSERT INTO model (name) VALUES ($1) RETURNING id",
          [modelName]
        );
        makeId = newMakeId.rows[0].id;
        modelId = newModelId.rows[0].id;
      }
      // if both variable are not null then update that car
      // maker and model info based on the passed value
      if (makeId != null && modelId != null) {
        const query3 = await pool.query(
          "UPDATE car SET make_id = $1, model_id = $2 where id = $3 RETURNING id",
          [makeId, modelId, carId]
        );
        const updatedId = query3.rows[0].id;
        response
          .status(200)
          .send(`Car ${updatedId} is available and updated successfully.`);
      }
    }
    // if car id is same but name is not same then send car not found message
    else if (compare != 0) {
      response
        .status(200)
        .send(
          `Car not found and go to http://localhost:3000/cars and post new car`
        );
    }
  }
  // if both id and name are different then also send car not found message
  else {
    response
      .status(200)
      .send(
        `Car not found and go to http://localhost:3000/cars and post new car`
      );
  }
};

const deleteCar = async (request, response) => {
  // gets id from the passed parameter with the API
  const carId = parseInt(request.params.id);
  // based on the id deleteing that car
  pool.query("DELETE FROM car WHERE id = $1", [carId], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Car ${carId} deleted successfully`);
  });
};

// routing methods
module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  uploadImage,
};
