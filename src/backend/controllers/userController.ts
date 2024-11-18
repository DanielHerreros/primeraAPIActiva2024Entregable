import { deleteUserById, findUserById, getUsers, saveNewUser } from "../models/userModel.js";
import { DeleteResult } from "../types/DeleteResult.js";
import { FindResult } from "../types/FindResult.js";
import { NewUserResult } from "../types/NewUserResult.js";
import { User } from "../types/User.js"; 


export async function newUser(user: User):Promise<NewUserResult>{
        const result = await saveNewUser(user);
        return result;
}

export async function getAllUsers():Promise<string>{
    const result = await getUsers();
    return result;
}

export async function getUser(id: string): Promise<FindResult> {
    const [user, result] = await findUserById(id);

    return result;
}
export async function deleteUser(id:string):Promise<DeleteResult>{
    const result = await deleteUserById(id);
    return result;
}