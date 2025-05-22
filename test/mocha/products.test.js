import "dotenv/config.js";
import assert from "assert";
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
    assert.ok(response._id);
  });
  /*   it("Se debe crear un producto correctamente con el stock predeterminado", async () => {
    const response = await productsManager.createOne({
      title: "producto de prueba",
    });
    assert.ok(response.stock);
  });
  it("Se debe crear un producto correctamente con stock de tipo numerico", async () => {
    const response = await productsManager.createOne({
      title: "producto de prueba",
    });
    assert.ok(typeof response.stock === "number");
  });
  it("Se debe crear un producto correctamente con el precio predeterminado", async () => {
    const response = await productsManager.createOne({
      title: "producto de prueba",
    });
    assert.ok(response.price);
  });
  it("Se debe crear un producto correctamente con precio de tipo numerico", async () => {
    const response = await productsManager.createOne({
      title: "producto de prueba",
    });
    assert.ok(typeof response.price === "number");
  });
  it("Se debe crear un producto correctamente con la oferta predeterminada", async () => {
    const response = await productsManager.createOne({
      title: "producto de prueba",
    });
    assert.ok(response.onsale === false);
  });
  it("Se debe crear un producto correctamente con oferta de tipo booleano", async () => {
    const response = await productsManager.createOne({
      title: "producto de prueba",
    });
    assert.ok(typeof response.onsale === "boolean");
  });
  it("No se debe crear un producto cuando no me pasan datos correctos", async () => {
    try {
      await productsManager.createOne({});
    } catch (error) {
      assert.ok(error.message);
    }
  }); */
  it("Se deben leer todos los productos de la base datos", async () => {
    const response = await productsManager.readAll();
    assert.ok(response.length > 0);
  });
  it("No se deben leer productos de la base datos cuando mando un filtro inexistente", async () => {
    const response = await productsManager.readAll({ title: "aaaaaAAAA" });
    //assert.ok(response.length === 0);
    assert.strictEqual(response.length, 0);
  });
  it("Se debe leer un producto de la base de datos", async () => {
    const response = await productsManager.readById(productId);
    assert.ok(response._id);
  });
  it("Se debe modificar un producto de la base de datos", async () => {
    const response = await productsManager.updateById(productId, {
      stock: 1000,
    });
    //assert.ok(response.stock === 1000);
    assert.strictEqual(response.stock, 1000);
  });
  it("Se debe eliminar un producto de la base de datos", async () => {
    await productsManager.destroyById(productId);
    const one = await productsManager.readById(productId);
    //assert.ok(one === null);
    assert.strictEqual(one, null)
  });
});
