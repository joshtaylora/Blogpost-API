"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var UserRouter_1 = require("./routes/UserRouter");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// tell express to use the UserRouter for all /Users/ routes
app.use('/Users', UserRouter_1.userRouter);
// app.use('/Posts', postRouter);
app.get('/', function (req, res, next) {
    console.log(req.url);
    res.sendFile(path_1.default.join(process.cwd(), 'views', 'index.html'));
});
//# sourceMappingURL=index.js.map