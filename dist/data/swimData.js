"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveData = exports.getData = void 0;
const data = [];
const getData = () => {
    return data;
};
exports.getData = getData;
const saveData = (object) => {
    data.push(object);
};
exports.saveData = saveData;
