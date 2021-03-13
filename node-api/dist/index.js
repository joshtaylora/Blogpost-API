"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserRouter_1 = require("./routes/UserRouter");
let app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// tell express to use the UserRouter for all /Users/ routes
app.use('/Users', UserRouter_1.userRouter);
// app.use('/Posts', postRouter);
app.get('/', (req, res, next) => {
    console.log(req.url);
    res.status(200).send({ message: "hello world!" });
    // res.sendFile(path.join(process.cwd(), 'views', 'index.html'));
});
app.listen(3000);
//# sourceMappingURL=index.js.map