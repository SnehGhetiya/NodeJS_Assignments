var StatusCode = require("http-status-codes");
var dbConnection = require("../../../utilities/postgresql-connection.js");
var settings = require("../../../config.js");
var validate = require("validator");
var HttpStatusCode = require("http-status-codes");

exports.getCarById = function (req, res) {
  var entityData = {
    Id: req.params.id,
  };

  function validateFields(req, res) {
    return new Promise(function (resolve, reject) {
      var isCarIdEmpty = validate.isEmpty(entityData.Id);
      if (isCarIdEmpty) {
        return resolve({
          status: HttpStatusCode.StatusCodes.BAD_REQUEST,
          result: req.i18n.__("CarIdRequired"),
        });
      }

      return resolve({
        status: HttpStatusCode.StatusCodes.OK,
        data: entityData,
      });
    });
  }

  function getCarById(req, entityData) {
    return new Promise(function (resolve, reject) {
      const sqlQuery =
        'SELECT car.id AS Id, car."name" AS Car_Name, model."name" AS Model_Name, make."name" AS Maker_Name, array_agg(image.image_path) AS Car_Images FROM car INNER JOIN model ON car.model_id = model.id INNER JOIN make ON car.make_id = make.id INNER JOIN image ON car.id = image.car_id GROUP BY car.id, Model_Name, Maker_Name HAVING car.id = ' +
        entityData.Id;
      dbConnection
        .getResult(sqlQuery)
        .then(function (response) {
          if (response.data.length > 0) {
            return resolve({
              status: HttpStatusCode.StatusCodes.OK,
              data: response,
              message: "Record listed successfully!!!",
            });
          } else {
            return resolve({
              status: HttpStatusCode.StatusCodes.OK,
              data: [],
              message: "No record found!!!",
            });
          }
        })
        .catch(function (error) {
          res.status(error.status).json({
            data: error.data,
          });
        });
    });
  }

  validateFields(req, res)
    .then(function (response) {
      getCarById(req, response.data)
        .then(function (response) {
          res.status(response.status).json({
            data: response.data.data,
            message: response.message,
          });
        })
        .catch(function (error) {
          res.status(error.status).json({
            data: error.data,
          });
        });
    })
    .catch(function (error) {
      res.status(error.status).json({
        data: error.data,
      });
    });
};
