"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swimController_1 = __importDefault(require("../controllers/swimController"));
const swimRouter = (0, express_1.Router)();
swimRouter.get('/', (_, res) => {
    const allSwims = swimController_1.default.getAllSwims();
    res.json(allSwims);
});
exports.default = swimRouter;
