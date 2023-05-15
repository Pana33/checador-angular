interface Person {
    dtCreated: {
        seconds: number,
        nanoseconds: number
    },
    firstName: string,
    lastName: string,
    fullName: string,
}
export interface EmployeeDb extends Person {
    emailEmployee: string,
    curp: string,
}
export interface UserDb extends Person {
    emailUser: string,
    isActive: boolean,
    isAdmin: boolean,
}
