"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("../db/database");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get('/', (req, res, next) => {
    let sql = 'select * from Users';
    let params = [];
    database_1.db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        console.log({ method: 'get', route: '/Users/', message: rows });
        res.status(200).json({
            message: "success",
            data: rows
        });
    });
});
userRouter.get('/:uid', (req, res, next) => {
    getUser(req.params.uid, print);
    // omit the password from the data sent to the user
    let sql = 'select userId, firstName, lastName, emailAddress from Users where userId=$userId';
    let params = { $userId: req.params.uid };
    database_1.db.all(sql, params, (err, row) => {
        if (err) {
            res.status(401).json({ error: err.message });
            return;
        }
        console.log({ method: 'get', route: '/Users/:userId', message: row });
        res.status(200).json({
            message: "success",
            data: row
        });
    });
});
userRouter.post('/', (req, res, next) => {
    let sql = "insert into Users (userId, firstName, lastName, emailAddress, password) values ($userId, $firstName, $lastName, $emailAddress, $password)";
    let params = {
        $userId: req.body.userId,
        $firstName: req.body.firstName,
        $lastName: req.body.lastName,
        $emailAddress: req.body.emailAddress,
        $password: req.body.password
    };
    // console.log(params);
    database_1.db.all(sql, params, (err) => {
        if (err) {
            console.log({ error: err.message });
            res.status(409).json({ error: "User could not be added to database" });
        }
        else {
            console.log('User successfuly added to database');
        }
    });
    let newUser = {
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress
    };
    console.log({ method: 'post', route: '/Users/', message: `New user: ${JSON.stringify(newUser)}` });
    res.status(200).json({
        message: `User successfully created`,
        data: {
            userId: req.body.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress
        }
    });
});
userRouter.patch('/:uid', (req, res, next) => {
    // Determine which values the user filled out that they want to update their User with
    let sql = 'update Users set';
    let commaCheck = false;
    let fieldCheck = [];
    let updateParameters = [];
    let params = {};
    if (req.body.firstName === undefined) {
        // console.log('No first name');
        fieldCheck[0] = false;
    }
    else {
        updateParameters[0] = ' firstname = $firstName';
        params["$firstName"] = req.body.firstName;
        commaCheck = true;
        fieldCheck[0] = true;
    }
    if (req.body.lastName === undefined) {
        // console.log('No last name');
        fieldCheck[1] = false;
    }
    else {
        let lastNameStr = '';
        fieldCheck[1] = true;
        if (commaCheck) {
            lastNameStr += ',';
        }
        lastNameStr += ' lastName = $lastName';
        params["$lastName"] = req.body.lastName;
        updateParameters[1] = lastNameStr;
    }
    if (req.body.emailAddress === undefined) {
        // console.log('No emailAddress');
        fieldCheck[2] = false;
    }
    else {
        let emailStr = '';
        fieldCheck[2] = true;
        if (commaCheck) {
            emailStr += ',';
        }
        emailStr += ' emailAddress = $emailAddress';
        params["$emailAddress"] = req.body.emailAddress;
        updateParameters[2] = emailStr;
    }
    if (req.body.password === undefined) {
        // console.log('No password');
        fieldCheck[3] = false;
    }
    else {
        let passStr = '';
        fieldCheck[4] = true;
        if (commaCheck) {
            passStr += ',';
        }
        passStr += ' password = $password';
        params["$password"] = req.body.password;
        updateParameters[3] = passStr;
    }
    // console.log(updateParameters.toString());
    // add all of the fields that will be updated to the sql update command
    updateParameters.forEach((entry) => {
        sql += entry;
    });
    sql += ' where userId = $userId';
    params["$userId"] = req.params.uid;
    // console.log(sql);
    // console.log(params);
    database_1.db.all(sql, params, (err) => {
        if (err) {
            console.log({ error: err.message });
            res.status(404).json({ error: "User could not be updated" });
        }
        console.log({ method: 'patch', route: '/Users/:userId', message: `User ${req.params.uid} successfully updated` });
        res.status(200).json({ message: `User ${req.params.uid} successfully updated` });
    });
});
userRouter.delete('/:uid', (req, res, next) => {
    let sql = 'delete from Users where userId = $userId';
    let params = {
        $userId: req.params.uid
    };
    database_1.db.all('select * from Users where userId = $userId', { $userId: req.params.uid }, (err, row) => {
        if (err) {
            console.log({ error: `User ${req.params.uid} attempted to be deleted but could not be found in the Users Table` });
            res.status(404).json({ error: `User ${req.params.uid} could not be found` });
            return;
        }
        if (row.length === 0) {
            console.log({ error: `User ${req.params.uid} attempted to be deleted but could not be found in the Users Table` });
            res.status(404).json({ error: `User ${req.params.uid} could not be found` });
            return;
        }
        else {
            database_1.db.all(sql, params, (err) => {
                if (err) {
                    console.log({ error: `User ${req.params.uid} could not be deleted` });
                    res.status(404).json({ error: `User ${req.params.uid} could not be deleted` });
                    return;
                }
                else {
                    console.log({ method: 'delete', route: '/Users/:userId', message: `User ${req.params.uid} successfully deleted` });
                    res.status(204).json({ message: `User ${req.params.uid} successfully deleted` });
                    return;
                }
            });
        }
    });
});
function getAllUsers(callback) {
    let queryStr = "SELECT * FROM Users";
    database_1.db.all(queryStr, (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
            callback(rows);
        }
    });
}
function print(rows) {
    console.log(rows);
}
function returnRows(rows) {
    return rows;
}
function getUser(userId, callback) {
    let queryStr = 'SELECT * FROM Users WHERE userId=$userId';
    database_1.db.all(queryStr, { $userId: userId }, (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            callback(row);
        }
    });
}
//# sourceMappingURL=UserRouter.js.map