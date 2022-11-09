import { Priority } from "./Priority";
import { RoomNumber } from "./RoomNumber";
import { Status } from "./Status";
import { User } from "./User";

export class RequestedHomes{
    id!:number;
    recipientsName!:string;
    priority!:Priority;
    location!:string;
    budget!:string;
    roomNumber!:RoomNumber;
    status!:Status;// should add
    floors!:string;
    user!:User;// should add
    note!:string;
}