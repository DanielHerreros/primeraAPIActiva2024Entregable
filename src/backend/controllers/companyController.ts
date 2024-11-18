import { saveNewCompany, getCompanies, findCompanyById, deleteCompanyById } from "../models/companyModel.js";
import { DeleteResult } from "../types/DeleteResult.js";
import { FindResult } from "../types/FindResult.js";
import { NewCompanyResult } from "../types/NewCompanyResult.js";
import { Company } from "../types/Company.js";

export async function newCompany(company: Company):Promise<NewCompanyResult>{
        const result = await saveNewCompany(company);
        return result;
}

export async function getAllCompany():Promise<string>{
    const result = await getCompanies();
    return result;
}

export async function getCompany(id: string): Promise<FindResult> {
    const result = await findCompanyById(id);
    return result;
}

export async function deleteCompany(id:string):Promise<DeleteResult>{
    const result = await deleteCompanyById(id);
    return result;
}