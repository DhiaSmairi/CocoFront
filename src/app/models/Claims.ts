import { TypeClaim } from './TypeClaim';
import { user } from './User';
export class Claims{
    idClaims!:number;
    title!: string;
    otherDetails!: string;
    description!: string;
    typeClaim!: TypeClaim;
    statusClaims!:string;
    createdAt!:Date;
    consultAt!:Date;
    user!:user;
    isDropdownOpen:boolean=false;
    iduser!:any
}