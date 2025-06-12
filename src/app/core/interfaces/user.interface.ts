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
  columnName: string;
  value: string;
}

export interface CreateUserInterface extends User {
  password: string,
}
