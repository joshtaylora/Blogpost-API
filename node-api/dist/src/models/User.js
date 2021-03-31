"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(userId, firstName, lastName, emailAddress, password) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
    }
    User.prototype.toJSON = function () {
        return JSON.stringify(Object.assign({}, this));
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map