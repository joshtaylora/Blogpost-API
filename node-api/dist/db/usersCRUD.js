"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const User_1 = require("../models/User");
const database_1 = require("./database");
function getUserById(userId) {
    let returnVal;
    returnVal = getUserFromDB(userId, makeUserObjectFromRow);
    return returnVal;
}
exports.getUserById = getUserById;
function makeUserObjectFromRow(row) {
    if (row === null) {
        return null;
    }
    else {
        let newUser = new User_1.User(row.userId, row.firstName, row.lastName, row.emailAddress, row.password);
        return newUser;
    }
}
let UserObject;
UserObject = function (userId) {
    return getUser(userId);
};
function getUserFromDB(row) {
    return row;
}
function getUser(userId, callback) {
    let sql = 'select userId, firstName, lastName, emailAddress from Users where userId=$userId';
    let params = { $userId: userId };
    database_1.db.all(sql, params, (err, callback, row) => {
        if (err) {
            callback(null);
        }
        else if (row.length === 0) {
            callback(null);
        }
        else {
            callback(row);
        }
    });
}
//# sourceMappingURL=UsersCRUD.js.map