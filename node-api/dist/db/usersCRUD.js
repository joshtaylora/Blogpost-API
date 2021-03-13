"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
async function createUser(user) {
    let searchSQL = 'select userId from Users where userId=$userId';
    let searchParams = { $userId: user.userId };
    database_1.db.all(searchSQL, searchParams, (err, row) => {
        if (err) {
        }
    });
}
//# sourceMappingURL=usersCRUD.js.map