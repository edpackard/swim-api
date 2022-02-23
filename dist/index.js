"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swimRouter_1 = __importDefault(require("./routers/swimRouter"));
const app = (0, express_1.default)();
const PORT = 8080;
app.get('/', (_, res) => res.send('Welcome to the server'));
app.use('/swim', swimRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
