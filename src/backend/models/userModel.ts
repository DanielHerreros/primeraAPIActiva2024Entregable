import pool from "../config/configDb.js";
import { DeleteResult } from "../types/DeleteResult.js";
import { NewUserResult } from "../types/NewUserResult.js";
import { User } from "../types/User.js";

export async function saveNewUser(user: User): Promise<NewUserResult> {
    let result: NewUserResult; 
    try {
        const queryString = `INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") VALUES ('${user.userName}', '${user.name}', '${user.first_surname}', '${user.password}', '${user.email}')`;
        const dbResult = await pool.query(queryString);
        result = {
            success: true,
            message: 'Usuario creado correctamente',
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
                message: `Error al crear usuario: ${error.message}`, 
                rowsAffected: 0
            };
        }
    }
    return result; 
}

export async function getUsers():Promise<any>{  
    const queryString = `SELECT * FROM "user"`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function findUserById(id:string):Promise<any>{
    const queryString = `SELECT * FROM "user" WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function deleteUserById(id: string): Promise<DeleteResult> {
    let result: DeleteResult; 
    try {
        const queryString = `DELETE FROM "user" WHERE "id" = ${id}`;
        const dbResult = await pool.query(queryString);
        
        if (dbResult.rowCount && dbResult.rowCount > 0) {
            result = {
                success: true,
                message: 'Usuario eliminado correctamente',
                rowsAffected: dbResult.rowCount
            };
        } else {
            result = {
                success: false,
                message: 'No se encontró el usuario',
                rowsAffected: 0
            };
        }
    } catch (error) {
        result = {
            success: false,
            message: `Error al eliminar usuario: ${(error as Error).message}`
        };
    }
    return result; 
}   