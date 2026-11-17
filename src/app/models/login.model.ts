export interface LoginRequest{
  username:string;
  password:string;
}

export interface LoginResponse{
  exito:boolean;
  mensaje:string;
  data:Data;
}

interface Data{
  token:string;
  tipo:string;
  username:string;
  nombre:string;
  roles:string[];
}


