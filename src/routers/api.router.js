import { Router } from "express";
import authRouter from "./api/auth.router.js";
import productsRouter from "./api/products.router.js";
import usersRouter from "./api/users.router.js";
import mocksRouter from "./api/mocks.router.js";
import { sumar } from "calculator-70435";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/mocks", mocksRouter);
apiRouter.get("/sumar/:n1/:n2", (req, res) => {
  const { n1, n2 } = req.params;
  res.status(200).json({ result: sumar(n1, n2) });
});

export default apiRouter;
