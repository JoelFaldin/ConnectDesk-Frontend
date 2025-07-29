export interface User {
  rut: string,
  names: string,
  lastnames: string,
  email: string,
  role: string,
  departments: string,
  directions: string,
  jobNumber: string,
  contact: string,
}

export interface UserDataResponse {
  message?: string;
  content?: User[];
  showing?: number;
  page?: number;
  total?: number;
  totalData?: number;
}

export interface UpdateUser {
  column: string;
  value: string;
}

export interface CreateUserInterface extends User {
  password: string,
}

export interface ResetPasswordInterface {
  newPassword: string;
  sendEmail: boolean;
}
