"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const compression_1 = __importDefault(require("compression"));
const express_useragent_1 = __importDefault(require("express-useragent"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("../routes");
dotenv_1.default.config();
const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next_1.default({ dev });
const handle = routes_1.routes.getRequestHandler(app);
app.prepare().then(() => {
    const server = express_1.default();
    server.disable('x-powered-by');
    server.use(compression_1.default());
    server.use(helmet_1.default());
    server.use(express_useragent_1.default.express());
    server.get('*', (req, res) => {
        return handle(req, res);
    });
    server.use(handle).listen(port, (err) => {
        if (err)
            throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
//# sourceMappingURL=index.js.map