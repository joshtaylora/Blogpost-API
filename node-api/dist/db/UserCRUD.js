"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRowResultToUser = exports.createUser = exports.retrieveUser = void 0;
const database_1 = require("./database");
const User_1 = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
function retrieveUser(userId) {
    let sql = "select * from Users where userId = $userId";
    let queryParams = {
        $userId: userId,
    };
    database_1.db.all(sql, queryParams, (err, row) => {
        if (err) {
            // if an error occurs, return false;
            return null;
        }
        else if (row === undefined || row.length === 0) {
            return null;
        }
        else {
            let user = convertRowResultToUser(row);
            // console.log(JSON.parse(user.toJSON()));
            return user;
        }
    });
    return null;
}
exports.retrieveUser = retrieveUser;
function createUser(userId, firstName, lastName, emailAddress, password) {
    let sql = "insert into Users (userId, firstName, lastName, emailAddress, password) values ($userId, $firstName, $lastName, $emailAddress, $password)";
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.log(`error occurred while generating secure password for user ${userId}`);
            return null;
        }
        else {
            bcrypt.hash(password, salt, (err, hash) => {
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
                database_1.db.all("select * from Users where userId = $userId", { $userId: userId }, (err, rows) => {
                    if (err) {
                        return null;
                    }
                    else if (rows.length !== 0) {
                        // if there already exists a User in the database with the userId
                        // given in the request, return null
                        return null;
                    }
                    else {
                        database_1.db.all(sql, params, (err, rows) => {
                            if (err) {
                                return null;
                            }
                            else {
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
                });
            });
        }
    });
    return null;
    // convertRowResultToUser()
}
exports.createUser = createUser;
function convertRowResultToUser(row) {
    console.log(row);
    let result = [];
    for (var i in row[0]) {
        result.push(JSON.stringify(row[0][i]).replace(/['"]+/g, ""));
    }
    let newUser = new User_1.User(result[0], result[1], result[2], result[3], result[4]);
    return newUser;
}
exports.convertRowResultToUser = convertRowResultToUser;
//# sourceMappingURL=UserCRUD.js.map