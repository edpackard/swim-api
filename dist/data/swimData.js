"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveData = exports.getData = void 0;
const data = [{ lengths: 60, pool: "test data", date: new Date }];
const getData = () => {
    return data;
};
exports.getData = getData;
const saveData = (object) => {
    data.push(object);
};
exports.saveData = saveData;
