import Express from 'express';
import { Company } from '../types/Company.js';
import { deleteCompany, getAllCompany, getCompany, newCompany } from '../controllers/companyController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';
import { DeleteResult } from '../types/DeleteResult.js';
import { FindResult } from '../types/FindResult.js';

const companyRouter = Express.Router();

companyRouter.get("/", async (req: Express.Request, res: Express.Response) => {
    const result = await getAllCompany();
    res.json(result);
  });

companyRouter.get("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const result: FindResult = await getCompany(req.params.id);
    let statusCode = 200;
    if (!result.success && result.rowsAffected === 0) statusCode = 404; 
    if (!result.success && !("rowsAffected" in result)) statusCode = 500;
    res.status(statusCode).json({
        message: result.message,
        company: result.success && result.rowsAffected 
    });
});
 
companyRouter.post("/", async (req: Express.Request, res: Express.Response) => {
    const company: Company = {companyName:req.body.company, distributor: req.body.distributor, contract_duration: req.body.contractDuration, penalty_period: req.body.penaltyPeriod, start_date: req.body.startDate, active:req.body.active};
    const result = await newCompany(company);
    res.send(result);
});

companyRouter.delete("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {  
    const result: DeleteResult = await deleteCompany(req.params.id);
    let statusCode=200;
    if(!result.success && result.rowsAffected==0) statusCode=404;
    if(!result.success && !("rowsAffected" in result)) statusCode=500;
    res.status(statusCode).json({message: result.message});
});

export default companyRouter;