import pool from "../config/configDb.js";
import { DeleteResult } from "../types/DeleteResult.js";
import { FindResult } from "../types/FindResult.js";
import { NewCompanyResult } from "../types/NewCompanyResult.js";
import { Company } from "../types/Company.js";

export async function saveNewCompany(company: Company): Promise<NewCompanyResult> {
    let result: NewCompanyResult; 
    try {
        const queryString = `INSERT INTO "company" ("companyName", "distributor", "contract_duration", "penalty_period", "start_date", "active) VALUES ('${company.companyName}', '${company.distributor}', '${company.contract_duration}', '${company.penalty_period}', '${company.start_date}', '${company.active}')`;
        const dbResult = await pool.query(queryString);
        result = {
            success: true,
            message: 'Compañia creada correctamente',
            rowsAffected: dbResult.rowCount ?? 0 
        };
    } catch (error: any) { 
        if (error.code === "23505") {
            const columnMatch = error.detail.match(/Key \((.*?)\)=/);
            const columnName = columnMatch ? columnMatch[1] : 'campo';
            result = {
                success: false,
                message: `El ${columnName} ya existe en la base de datos`,
                rowsAffected: 0
            };
        } else {
            result = {
                success: false,
                message: `Error al crear compañia: ${error.message}`, 
                rowsAffected: 0
            };
        }
    }
    return result; 
}

export async function getCompanies(): Promise<any> {
    let result: any; 
    try {
        const queryString = `SELECT * FROM "company"`;
        const dbResult = await pool.query(queryString);
        result = dbResult.rows; 
    } catch (error: any) { 
        result = {
            success: false,
            message: `Error al obtener compañias: ${(error as Error).message}`,
            rows: [] 
        };
    }
    return result;
}

export async function findCompanyById(id:string):Promise<any>{
    const queryString = `SELECT * FROM "company" WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    
    return result.rows;
}


export async function deleteCompanyById(id: string): Promise<DeleteResult> {
    let result: DeleteResult; 
    try {
        const queryString = `DELETE FROM "company" WHERE "id" = ${id}`;
        const dbResult = await pool.query(queryString);
        
        if (dbResult.rowCount && dbResult.rowCount > 0) {
            result = {
                success: true,
                message: 'Compañía eliminada correctamente',
                rowsAffected: dbResult.rowCount
            };
        } else {
            result = {
                success: false,
                message: 'No se encontró el compañia',
                rowsAffected: 0
            };
        }
    } catch (error) {
        result = {
            success: false,
            message: `Error al eliminar compañia: ${(error as Error).message}`
        };
    }
    return result; 
}   