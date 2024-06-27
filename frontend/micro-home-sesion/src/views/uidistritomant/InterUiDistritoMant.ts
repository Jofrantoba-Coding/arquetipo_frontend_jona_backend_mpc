export interface InterUiDistritoMant {
    loadingData?: () => void
}

export interface InterUiDistritoMantCreate {
    descripcion: string | undefined;
    codigoDistrito: string | undefined;
    orden: number | undefined;
    provincia: {
        id: number | undefined;
    };
}

export interface InterUiDistritoMantEdit extends InterUiDistritoMantCreate {
    id: number | undefined;
}


export interface InterUiDistritoMantDelete {
    id: number | undefined;
}

export interface InterUiProvincia {
    id: number;
    descripcion: string
}

export interface InterUiDepartamento {
    id: number;
    descripcion: string
}

export interface InterUiDistritoMantTitleCrud {
    edit: string;
    create: string;
    view: string;
    delete: string;
}