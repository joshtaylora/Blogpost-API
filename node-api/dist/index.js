"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const UserRouter_1 = require("./routes/UserRouter");
const PostRouter_1 = require("./routes/PostRouter");
const secret = 'Mz8YXF6ZxLIAUX_mTJ-SwTLm-QRLwPLLdMoW3XKhzag';
exports.secret = secret;
let app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// tell express to use the UserRouter for all /Users/ routes
app.use('/Users', UserRouter_1.userRouter);
app.use('/Posts', PostRouter_1.postRouter);
app.get('/', (req, res, next) => {
    console.log(req.url);
    res.sendFile(path_1.default.join(process.cwd(), 'views', 'help.html'));
    // res.sendFile(path.join(process.cwd(), 'views', 'index.html'));
});
app.listen(3000);
//# sourceMappingURL=index.js.map