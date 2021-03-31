import express from "express";
import jwt from "jsonwebtoken";

import { db } from "./database";
import { User } from "../models/User";

const bcrypt = require("bcrypt");
const saltRounds = 10;

function retrieveUser(userId: string): User | null {
  let sql = "select * from Users where userId = $userId";
  let queryParams = {
    $userId: userId,
  };
  db.all(sql, queryParams, (err: Error, row: any[]) => {
    if (err) {
      // if an error occurs, return false;
      return null;
    } else if (row === undefined || row.length === 0) {
      return null;
    } else {
      let user = convertRowResultToUser(row);
      // console.log(JSON.parse(user.toJSON()));
      return user;
    }
  });
  return null;
}

function createUser(
  userId: string,
  firstName: string,
  lastName: string,
  emailAddress: string,
  password: string
): User | null {
  let sql =
    "insert into Users (userId, firstName, lastName, emailAddress, password) values ($userId, $firstName, $lastName, $emailAddress, $password)";

  bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
    if (err) {
      console.log(
        `error occurred while generating secure password for user ${userId}`
      );
      return null;
    } else {
      bcrypt.hash(password, salt, (err: any, hash: any) => {
        if (err) {
          return null;
        }
        let params = {
          $userId: userId,
          $firstName: firstName,
          $lastName: lastName,
          $emailAddress: emailAddress,
          $password: hash,
        };
        db.all(
          "select * from Users where userId = $userId",
          { $userId: userId },
          (err:any, rows:any[]) => {
            if (err) {
              return null;
            } else if (rows.length !== 0) {
              // if there already exists a User in the database with the userId
              // given in the request, return null
              return null;
            } else {
              db.all(sql, params, (err:any, rows:any[]) => {
                if (err) {
                  return null;
                } else {
                  let requestParams = [
                    {
                      userId: userId,
                      firstName: firstName,
                      lastName: lastName,
                      emailAddress: emailAddress,
                      password: hash,
                    },
                  ];
                  let user = convertRowResultToUser(requestParams);
                  return user;
                }
              });
            }
          }
        );
      });
    }
  });
  return null;
  // convertRowResultToUser()
}

function convertRowResultToUser(row: any[]): User {
  console.log(row);
  let result = [];
  for (var i in row[0]) {
    result.push(JSON.stringify(row[0][i]).replace(/['"]+/g, ""));
  }
  let newUser = new User(result[0], result[1], result[2], result[3], result[4]);
  return newUser;
}
export { retrieveUser, createUser, convertRowResultToUser };
