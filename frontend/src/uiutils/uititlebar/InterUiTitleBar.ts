interface Role {
    id: string;
    descripcion: string;
  }
  
  interface Perfil {
    id: string;
    descripcion: string;
  }
  
  interface User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    estado: boolean;
    isusuarioicl: boolean;
    idsistema: number;
    idrealm: string;
    iduserentity: string;
    roles: Role[];
    perfiles: Perfil[];
  }

export interface TitleBarProps {
    data?: User;
}