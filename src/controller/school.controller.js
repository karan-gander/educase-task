import Joi from "joi";
import { v4 as uuid } from "uuid";
import connectToDB from "../db/connection.js";
import { getDistance } from "../helper/getDistance.js";

const addSchool = async (req, res) => {
  // schema vaildation

  const schoolSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.min": "Name must be at least 3 characters",
      "any.required": "Name is required",
    }),
    address: Joi.string().required().messages({
      "any.required": "Address is required",
    }),
    longitude: Joi.number().required().messages({
      "number.base": "Longitude must be a number",
      "any.required": "Longitude is required",
    }),
    latitude: Joi.number().required().messages({
      "number.base": "Latitude must be a number",
      "any.required": "Latitude is required",
    }),
  });

  const { name, address, longitude, latitude } = req.body;

  const db = await connectToDB();

  const { error, value } = schoolSchema.validate(req.body);

  if (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }

  try {
    const response = await db.query(
      "INSERT INTO schools (id,name,address,longitude,latitude) VALUES (?,?,?,?,?)",
      [uuid(), name, address, longitude, latitude]
    );
    console.log(response);
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }

  res.json({ status: true, message: "schoold added successfullly" });
};

const listSchool = async (req, res) => {
  const { longitude, latitude } = req.body;

  const db = await connectToDB();

  const Schema = Joi.object({
    longitude: Joi.number().required().messages({
      "number.base": "Longitude must be a number",
      "any.required": "Longitude is required",
    }),
    latitude: Joi.number().required().messages({
      "number.base": "Latitude must be a number",
      "any.required": "Latitude is required",
    }),
  });

  const { error, value } = Schema.validate(req.body);

  if (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }

  try {
    const response = await db.query("SELECT * FROM schools");
    // console.log(allSchools);

    const allSchools = response[0];
    // console.log(allSchools);

    const sortedSchools = allSchools
      .map((school) => ({
        ...school,
        distance: getDistance(
          latitude,
          longitude,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    return res.json({
      status: true,
      message: "schools fatched successfully",
      data:sortedSchools
    });
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

export { addSchool, listSchool };
