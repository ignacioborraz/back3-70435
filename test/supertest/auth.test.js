import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("TESTING: Rutas de Auth/Users", () => {
  const admin = {
    email: "igna@coder.com",
    password: "hola1234",
  };
  let userId;
  let cookies;
  it("POST /api/auth/register error 401 al registrar un usuario ya registrado", async () => {
    const response = await requester.post("/auth/register").send(admin);
    //console.log(response);
    const { status, _body } = response;
    expect(status).to.be.equals(401);
    expect(_body.error).to.be.equals("Invalid credentials");
  });
  it("POST /api/auth/register crea un usuario no registrado", async () => {
    const data = {
      email: "ignaciojavier@coder.com",
      password: "hola1234",
    };
    const response = await requester.post("/auth/register").send(data);
    //console.log(response);
    const { status, _body } = response;
    userId = _body.response._id;
    expect(status).to.be.equals(201);
  });
  it("POST /api/auth/login tiene exito el inicio de sesión", async () => {
    const response = await requester.post("/auth/login").send(admin);
    const { status, headers } = response;
    cookies = headers["set-cookie"];
    expect(status).to.be.equals(200);
  });
  it("POST /api/auth/login devuelve el mensaje correcto en la propiedad response", async () => {
    const response = await requester.post("/auth/login").send(admin);
    const { _body } = response;
    expect(_body.response).to.be.equals("Logged in");
  });
  it("POST /api/auth/online tiene exito el online y devuelve el mensaje correcto en la propiedad response", async () => {
    const response = await requester
      .post("/auth/online")
      .set("Cookie", cookies);
    const { status, _body } = response;
    expect(status).to.be.equals(200);
    expect(_body.response).to.be.equals("It's online");
  });
  it("PUT /api/users/:uid tiene exito el update", async () => {
    const response = await requester
      .put("/users/" + userId)
      .send({ name: "Ignacio" })
      .set("Cookie", cookies);
    const { status } = response;
    expect(status).to.be.equals(200);
  });
  it("DELETE /api/users/:uid tiene exito el destroy", async () => {
    const response = await requester
      .delete("/users/" + userId)
      .set("Cookie", cookies);
    const { status } = response;
    expect(status).to.be.equals(200);
  });
  it("POST /api/auth/signout", async () => {
    const response = await requester
      .post("/auth/signout")
      .set("Cookie", cookies);
    const { status } = response;
    expect(status).to.be.equals(200);
  });
});
