"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const database_1 = require("../db/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
/**
 * Get all Users
 */
userRouter.get("/", (req, res, next) => {
    let sql = "select * from Users";
    let params = [];
    database_1.db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.log({ method: "get", route: "/Users/", message: rows });
        res.status(200).json({
            message: "success",
            data: rows,
        });
    });
});
/**
 * Get User by userId
 */
userRouter.get("/:userId", (req, res, next) => {
    // omit the password from the data sent to the user
    let sql = "select userId, firstName, lastName, emailAddress from Users where userId=$userId";
    let params = { $userId: req.params.userId };
    database_1.db.all(sql, params, (err, row) => {
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }
        else if (row.length === 0) {
            res.status(404).json({
                error: `User ${req.params.userId} could not be found in the database`,
            });
            return;
        }
        else {
            console.log({ method: "get", route: "/Users/:userId", message: row[0] });
            res.status(200).json({
                message: "success",
                data: row[0],
            });
            return;
        }
    });
});
/**
 * Create new User
 * @TODO add email format validation
 * @TODO add status 409 for duplicate userId
 */
userRouter.post("/", (req, res, next) => {
    // check to see if a user with the userId submitted already exists
    let getUserSQL = "select userId from Users where userId = $userId";
    let getUserParams = {
        $userId: req.body.userId,
    };
    database_1.db.all(getUserSQL, getUserParams, (err, rows) => {
        if (err) {
            console.log({
                method: "post",
                route: "/Users/",
                error: "error occurred while checking Users database for duplicate userId",
            });
            res.status(404).send({
                error: "error occurred while querying Users table in the database",
            });
            return;
        }
        else if (rows.length > 0) {
            // This occurs when a user has been found with the userId submitted in the post request
            console.log({
                method: "post",
                route: "/Users/",
                error: `User with userId: ${req.body.userId} already exists, please try again with a unique userId`,
            });
            res.status(409).send({
                error: `User with userId: ${req.body.userId} already exists, please try again with a unique userId`,
            });
            return;
        }
        let sql = "insert into Users (userId, firstName, lastName, emailAddress, password) values ($userId, $firstName, $lastName, $emailAddress, $password)";
        bcrypt.genSalt(saltRounds, (err, salt) => {
            // if an error occurs while generating the salt, log the error to the console and return
            if (err) {
                let errorMsg = {
                    method: "post",
                    route: "/Users/",
                    error: `error occurred while generating salt for user ${req.body.userId}`,
                };
                console.log(errorMsg);
                res.status(404).send({ error: errorMsg });
                return;
            }
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    let errorMsg = {
                        method: "post",
                        route: "/Users/",
                        error: `error occurred while generating salt for user ${req.body.userId}`,
                    };
                    console.log(errorMsg);
                    res.status(404).send({ error: errorMsg });
                    return;
                }
                let params = {
                    $userId: req.body.userId,
                    $firstName: req.body.firstName,
                    $lastName: req.body.lastName,
                    $emailAddress: req.body.emailAddress,
                    $password: hash,
                };
                database_1.db.all(sql, params, (err) => {
                    if (err) {
                        console.log({ error: err.message });
                        res
                            .status(409)
                            .json({ error: "User could not be added to database" });
                        return;
                    }
                    else {
                        console.log(`User ${req.body.userId} successfuly added to database`);
                        let newUser = {
                            userId: req.body.userId,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            emailAddress: req.body.emailAddress,
                        };
                        console.log({
                            method: "post",
                            route: "/Users/",
                            message: `New user: ${JSON.stringify(newUser)}`,
                        });
                        console.log(`password: ${hash}`);
                        res.status(200).json({
                            message: `User successfully created`,
                            data: {
                                userId: req.body.userId,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                emailAddress: req.body.emailAddress,
                            },
                        });
                        return;
                    }
                });
            });
        });
    });
    // console.log(params);
});
function validateEmailFormat(emailString) {
    // create regex to match email format
    let;
}
/**
 * Update User
 * @TODO need to add authentication
 */
userRouter.patch("/:userId", (req, res, next) => {
    // Determine which values the user filled out that they want to update their User with
    let sql = "update Users set";
    let commaCheck = false;
    let fieldCheck = [];
    let updateParameters = [];
    let params = {};
    if (req.body.firstName === undefined) {
        // console.log('No first name');
        fieldCheck[0] = false;
    }
    else {
        updateParameters[0] = " firstname = $firstName";
        params["$firstName"] = req.body.firstName;
        commaCheck = true;
        fieldCheck[0] = true;
    }
    if (req.body.lastName === undefined) {
        // console.log('No last name');
        fieldCheck[1] = false;
    }
    else {
        let lastNameStr = "";
        fieldCheck[1] = true;
        if (commaCheck) {
            lastNameStr += ",";
        }
        lastNameStr += " lastName = $lastName";
        params["$lastName"] = req.body.lastName;
        updateParameters[1] = lastNameStr;
    }
    if (req.body.emailAddress === undefined) {
        // console.log('No emailAddress');
        fieldCheck[2] = false;
    }
    else {
        let emailStr = "";
        fieldCheck[2] = true;
        if (commaCheck) {
            emailStr += ",";
        }
        emailStr += " emailAddress = $emailAddress";
        params["$emailAddress"] = req.body.emailAddress;
        updateParameters[2] = emailStr;
    }
    if (req.body.password === undefined) {
        // console.log('No password');
        fieldCheck[3] = false;
    }
    else {
        let passStr = "";
        fieldCheck[4] = true;
        if (commaCheck) {
            passStr += ",";
        }
        passStr += " password = $password";
        params["$password"] = req.body.password;
        updateParameters[3] = passStr;
    }
    // console.log(updateParameters.toString());
    // add all of the fields that will be updated to the sql update command
    updateParameters.forEach((entry) => {
        sql += entry;
    });
    sql += " where userId = $userId";
    params["$userId"] = req.params.userId;
    // console.log(sql);
    // console.log(params);
    database_1.db.all(sql, params, (err) => {
        if (err) {
            console.log({ error: err.message });
            res.status(404).json({ error: "User could not be updated" });
            return;
        }
        console.log({
            method: "patch",
            route: "/Users/:userId",
            message: `User ${req.params.userId} successfully updated`,
        });
        res
            .status(200)
            .json({ message: `User ${req.params.userId} successfully updated` });
        return;
    });
});
/**
 * Delete User
 */
