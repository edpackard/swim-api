import swimController from "./controllers/swimController";

swimController.createSwim(60, "pool", new Date ("9/14/1981"))
let result = swimController.getAllSwims()
console.log(result)