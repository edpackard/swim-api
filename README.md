Playing with TypeScript - trying to TDD an API to log swims.

Technologies used:

node.js with typescript
express

jest
supertest

data currently stored in a local array which is lost when the app is terminated

Install API (using npm)

```
git clone https://github.com/edpackard/swim-api.git
npm install
```

Run API

```
npm run build
npm start
open http://localhost:8080
```

Run tests

```
npm test
```

API Routes (in progress)

```
/swim POST
/swim GET
/swim/:id GET
/swim/:id PUT
/swim/:id DELETE

/pool POST
/pool GET
/pool/:id GET
```