userRouter.delete("/:userId", (req, res, next) => {
    let sql = "delete from Users where userId = $userId";
    let params = {
        $userId: req.params.userId,
    };
    if (req.headers.authorization) {
        try {
            let tokenPayload = jsonwebtoken_1.default.verify(req.headers.authorization.toString().split(" ")[1], index_1.secret);
            database_1.db.all("select * from Users where userId = $userId", { $userId: req.params.userId }, (err, row) => {
                if (err) {
                    console.log({
                        method: "delete",
                        route: "/Users/:userId",
                        error: `User ${req.params.userId} attempted to be deleted but could not be found in the Users Table`,
                    });
                    res
                        .status(404)
                        .json({ error: `User ${req.params.userId} could not be found` });
                    return;
                }
                else if (row.length === 0) {
                    console.log({
                        method: "delete",
                        route: "/Users/:userId",
                        error: `User ${req.params.userId} attempted to be deleted but could not be found in the Users Table`,
                    });
                    res
                        .status(404)
                        .json({ error: `User ${req.params.userId} could not be found` });
                    return;
                }
                else {
                    let userIdQueryStr = JSON.stringify(row[0].userId);
                    let user = userIdQueryStr.replace(/['"]+/g, "");
                    if (tokenPayload.userId === user) {
                        database_1.db.all(sql, params, (err) => {
                            if (err) {
                                console.log({
                                    method: "delete",
                                    route: "/Users/:userId",
                                    error: `User ${req.params.userId} could not be deleted`,
                                });
                                res.status(404).json({
                                    error: `User ${req.params.userId} could not be deleted`,
                                });
                                return;
                            }
                            else {
                                console.log({
                                    method: "delete",
                                    route: "/Users/:userId",
                                    message: `User ${req.params.userId} successfully deleted`,
                                });
                                res.status(204).send({
                                    message: `User ${req.params.userId} successfully deleted`,
                                });
                                return;
                            }
                        });
                    }
                    else {
                        console.log({
                            method: "delete",
                            route: "/Users/:userId",
                            error: `User ${req.params.userId} could not be deleted`,
                        });
                        res.status(401).json({
                            error: `User ${req.params.userId} could not be deleted, you must login as the user you wish to delete first`,
                        });
                        return;
                    }
                }
            });
        }
        catch (err) {
            console.log({
                method: "delete",
                route: "/Users/:userId",
                error: err.message,
            });
            res.status(401).send({ message: "invalid web token" });
            return;
        }
    }
});
/**
 * Login
 */
userRouter.get("/:userId/:password", (req, res, next) => {
    let sqlPassword = "select password from Users where userId=$userId";
    let paramsPassword = { $userId: req.params.userId };
    database_1.db.all(sqlPassword, paramsPassword, (err, row) => {
        if (err) {
            console.log({
                error: `Password for user ${req.params.userId} could not be retrieved from database`,
            });
            res.status(404).json({
                error: `Password for user ${req.params.userId} could not be retrieved from database`,
            });
            return;
        }
        else if (row.length === 0 || row === undefined) {
            console.log({ error: `Password for user ${req.params.userId}` });
            res.status(404).json({
                error: `Password for user ${req.params.userId} unable to be retrieved`,
            });
            return;
        }
        else {
            let passString = JSON.stringify(row[0].password);
            let pass = passString.replace(/['"]+/g, "");
            // if we were able to find the password, decrypt it and compare to the password passed as a request url param
            bcrypt.compare(req.params.password, pass, (err, result) => {
                if (err) {
                    console.log({
                        error: `error occurred when comparing hashed password ${pass} to url parameter ${req.params.password}`,
                    });
                    res.status(401).json({
                        error: `Password for user ${req.params.userId} could not be validated.`,
                    });
                    return;
                }
                else if (result === false) {
                    // if the passwords don't match, return code 401
                    console.log({
                        error: ` hashed password ${pass} did not match the url parameter ${req.params.password}`,
                    });
                    res.status(401).json({
                        error: `Password for user ${req.params.userId} could not be validated.`,
                    });
                    return;
                }
                else {
                    // enters this block if the passwords do match
                    console.log({
                        method: "get",
                        route: "/Users/:userId/:password",
                        message: `User ${req.params.userId} successfully authenticated`,
                        data: { DBpassword: pass, USERpassword: req.params.password },
                    });
                    let authorization = jsonwebtoken_1.default.sign({ userId: req.params.userId }, index_1.secret, {
                        expiresIn: 60 * 60,
                        subject: req.params.userId,
                    });
                    console.log("token successfully created");
                    res.status(200).send(`Authorization:Bearer ${authorization}`);
                    return;
                }
            });
        }
    });
});
//# sourceMappingURL=UserRouter.js.map