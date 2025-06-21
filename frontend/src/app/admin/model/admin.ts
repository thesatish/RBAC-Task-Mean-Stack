export class ModuleModel {
    _id?: string;
    name: string = "";
    description: string = "";
    code?: number;
}


export class RolesModel {
    _id?: string;
    name: string = "";
    code: number = 99
    description: string = "";
}
export class UserModel {
    _id?: string;
    userName: string = "";
    emailId: string = "";
    gender: string = "";
    status: string = "";
    role: string = "";
    password : string = "";
}