interface UiTitleBarRole {
    id: string;
    descripcion: string;
  }
  
  interface UiTitleBarPerfil {
    id: string;
    descripcion: string;
  }
  
  export interface UiTitleBarUser {
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
    roles: UiTitleBarRole[];
    perfiles: UiTitleBarPerfil[];
  }

export interface TitleBarProps {
    data?: UiTitleBarUser;
}