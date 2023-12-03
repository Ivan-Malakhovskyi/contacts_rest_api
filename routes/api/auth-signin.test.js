// import mongoose from "mongoose";
// import { app } from "../../app.js";
// import supertest from "supertest";
// import jwt from "jsonwebtoken";
// import User from "../../models/User.js";

// const { DB_TEST_HOST, PORT = 3000, JWT_SECRET_KEY } = process.env;

// describe("test user/signin router", () => {
//   let server = null;

//   beforeAll(async () => {
//     await mongoose.connect(DB_TEST_HOST);
//     server = app.listen(PORT);
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//     server.close();
//   });

//   test("test user/signin with true data", async () => {
//     const signinData = {
//       email: "testingsign@gmail.com",
//       subscription: "starter",
//     };

//     const { body, statusCode } = await supertest(app)
//       .post("/users/signin")
//       .send(signinData);

//     expect(statusCode).toBe(200);

//     const isUserInDB = await User.findOne({
//       email: signinData.email,
//     });

//     const comparePassword = await bcrypt.compare(password, isUserInDB.password);

//     const payload = {
//       id: isUserInDB._id,
//     };

//     const token = jwt.sign(payload, JWT_SECRET_KEY, {
//       expiresIn: "20h",
//     });

//     const isValid = await User.findByIdAndUpdate(isUserInDB._id, {
//       token,
//     });

//     expect(signinData.email).toBe(isUserInDB.email);
//     expect(body.password).toBe(comparePassword);
//     expect(signinData.token).toBe(isValid.token);
//     expect(body.subscription).toBe(isUserInDB.subscription);
//     expect(typeof signinData.email).toBe("string");
//     expect(typeof signinData.subscription).toBe("string");
//   });
// });

// //* відповідь повина мати статус-код 200
// //* у відповіді повинен повертатися токен
// //* у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
