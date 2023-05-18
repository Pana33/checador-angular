import { Timestamp } from "firebase/firestore";

interface Person {
    dtCreated: Timestamp,
    firstName: string,
    lastName: string,
    fullName: string,
    isActive: boolean,
}
export interface EmployeeDb extends Person {
    emailEmployee: string,
    curp: string,
}
export interface UserDb extends Person {
    emailUser: string,
    isActive: boolean,
    isAdmin: string,
}
