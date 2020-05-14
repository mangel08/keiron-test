"use strict";

/* Global Imports */
import { dbTypeUser } from "../db-api/";
import { Success, Error, objectIsEmpty } from "../util";
import Debug from "debug";

/* Config Vars */
const debug = new Debug("keiron-test-backend:controllers:typeUser");

/* * * * * * * * * *  Controlller Functions * * * * * * * * * * * */

const getTypeUsers = async (req, res) => {
  debug("getTypeUsers");
  try {
    const typeUsers = await dbTypeUser.findAll();

    if (!typeUsers) return Error({ message: "TypeUser not found", status: 404 }, res);

    Success(res, { data: typeUsers, model: "typeUsers" });
  } catch (error) {
    Error(error, res);
  }
};

const getTypeUser = async (req, res) => {
  debug("getTypeUser");
  try {
    const { id } = req.params;

    if (!id) return Error("Bad request", res, 400);

    const typeUser = await dbTypeUser.findById(id);

    if (!typeUser) return Error({ message: "TypeUser not found", status: 404 }, res);

    Success(res, { data: typeUser, model: "typeUser" });
  } catch (error) {
    Error(error, res);
  }
};

const saveTypeUser = async (req, res) => {
  debug("saveTypeUser");
  try {
    const objectTypeUser = req.body;

    if (objectIsEmpty(objectTypeUser)) return Error("Bad request", res, 400);

    const typeUser = await dbTypeUser.create(objectTypeUser);

    Success(res, { data: typeUser, model: "typeUser" }, 201);
  } catch (error) {
    Error(error, res);
  }
};

const updateTypeUser = async (req, res) => {
  debug("updateTypeUser");
  try {
    const { id } = req.params;
    const objectTypeUser = req.body;

    if (objectIsEmpty(objectTypeUser) || !id) return Error("Bad request", res, 400);

    const typeUser = await dbTypeUser.update(id, objectTypeUser);

    if (!typeUser) return Error({ message: "TypeUser not found", status: 404 }, res);

    Success(res, { data: typeUser, model: "typeUser" });
  } catch (error) {
    Error(error, res);
  }
};

const deleteTypeUser = async (req, res) => {
  debug("deleteTypeUser");

  try {
    const { id } = req.params;
    if (!id) {
      return Error("Bad request", res, 400);
    }
    await dbTypeUser.delete(id);
    Success(res);
  } catch (error) {
    Error(error, res);
  }
};

export default {
  saveTypeUser,
  getTypeUsers,
  getTypeUser,
  updateTypeUser,
  deleteTypeUser,
};
