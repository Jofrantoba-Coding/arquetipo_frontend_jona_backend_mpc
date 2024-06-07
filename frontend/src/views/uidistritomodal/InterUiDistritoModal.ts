export interface InterUiDistritoCreate {
    descripcion: string;
    codigoDistrito: string;
    orden: number;
    provincia: {
        id: number;
    };
}

export interface InterUiDistritoUpdate {
    id: number;
    descripcion: string;
    codigoDistrito: string;
    orden: number;
    provincia: {
        id: number;
    };
}