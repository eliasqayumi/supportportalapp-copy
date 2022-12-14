import { Agency } from "./Agency";

export class User {
    public userId: string;
    public firstName: string;
    public lastName: string;
    public username: string;
    public email: string;
    public lastLoginDateDisplay!: Date;
    public joinDate!: Date;
    public profileImageUrl: string;
    public active: boolean;
    public notLocked: boolean;
    public role: string;
    public authorities: [];
    public agency!:Agency;
    public contact!:string;
    constructor() {
        this.userId='';
        this.firstName = '';
        this.lastName = '';
        this.username = '';
        this.email = '';
        this.profileImageUrl = '';
        this.active = false;
        this.notLocked = false;
        this.role='';
        this.authorities=[];
    }
}