import Express from 'express';
import userRouter from './userRouter.js';
import companyRouter from './companyRouter.js';

const apiRouter = Express.Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/companies", companyRouter);

export default apiRouter;