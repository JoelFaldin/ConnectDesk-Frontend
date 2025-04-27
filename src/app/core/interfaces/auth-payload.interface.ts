export interface LoginPayload {
  email: string;
  password: string;
}

enum UserRole {
  ADMIN,
  USER,
}

export interface LoginResponsePayload {
  token: string;
  identifier: string;
  names: string;
  email: string;
  role: UserRole;
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
