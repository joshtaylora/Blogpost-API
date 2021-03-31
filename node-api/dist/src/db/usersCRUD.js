"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex = require("./knex");
function createUser(User) {
    return knex("Users").insert(User);
}
;
function getAllUsers() {
    return knex("Users").select("*");
}
function getUserById(userId) {
    return knex("Users").select("*").where("userId", userId);
}
function deleteUser(userId) {
    return knex("Users").where("userId", userId).del();
}
module.exports = {
    createUser: createUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    deleteUser: deleteUser
};
//# sourceMappingURL=usersCRUD.js.map