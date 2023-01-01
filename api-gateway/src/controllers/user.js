"use strict";
import apiAdapter from "../helper/apiAdapter.js";
import { userServiceUrl } from "../config/urlApi.js";

export function getUsers(req, res) {
  const apiUser = apiAdapter(userServiceUrl);
  apiUser
    .get("/api/get-users")
    .then((success) => {
      let users = success.data.users;
      return res.status(200).json({
        users: users,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getUser(req, res) {
  let id = req.params.id;
  const apiUser = apiAdapter(userServiceUrl);
  apiUser
    .get(`/api/get-user/${id}`)
    .then((success) => {
      return res.status(200).json({
        data: success.data.user,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function createUsers(req, res) {
  const apiUser = apiAdapter(userServiceUrl);
  apiUser
    .post("/api/add-user", req.body)
    .then((success) => {
      return res.status(200).json({
        users: success.data.message,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function updateUser(req, res) {
  const apiUser = apiAdapter(userServiceUrl);
  const id = req.params.id;
  apiUser
    .put(`/api/update-user/${id}`, req.body)
    .then((success) => {
      console.log(success);
      return res.status(200).json({
        users: success.data.message,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
      });
    });
}

export function deleteUser(req, res) {
  const apiUser = apiAdapter(userServiceUrl);
  const id = req.params.id;
  apiUser
    .delete(`/api/delete-user/${id}`)
    .then((success) => {
      return res.status(200).json({
        message: success.data.message,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
