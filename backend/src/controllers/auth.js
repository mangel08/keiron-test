"use strict";

/* Global Imports */
import dotenv from "dotenv";
import { dbUser } from "../db-api/";
import { Success, Error, objectIsEmpty } from "../util";
import { createToken } from "../services";
import Debug from "debug";

/* Config Vars */
dotenv.config();

/* Config Vars */
const debug = new Debug("keiron-test-backend:controllers:auth");

const register = async (req, res) => {
  debug("Register");
  try {
    const { body } = req;

    if (objectIsEmpty(body)) {
      return Error("Bad Request", res, 400);
    }

    console.log(body);

    const { name, email, password } = body;
    console.log(password);

    if (!name || !email || !password) {
      return Error("Bad Request", res, 400);
    }

    const findUser = await dbUser.findByEmail(body.email);

    if (findUser) {
      return handleRegisterFailed(res, "This email already exist");
    } else {
      let objectUser = body;
      objectUser.typeUserId = process.env.DEFAULT_TYPE_USER;
      const userSaved = await dbUser.create(objectUser);
      const user = await dbUser.findUserTypeById(userSaved.id);
      const token = await createToken(user);
      const response = generateResponse(user, token);

      Success(res, { data: response, model: "data" }, 201);
    }
  } catch (error) {
    Error(error, res);
  }
};

const login = async (req, res) => {
  debug("Login");
  try {
    const { body } = req;
    if (objectIsEmpty(body)) {
      return Error("Bad Request", res, 400);
    }
    const { email, password } = body;

    if (!email || !password) {
      return Error("Bad Request", res, 400);
    }

    const user = await dbUser.findUserTypeByEmail(email);
    if (!user) {
      // validation if the email of user doesn't exist
      return handleLoginFailed(res);
    } else {
      await user.comparePassword(password, user, function (error, match) {
        if (error) Error(error, res);
        else if (match) {
          const token = createToken(user);
          const response = generateResponse(user, token);
          Success(res, { data: response, model: "data" }, 200);
        } else {
          return handleLoginFailed(res, "The username and password is invalid.");
        }
      });
    }
  } catch (error) {
    Error(error, res);
  }
};

/* Function to handle Errors in Login */
function handleLoginFailed(res, message) {
  console.error(message || "The user with email doesn't exist");
  res.status(401).send({
    message: message || "The user with email doesn't exist",
    error: "Login failed",
  });
}

function handleRegisterFailed(res, message) {
  console.error(message || "This email already exist");
  res.status(409).send({
    message: message || "This email already exist",
    error: "Register Failed",
  });
}

/* Function to generate the response object
 * params:
 * 1) User Object
 * 2) Person Object
 * 3) JWT token
 */
function generateResponse(user, token) {
  const response = {
    id: user.id,
    name: user.name,
    email: user.email,
    type_user: user.type_user,
    token,
  };

  return response;
}

/* Function to generate the objectUser
 * params:
 * 1) Object user
 * 2) personId
 */

export default {
  register,
  login,
};
