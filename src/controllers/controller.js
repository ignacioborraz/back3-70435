import CustomError from "../helpers/errors/CustomError.js";
import errors from "../helpers/errors/errors.js";
import { productsService } from "../services/service.js";

class Controller {
  constructor(service) {
    this.service = service;
  }
  createOne = async (req, res, next) => {
    try {
      const { method, originalUrl } = req;
      const data = req.body;
      const response = await this.service.createOne(data);
      res.status(201).json({ response, method, originalUrl });
    } catch (error) {
      next(error);
    }
  };
  readAll = async (req, res, next) => {
    try {
      const { method, originalUrl } = req;
      const filter = req.query;
      const response = await this.service.readAll(filter);
      if (response.length === 0) {
        CustomError.new(errors.notFound);
      }
      res.status(200).json({ response, method, url: originalUrl });
    } catch (error) {
      next(error);
    }
  };
  readById = async (req, res, next) => {
    try {
      const { method, originalUrl } = req;
      const { id } = req.params;
      const response = await this.service.readById(id);
      if (!response) {
        CustomError.new(errors.notFound);
      }
      res.status(200).json({ response, method, originalUrl });
    } catch (error) {
      next(error);
    }
  };
  updateById = async (req, res, next) => {
    try {
      const { method, originalUrl } = req;
      const { id } = req.params;
      const data = req.body;
      const response = await this.service.updateById(id, data);
      if (!response) {
        CustomError.new(errors.notFound);
      }
      res.status(200).json({ response, method, originalUrl });
    } catch (error) {
      next(error);
    }
  };
  destroyById = async (req, res, next) => {
    try {
      const { method, originalUrl } = req;
      const { id } = req.params;
      const response = await this.service.destroyById(id);
      if (!response) {
        CustomError.new(errors.notFound);
      }
      res.status(200).json({ response, method, originalUrl });
    } catch (error) {
      next(error);
    }
  };
}

const productsController = new Controller(productsService);
export { productsController };
