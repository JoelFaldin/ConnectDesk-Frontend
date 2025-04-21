export interface User {
  rut: string,
  names: string,
  lastNames: string,
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
  totalData?: number;
}