import "dotenv/config.js";
import { expect } from "chai";
import dbConnect from "../../src/helpers/dbConnect.helper.js";
import { productsManager } from "../../src/dao/manager.mongo.js";

describe("TESTING: Servicio de Productos", () => {
  let productId;
  before(async () => await dbConnect(process.env.LINK_DB));
  it("Se debe crear un producto correctamente", async () => {
    const response = await productsManager.createOne({
      title: "producto de prueba",
    });
    productId = response._id;
    expect(response).to.have.property("_id");
    expect(response._id).to.be.a("object");
    expect(response).to.have.property("stock");
    expect(response.stock).to.be.a("number");
    expect(response).to.have.property("price");
    expect(response.stock).to.be.a("number");
    expect(response).to.have.property("onsale");
    expect(response.onsale).to.be.a("boolean");
  });
  it("No se debe crear un producto cuando no me pasan datos correctos", async () => {
    try {
      await productsManager.createOne({});
    } catch (error) {
      expect(error).to.have.property("message");
    }
  });
  it("Se deben leer todos los productos de la base de datos", async () => {
    const response = await productsManager.readAll();
    expect(Array.isArray(response)).to.be.true;
  });
  it("No se deben leer productos de la base de datos cuando mando un filtro inexistente", async () => {
    const response = await productsManager.readAll({ title: "aaaaaAAAA" });
    expect(response).to.have.lengthOf(0);
  });
  it("Se debe modificar un producto de la base de datos", async () => {
    const response = await productsManager.updateById(productId, {
      stock: 1000,
    });
    expect(response.stock).to.be.equals(1000);
  });
  it("Se debe eliminar un producto de la base de datos", async () => {
    await productsManager.destroyById(productId);
    const one = await productsManager.readById(productId);
    expect(one).to.be.a("null");
  });
});
