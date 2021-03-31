"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var connectedKnexDB = knex_1.default({
    client: "sqlite3",
    connection: {
        filename: "Usrs.sqlite3"
    }
});
module.exports = connectedKnexDB;
//# sourceMappingURL=knex.js.map