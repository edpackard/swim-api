"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swimController_1 = __importDefault(require("./controllers/swimController"));
swimController_1.default.createSwim(60, "pool", new Date("9/14/1981"));
let result = swimController_1.default.getAllSwims();
console.log(result);
