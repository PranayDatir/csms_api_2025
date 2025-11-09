import { IUserRole } from "../../models/userRole.model";
import { IUser } from "../../models/users.model";
import { Request } from 'express';

export interface CRequest extends Request {
    user?: IUser | null;
    userRole?: IUserRole | null;
}

export interface IPagination {
    currentPage: number,
    itemsPerPage: number,
    // filters:ITicket
    status: string,
    // title: string,
    // applicationInterfaceType:string

}

export interface IJwtLocals {
  _id: string;
  iat: number;
  exp: number;
  iss: string;
}