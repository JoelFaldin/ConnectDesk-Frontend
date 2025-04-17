export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    lastname: string;
    rut: string;
    email: string;
    jobNumber: number;
    contactNumber: number;
    department: string;
    direction: string;
    password: string;
}
